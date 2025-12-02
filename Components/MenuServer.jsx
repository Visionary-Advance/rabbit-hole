import Menu from './Menu';

// Server Component that fetches menu data server-side
// This will be cached by Next.js for 24 hours
async function getMenuData() {
  try {
    // In production, use the actual domain. In dev, use localhost.
    const baseUrl = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

    const res = await fetch(`${baseUrl}/api/square-items`, {
      // Cache for 24 hours, matching the API route setting
      next: { revalidate: 86400 }
    });

    if (!res.ok) {
      console.error('Failed to fetch menu data:', res.status);
      return null;
    }

    return await res.json();
  } catch (error) {
    console.error('Error fetching menu data:', error);
    return null;
  }
}

export default async function MenuServer() {
  // Fetch data on the server
  const menuData = await getMenuData();

  // Pass the server-fetched data to the client component
  return <Menu initialData={menuData} />;
}
