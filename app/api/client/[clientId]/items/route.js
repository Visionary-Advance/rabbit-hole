import { NextResponse } from 'next/server';
import { SquareClient, SquareEnvironment } from 'square';
import { getSquareAuth } from '@/lib/square-auth';

export async function GET(request, { params }) {
  try {
    const { clientId } = params;
    
    if (!clientId) {
      return NextResponse.json(
        { error: 'Client ID is required' }, 
        { status: 400 }
      );
    }

    // Get the stored Square auth for this client
    const authData = await getSquareAuth(clientId);
    
    if (!authData) {
      return NextResponse.json(
        { error: 'Client not found or not authorized' }, 
        { status: 404 }
      );
    }

    // Check if token is expired
    if (new Date(authData.expiresAt) < new Date()) {
      return NextResponse.json(
        { error: 'Access token expired. Client needs to reauthorize.' }, 
        { status: 401 }
      );
    }

    // Initialize Square client with stored token
    const client = new SquareClient({
      environment: process.env.SQUARE_ENVIRONMENT === 'production' 
        ? SquareEnvironment.Production 
        : SquareEnvironment.Sandbox,
      token: authData.accessToken,
    });

    // Fetch catalog items
    const rawResponse = await client.catalog.list({
      types: "ITEM,IMAGE,CATEGORY,MODIFIER_LIST,MODIFIER",
    });

    const result = rawResponse.response?.objects || rawResponse.data || [];

    // Process items (same logic as your current square-items route)
    const items = result.filter(obj => obj.type === 'ITEM');
    const images = result.filter(obj => obj.type === 'IMAGE');
    const modifierLists = result.filter(obj => obj.type === 'MODIFIER_LIST');
    const modifiers = result.filter(obj => obj.type === 'MODIFIER');

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
    }

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

      const attachedModifierLists = (item.itemData?.modifierListInfo || [])
        .map(info => modifierMap[info.modifierListId])
        .filter(Boolean);

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

    return NextResponse.json({ 
      items: filteredItems,
      clientInfo: {
        clientId: authData.clientId,
        restaurantName: authData.restaurantName,
        locationId: authData.locationId
      }
    });

  } catch (error) {
    console.error('❌ Error fetching client items:', error);
    return NextResponse.json({ 
      error: error.message || 'Failed to fetch items' 
    }, { status: 500 });
  }
}

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';