import { NextResponse } from 'next/server';
import { SquareClient, SquareEnvironment } from 'square';
import { getSquareAuth, getLocationId } from '@/lib/square-auth';

export async function GET() {
  try {
    console.log('🔍 Fetching Square items for Rabbit Hole...');
    
    // Get auth credentials from Supabase (will auto-refresh if needed)
    const auth = await getSquareAuth();
    
    console.log('✅ Retrieved auth for:', auth.restaurantName);
    console.log('📍 Location ID:', auth.locationId);
    console.log('🔑 Token expires at:', auth.expiresAt);
    
    // Check if token needs refresh (expired or expiring in next 5 days)
    const expiresAt = new Date(auth.expiresAt);
    const fiveDaysFromNow = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000);
    
    let accessToken = auth.accessToken;
    
    if (expiresAt <= fiveDaysFromNow) {
      console.log('⚠️ Token expired or expiring soon, refreshing...');
      // Import the refresh function
      const { refreshSquareToken } = await import('@/lib/square-auth-refresh');
      accessToken = await refreshSquareToken(process.env.RABBIT_HOLE_CLIENT_ID);
      console.log('✅ Token refreshed successfully');
    }
    
    // Initialize Square client with valid token
    const client = new SquareClient({
      environment: process.env.SQUARE_ENVIRONMENT === 'production' 
        ? SquareEnvironment.Production 
        : SquareEnvironment.Sandbox,
      token: accessToken,
    });

    console.log('📡 Fetching catalog from Square...');

    // Fetch ALL catalog objects with pagination
    let allObjects = [];
    let cursor = undefined;
    let pageCount = 0;

    do {
      const rawResponse = await client.catalog.list({
        types: "ITEM,IMAGE,CATEGORY,MODIFIER_LIST,MODIFIER",
        cursor: cursor,
      });

      const objects = rawResponse.result?.objects || rawResponse.response?.objects || rawResponse.data || [];
      cursor = rawResponse.result?.cursor || rawResponse.response?.cursor || null;

      allObjects = allObjects.concat(objects);
      pageCount++;

      console.log(`📄 Page ${pageCount}: Retrieved ${objects.length} objects, cursor: ${cursor ? 'exists' : 'none'}`);
    } while (cursor);

    console.log(`✅ Retrieved ${allObjects.length} total catalog objects across ${pageCount} pages`);

    const result = allObjects;

    const items = result.filter(obj => obj.type === 'ITEM');
    const images = result.filter(obj => obj.type === 'IMAGE');
    const modifierLists = result.filter(obj => obj.type === 'MODIFIER_LIST');
    const modifiers = result.filter(obj => obj.type === 'MODIFIER');

    console.log('📦 Items:', items.length);
    console.log('🖼️ Images:', images.length);
    console.log('📝 Modifier Lists:', modifierLists.length);
    console.log('🔧 Modifiers:', modifiers.length);

    // Debug: Show what types we actually got
    const typeCount = {};
    result.forEach(obj => {
      typeCount[obj.type] = (typeCount[obj.type] || 0) + 1;
    });
    console.log('🔍 All object types in response:', typeCount);

    // Debug: Show modifier list names if any
    if (modifierLists.length > 0) {
      console.log('🔍 Modifier list names:', modifierLists.map(ml => ml.modifierListData?.name || ml.modifier_list_data?.name || 'Unnamed'));
    } else {
      console.log('⚠️ No MODIFIER_LIST objects found in catalog response!');
    }

    const categoryMap = {};
    result.forEach(obj => {
      if (obj.type === 'CATEGORY') {
        categoryMap[obj.id] = obj.categoryData?.name || 'Uncategorized';
      }
    });

    const modifierIdMap = {};
    for (const mod of modifiers) {
      modifierIdMap[mod.id] = {
        id: mod.id,
        name: mod.modifierData?.name || 'Unnamed',
        price: mod.modifierData?.priceMoney?.amount
          ? Number(mod.modifierData.priceMoney.amount) / 100
          : 0
      };
    }

    const modifierMap = {};
    for (const list of modifierLists) {
      const name = list.modifierListData?.name || 'Unnamed Group';
      const mods = list.modifierListData?.modifiers || [];

      console.log(`🔧 Processing modifier list "${name}" (ID: ${list.id}):`, {
        modifierCount: mods.length,
        modifiers: mods.map(m => ({
          id: m.modifierId || m.id || m.modifier_id,
          hasData: !!m.modifierData
        }))
      });

      const modifierObjects = mods.map(ref => {
        const possibleId = ref.modifierId || ref.id || ref.modifier_id;

        if (!possibleId && ref.modifierData) {
          return {
            id: ref.id || `inline_${Math.random()}`,
            name: ref.modifierData?.name || 'Unnamed',
            price: ref.modifierData?.priceMoney?.amount
              ? Number(ref.modifierData.priceMoney.amount) / 100
              : 0
          };
        }

        return modifierIdMap[possibleId];
      }).filter(Boolean);

      modifierMap[list.id] = {
        name,
        modifiers: modifierObjects
      };

      console.log(`✅ Modifier list "${name}" has ${modifierObjects.length} modifiers`);
    }

    console.log(`📊 Total modifier lists in map: ${Object.keys(modifierMap).length}`);

    const imageMap = {};
    for (const image of images) {
      imageMap[image.id] = image.imageData?.url;
    }

    const filteredItems = items.map(item => {
      const imageId = item.itemData?.imageIds?.[0];
      const categoryId = item.itemData?.categories?.[0]?.id;

      const variations = (item.itemData?.variations || []).map(v => {
        const vData = v.itemVariationData;
        return {
          id: v.id,
          name: vData?.name || 'Default',
          sku: vData?.sku || null,
          price: vData?.priceMoney?.amount ? Number(vData.priceMoney.amount) / 100 : null,
          currency: vData?.priceMoney?.currency || '',
        };
      });

      const price = variations[0]?.price || null;
      const currency = variations[0]?.currency || '';

      // Attach modifier lists to items
      const modifierListInfo = item.itemData?.modifierListInfo || [];

      const attachedModifierLists = modifierListInfo
        .map(info => {
          // Try both camelCase and snake_case
          const listId = info.modifierListId || info.modifier_list_id;
          const found = modifierMap[listId];

          if (!found && modifierListInfo.length > 0) {
            console.log(`⚠️ Modifier list ${listId} not found for item "${item.itemData?.name}"`);
          }

          return found;
        })
        .filter(Boolean);

      if (attachedModifierLists.length > 0) {
        console.log(`✅ Item "${item.itemData?.name}" has ${attachedModifierLists.length} modifier lists:`,
          attachedModifierLists.map(ml => ml.name)
        );
      }

      return {
        id: item.id,
        name: item.itemData?.name || 'Unnamed Item',
        description: item.itemData?.description || '',
        price,
        currency,
        category: categoryMap[categoryId] || 'Uncategorized',
        img: imageMap[imageId] || null,
        variations,
        modifiers: attachedModifierLists,
      };
    });

    console.log('✅ Processed', filteredItems.length, 'menu items');

    return NextResponse.json({ 
      items: filteredItems,
      metadata: {
        restaurantName: auth.restaurantName,
        locationId: auth.locationId,
        itemCount: filteredItems.length
      }
    });

  } catch (error) {
    console.error('❌ Square API Error:', error);
    
    // Provide helpful error messages
    if (error.message.includes('RABBIT_HOLE_CLIENT_ID')) {
      return NextResponse.json({ 
        error: 'Configuration Error',
        message: 'Client ID not configured. Please contact support.',
        details: error.message 
      }, { status: 500 });
    }
    
    if (error.message.includes('expired')) {
      return NextResponse.json({ 
        error: 'Token Expired',
        message: 'Square authorization has expired. Please contact Visionary Advance to refresh.',
        details: error.message 
      }, { status: 401 });
    }
    
    return NextResponse.json({ 
      error: 'Failed to fetch menu items',
      message: error.message 
    }, { status: 500 });
  }
}

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';