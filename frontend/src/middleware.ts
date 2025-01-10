import { NextResponse } from 'next/server';
import { profil } from './utils/api';
import { cookies } from 'next/headers';

export async function middleware(req: {
    nextUrl: { pathname: any; }; headers: { get: (arg0: string) => any }; url: string | URL | undefined; 
}) {
  const cookieStore = await cookies();
  const tokenCookie = cookieStore.get('auth_token');
  const token = tokenCookie ? tokenCookie.value : null;

  const { pathname } = req.nextUrl;

  if (pathname === '/login' && token) {
    return NextResponse.redirect(new URL('/profile', req.url));
  }

  if (!token && pathname.startsWith('/profile')) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  if (token) {
    try {
      const response = await profil(token);
      if (!response || response.error) {
        throw new Error('Invalid token');
      }
      return NextResponse.next();
    } catch (error) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/profile', '/login'],
};
