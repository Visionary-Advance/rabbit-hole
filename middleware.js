import { NextResponse } from 'next/server';

const defaultLocale = 'en';

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Skip middleware for static files, API routes, and checkout
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/checkout') ||
    pathname.includes('.') // Files with extensions (images, favicon, etc.)
  ) {
    return NextResponse.next();
  }

  // Check if pathname already has the /en locale prefix
  if (pathname.startsWith('/en/') || pathname === '/en') {
    return NextResponse.next();
  }

  // Redirect /zh routes to English
  if (pathname.startsWith('/zh/') || pathname === '/zh') {
    const newUrl = request.nextUrl.clone();
    newUrl.pathname = pathname.replace(/^\/zh/, '/en');
    return NextResponse.redirect(newUrl);
  }

  // Rewrite all other paths to /en
  const newUrl = request.nextUrl.clone();
  newUrl.pathname = pathname === '/' ? '/en' : `/en${pathname}`;

  return NextResponse.rewrite(newUrl);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public folder)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
