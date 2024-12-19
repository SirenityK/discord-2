import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./app/actions";

export async function middleware(request: NextRequest) {
  function urlMatch(pattern: string) {
    return request.nextUrl.pathname.match(new RegExp(pattern));
  }

  function urlStartsWith(match: string) {
    return request.nextUrl.pathname.startsWith(match);
  }

  function urlTest(pattern: string) {
    return new RegExp(pattern).test(request.nextUrl.pathname);
  }

  const session = await getSession();

  if (
    !session.id &&
    (!urlMatch("/(login|register)") || urlStartsWith("/dashboard"))
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (urlMatch("/(login|register)") && session.id) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher:
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
};
