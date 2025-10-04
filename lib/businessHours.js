// Create a utility function to check if shop is open
export function isShopOpen() {
  return true;
//   const now = new Date();
//   const currentHour = now.getHours();
//   const currentDay = now.getDay(); // 0 = Sunday, 1 = Monday, etc.
  
//   // Define your business hours
//   const businessHours = {
//     // Monday - Friday: 7 AM to 8 PM
//     1: { open: 7, close: 20 },
//     2: { open: 7, close: 20 },
//     3: { open: 7, close: 20 },
//     4: { open: 7, close: 20 },
//     5: { open: 7, close: 20 },
//     // Saturday: 8 AM to 9 PM
//     6: { open: 8, close: 21 },
    
   
//   };
  
//   const todayHours = businessHours[currentDay];
  
//   // Check if current time is within business hours
//   return currentHour >= todayHours.open && currentHour < todayHours.close;
// }

// export function getShopStatus() {
//   const isOpen = isShopOpen();
//   const now = new Date();
//   const currentDay = now.getDay();
  
//   const businessHours = {
//     1: { open: 7, close: 22 },
//     2: { open: 7, close: 22},
//     3: { open: 7, close: 22},
//     4: { open: 7, close: 22},
//     5: { open: 7, close: 22},
//     6: { open: 8, close: 22},
    
//   };
  
//   const todayHours = businessHours[currentDay];
  
//   return {
//     isOpen,
//     openTime: `${todayHours.open}:00`,
//     closeTime: `${todayHours.close}`,
//     message: isOpen 
//       ? "We're currently open!" 
//       : `We accept online orders from ${todayHours.open}AM to ${todayHours.close}PM`
//   };
}