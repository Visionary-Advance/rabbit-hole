import { NextResponse } from 'next/server';

const locales = ['en', 'zh'];
const defaultLocale = 'en';

// Get preferred locale from Accept-Language header
function getPreferredLocale(request) {
  // First check cookie
  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value;
  if (cookieLocale && locales.includes(cookieLocale)) {
    return cookieLocale;
  }

  const acceptLanguage = request.headers.get('accept-language');
  if (!acceptLanguage) return defaultLocale;

  // Parse Accept-Language header
  const languages = acceptLanguage.split(',').map(lang => {
    const parts = lang.trim().split(';');
    const locale = parts[0].split('-')[0]; // Get primary language code
    return locale;
  });

  // Find first matching locale - only check for Chinese, default to English
  for (const lang of languages) {
    if (lang.startsWith('zh')) return 'zh';
  }

  return defaultLocale;
}

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

  // Check if pathname already has a locale prefix
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    // Extract locale from pathname and set cookie
    const locale = pathname.split('/')[1];
    const response = NextResponse.next();
    response.cookies.set('NEXT_LOCALE', locale, { path: '/' });
    return response;
  }

  // No locale in pathname - detect preferred locale and rewrite
  const locale = getPreferredLocale(request);
  const newUrl = request.nextUrl.clone();

  // Rewrite to locale-specific path
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
