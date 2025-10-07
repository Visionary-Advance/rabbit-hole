// lib/businessHours.js
// Business hours utility with proper Pacific Time handling

/**
 * Check if shop is open based on Pacific Time (Oregon)
 */
export function isShopOpen() {
  // Get current time in Pacific Time
  const now = new Date();
  const pacificTime = new Date(now.toLocaleString("en-US", { timeZone: "America/Los_Angeles" }));
  
  const currentHour = pacificTime.getHours();
  const currentDay = pacificTime.getDay(); // 0 = Sunday, 1 = Monday, etc.
  
  console.log('🕐 Current Pacific Time:', pacificTime.toLocaleString("en-US", { timeZone: "America/Los_Angeles" }));
  console.log('🕐 Current Hour (PT):', currentHour);
  console.log('📅 Current Day:', currentDay);
  
  // Define your business hours (in Pacific Time)
  const businessHours = {
    0: { open: 8, close: 18 },   // Sunday: 8 AM - 6 PM PT
    1: { open: 7, close: 20 },   // Monday: 7 AM - 8 PM PT
    2: { open: 7, close: 20 },   // Tuesday: 7 AM - 8 PM PT
    3: { open: 7, close: 20 },   // Wednesday: 7 AM - 8 PM PT
    4: { open: 7, close: 20 },   // Thursday: 7 AM - 8 PM PT
    5: { open: 7, close: 20 },   // Friday: 7 AM - 8 PM PT
    6: { open: 8, close: 21 },   // Saturday: 8 AM - 9 PM PT
  };
  
  const todayHours = businessHours[currentDay];
  
  if (!todayHours) {
    console.log('❌ No hours defined for day:', currentDay);
    return false;
  }
  
  const isOpen = currentHour >= todayHours.open && currentHour < todayHours.close;
  
  console.log('🏪 Shop open?', isOpen, `(Hours: ${todayHours.open}:00 - ${todayHours.close}:00 PT)`);
  
  return isOpen;
}

/**
 * Get shop status with detailed message
 */
export function getShopStatus() {
  const now = new Date();
  const pacificTime = new Date(now.toLocaleString("en-US", { timeZone: "America/Los_Angeles" }));
  const currentDay = pacificTime.getDay();
  
  const businessHours = {
    0: { open: 8, close: 18, label: 'Sunday' },      // Sunday: 8 AM - 6 PM PT
    1: { open: 7, close: 20, label: 'Monday' },      // Monday - Friday: 7 AM - 8 PM PT
    2: { open: 7, close: 20, label: 'Tuesday' },
    3: { open: 7, close: 20, label: 'Wednesday' },
    4: { open: 7, close: 20, label: 'Thursday' },
    5: { open: 7, close: 20, label: 'Friday' },
    6: { open: 8, close: 21, label: 'Saturday' },    // Saturday: 8 AM - 9 PM PT
  };
  
  const todayHours = businessHours[currentDay];
  const isOpen = isShopOpen();
  
  // Format time strings
  const formatTime = (hour) => {
    const period = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
    return `${displayHour}:00 ${period}`;
  };
  
  const openTime = formatTime(todayHours.open);
  const closeTime = formatTime(todayHours.close);
  
  let message;
  if (isOpen) {
    message = `We're currently open! Today's hours: ${openTime} - ${closeTime} PT`;
  } else {
    message = `We're currently closed. ${todayHours.label} hours: ${openTime} - ${closeTime} PT`;
  }
  
  return {
    isOpen,
    openTime,
    closeTime,
    message,
    currentDay: todayHours.label,
    pacificTime: pacificTime.toLocaleString("en-US", { 
      timeZone: "America/Los_Angeles",
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    })
  };
}

/**
 * Get all weekly hours for display
 */
export function getWeeklyHours() {
  const hours = {
    'Monday - Friday': '7:00 AM - 8:00 PM',
    'Saturday': '8:00 AM - 9:00 PM',
    'Sunday': '8:00 AM - 6:00 PM'
  };
  
  return hours;
}