import { NextResponse } from 'next/server';

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

  // If path starts with /zh, serve Mandarin version
  if (pathname.startsWith('/zh')) {
    const locale = 'zh';
    const newUrl = request.nextUrl.clone();
    newUrl.pathname = `/${locale}${pathname.slice(3) || ''}`;

    const response = NextResponse.rewrite(newUrl);
    response.cookies.set('NEXT_LOCALE', locale, { path: '/' });
    return response;
  }

  // For root / and all other paths, serve English version
  const locale = 'en';
  const newUrl = request.nextUrl.clone();

  // Rewrite / to /en, /about to /en/about, etc.
  newUrl.pathname = pathname === '/' ? `/${locale}` : `/${locale}${pathname}`;

  const response = NextResponse.rewrite(newUrl);
  response.cookies.set('NEXT_LOCALE', locale, { path: '/' });
  return response;
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
