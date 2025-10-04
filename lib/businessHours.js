// Create a utility function to check if shop is open
export function isShopOpen() {
  const now = new Date();
  const currentHour = now.getHours();
  const currentDay = now.getDay(); // 0 = Sunday, 1 = Monday, etc.
  
  // Define your business hours
  
  const businessHours = {
    1: { open: 1, close: 23 },
    2: { open: 1, close: 23},
    3: { open: 1, close: 23},
    4: { open: 1, close: 23},
    5: { open: 1, close: 23},
    6: { open: 1, close: 23},
    
  };
  
  const todayHours = businessHours[currentDay];
  
  // Check if current time is within business hours
  return currentHour >= todayHours.open && currentHour < todayHours.close;
}

export function getShopStatus() {
  const isOpen = isShopOpen();
  const now = new Date();
  const currentDay = now.getDay();
  
  const businessHours = {
    1: { open: 1, close: 23 },
    2: { open: 1, close: 23},
    3: { open: 1, close: 23},
    4: { open: 1, close: 23},
    5: { open: 1, close: 23},
    6: { open: 1, close: 23},
    
  };
  
  const todayHours = businessHours[currentDay];
  
  return {
    isOpen,
    openTime: `${todayHours.open}:00`,
    closeTime: `${todayHours.close}`,
    message: isOpen 
      ? "We're currently open!" 
      : `We accept online orders from ${todayHours.open}AM to ${todayHours.close}PM`
  };
}