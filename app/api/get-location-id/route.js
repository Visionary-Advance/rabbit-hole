import { NextResponse } from 'next/server';
import { getLocationId } from '@/lib/square-auth';

export async function GET() {
  try {
    const locationId = await getLocationId();
    return NextResponse.json({ locationId });
  } catch (error) {
    console.error('Error getting location ID:', error);
    return NextResponse.json(
      { error: 'Failed to get location ID' },
      { status: 500 }
    );
  }
}