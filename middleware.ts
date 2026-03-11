import { NextRequest, NextResponse } from 'next/server';

const locales = ['en', 'ro'];
const defaultLocale = 'ro';

function getLocale(request: NextRequest): string {
  const acceptLanguage = request.headers.get('accept-language');
  if (acceptLanguage?.includes('ro')) return 'ro';
  if (acceptLanguage?.includes('en')) return 'en';
  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if pathname has locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  // Redirect to locale
  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|images|favicon.ico|logoSA|sitemap.xml|robots.txt|llms.txt).*)'],
};
