// lib/square-auth-refresh.js
// Token refresh functionality for Rabbit Hole

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const SQUARE_BASE_URL = process.env.SQUARE_ENVIRONMENT === 'sandbox' 
  ? 'https://connect.squareupsandbox.com'
  : 'https://connect.squareup.com';

/**
 * Refresh an expired Square access token
 * NOTE: This requires SQUARE_APPLICATION_ID and SQUARE_APPLICATION_SECRET
 * These should be from Visionary Advance, not the client's credentials
 */
export async function refreshSquareToken(clientId) {
  try {
    console.log(`🔄 Refreshing token for client: ${clientId}`);

    // Get current auth record with refresh token
    const { data: auth, error: fetchError } = await supabase
      .from('square_auth')
      .select('refresh_token, square_merchant_id')
      .eq('client_id', clientId)
      .single();

    if (fetchError || !auth) {
      throw new Error(`Failed to get refresh token: ${fetchError?.message || 'No auth found'}`);
    }

    if (!auth.refresh_token) {
      throw new Error('No refresh token available. Client needs to reauthorize.');
    }

    console.log('📡 Calling Square token refresh endpoint...');

    // Call Square's token refresh endpoint
    // NOTE: You need to add these to Rabbit Hole's .env.local
    const response = await fetch(`${SQUARE_BASE_URL}/oauth2/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Square-Version': '2023-10-18',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        client_id: process.env.SQUARE_APPLICATION_ID,
        client_secret: process.env.SQUARE_APPLICATION_SECRET,
        grant_type: 'refresh_token',
        refresh_token: auth.refresh_token
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('❌ Token refresh failed:', data);
      
      // Mark as expired in database
      await supabase
        .from('square_auth')
        .update({ 
          status: 'expired',
          error_message: data.errors?.[0]?.detail || 'Token refresh failed'
        })
        .eq('client_id', clientId);

      throw new Error(`Token refresh failed: ${data.errors?.[0]?.detail || 'Unknown error'}`);
    }

    // Calculate new expiration (30 days from now)
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

    console.log('💾 Updating database with new tokens...');

    // Update database with new tokens
    const { error: updateError } = await supabase
      .from('square_auth')
      .update({
        access_token: data.access_token,
        refresh_token: data.refresh_token || auth.refresh_token,
        expires_at: expiresAt.toISOString(),
        status: 'active',
        error_message: null,
        last_used_at: new Date().toISOString()
      })
      .eq('client_id', clientId);

    if (updateError) {
      throw new Error(`Failed to update tokens: ${updateError.message}`);
    }

    console.log(`✅ Token successfully refreshed for client: ${clientId}`);
    return data.access_token;
  } catch (error) {
    console.error('❌ Error refreshing token:', error);
    throw error;
  }
}