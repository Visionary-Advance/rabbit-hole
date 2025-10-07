import { SquareClient, SquareEnvironment } from "square";
import crypto from "crypto";
import { getSquareAuth } from "@/lib/square-auth";

function safeStringify(obj) {
  return JSON.stringify(obj, (_, value) =>
    typeof value === "bigint" ? value.toString() : value
  );
}

function isShopOpenServer() {
  const now = new Date();
  const pacificTime = new Date(now.toLocaleString("en-US", { timeZone: "America/Los_Angeles" }));
  const currentHour = pacificTime.getHours();
  const currentDay = pacificTime.getDay();
  
  const businessHours = {
    0: { open: 8, close: 18 },
    1: { open: 7, close: 20 },
    2: { open: 7, close: 20 },
    3: { open: 7, close: 20 },
    4: { open: 7, close: 20 },
    5: { open: 7, close: 20 },
    6: { open: 8, close: 21 },
  };
  
  const todayHours = businessHours[currentDay];
  return currentHour >= todayHours.open && currentHour < todayHours.close;
}

export async function POST(req) {
  try {
    // if (!isShopOpenServer()) {
    //   return new Response(
    //     JSON.stringify({
    //       message: "Sorry, we're currently closed and cannot process orders.",
    //       type: "BusinessHoursError"
    //     }),
    //     { status: 400, headers: { "Content-Type": "application/json" } }
    //   );
    // }

    const { customerName, paymentMethod, orderDetails, locationId } = await req.json();

    if (!customerName || !customerName.trim()) {
      throw new Error("Customer name is required");
    }

    if (!orderDetails || !orderDetails.items || orderDetails.items.length === 0) {
      throw new Error("orderDetails.items is required and must not be empty");
    }

    if (paymentMethod !== 'instore') {
      throw new Error("This endpoint is only for in-store payment orders");
    }

    // Get auth from Supabase
    console.log('🔐 Getting Square credentials from Supabase...');
    const auth = await getSquareAuth();
    
    // Use location from database if not provided
    const finalLocationId = locationId || auth.locationId;
    
    if (!finalLocationId) {
      throw new Error("Location ID not found");
    }

    console.log('✅ Using location:', finalLocationId);

    // Initialize Square client with token from database
    const client = new SquareClient({
      environment: process.env.SQUARE_ENVIRONMENT === 'production' 
        ? SquareEnvironment.Production 
        : SquareEnvironment.Sandbox,
      token: auth.accessToken, // Use token from database
    });

    const orderRequest = {
      order: {
        locationId: finalLocationId,
        source: {
          name: "**Pay In Store - Website"
        },
        state: "OPEN",
        fulfillments: [
          {
            type: "PICKUP",
            state: "PROPOSED",
            pickupDetails: {
              recipient: {
                displayName: customerName.trim()
              },
              note: `Customer: ${customerName.trim()} - Pay in store on pickup`,
              scheduleType: "ASAP",
            }
          }
        ],
        lineItems: orderDetails.items.map(item => {
          if (!item.quantity || item.quantity <= 0) {
            throw new Error(`Item quantity must be greater than 0`);
          }
          if (!item.unitPrice || item.unitPrice <= 0) {
            throw new Error(`Item unitPrice must be greater than 0`);
          }

          let itemName = item.name;
          const sizeTemp = [item.size?.name, item.temperature].filter(Boolean).join(' ');
          if (sizeTemp) {
            itemName = `${sizeTemp} ${itemName}`;
          }

          const modifierDescriptions = [];
          if (item.modifiers && Array.isArray(item.modifiers)) {
            item.modifiers.forEach(modifier => {
              if (modifier.name) {
                modifierDescriptions.push(modifier.name);
              }
            });
          }

          const additionalDetails = [];
          if (modifierDescriptions.length > 0) {
            additionalDetails.push(...modifierDescriptions);
          }
          if (item.specialInstructions && item.specialInstructions.trim()) {
            additionalDetails.push(`Note: ${item.specialInstructions.trim()}`);
          }
          if (additionalDetails.length > 0) {
            itemName += ` (${additionalDetails.join(', ')})`;
          }

          const noteDetails = [];
          if (item.size?.name) noteDetails.push(`Size: ${item.size.name}`);
          if (item.temperature) noteDetails.push(`Temp: ${item.temperature}`);
          if (modifierDescriptions.length > 0) {
            noteDetails.push(`Extras: ${modifierDescriptions.join(', ')}`);
          }
          if (item.specialInstructions && item.specialInstructions.trim()) {
            noteDetails.push(`Instructions: ${item.specialInstructions.trim()}`);
          }

          return {
            name: itemName,
            quantity: item.quantity.toString(),
            itemType: "ITEM",
            basePriceMoney: {
              amount: BigInt(Math.round(item.unitPrice * 100)),
              currency: "USD",
            },
            note: noteDetails.length > 0 ? noteDetails.join(' | ') : undefined,
            variationName: sizeTemp || undefined,
          };
        }),
        metadata: {
          source: "website",
          orderType: "pickup", 
          paymentMethod: "instore",
          customerName: customerName.trim(),
          paymentStatus:'UNPAID'
        },
        note: `PAY IN STORE - Customer: ${customerName.trim()}`,
      },
      idempotencyKey: crypto.randomUUID(),
    };

    const orderResponse = await client.orders.create(orderRequest);
    
    if (orderResponse.errors && orderResponse.errors.length > 0) {
      console.error("Order creation errors:", safeStringify(orderResponse.errors));
      throw new Error(`Order creation failed: ${orderResponse.errors.map(e => e.detail || e.category).join('; ')}`);
    }

    const order = orderResponse.result?.order || orderResponse.body?.order || orderResponse.order;
    
    if (!order || !order.id) {
      console.error("Could not find order in response");
      throw new Error("Failed to create order - no order found in response");
    }

    const orderId = order.id;
    const totalAmount = order.totalMoney?.amount || order.total_money?.amount;

    const itemSummary = orderDetails.items.map(item => {
      let name = item.name;
      if (item.size?.name) name = `${item.size.name} ${name}`;
      return `${item.quantity}x ${name}`;
    }).join(', ');

    return Response.json({
      orderId: orderId,
      customerName: customerName.trim(),
      status: "OPEN",
      totalAmount: totalAmount?.toString(),
      currency: "USD",
      paymentMethod: "instore",
      orderSummary: itemSummary,
      message: "Order received! Please pay when you pick up your order.",
      createdAt: order.created_at || order.createdAt || new Date().toISOString(),
    });

  } catch (error) {
    console.error("Order creation error:", error);
    
    const errorResponse = {
      message: error.message,
      type: error.constructor.name,
      details: error.errors
        ? error.errors.map(e => e.detail || e.category).join("; ")
        : "Unknown error",
    };

    if (error.body) {
      try {
        const errorBody = JSON.parse(error.body);
        errorResponse.squareErrors = errorBody.errors;
      } catch (parseError) {
        errorResponse.rawErrorBody = error.body;
      }
    }

    return new Response(
      JSON.stringify(errorResponse),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}