import { NextResponse } from "next/server";
import { auth } from "./auth";

const protectedRoutes = ["/dashboard"];

export default auth((req) => {
  const locale = req.cookies.get("NEXT_LOCALE")?.value || "tr";
  const { pathname } = req.nextUrl;

  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    if (!req.auth && !req.nextUrl.pathname.startsWith("/login")) {
      const newUrl = new URL("/login", req.nextUrl);
      const redirectResponse = NextResponse.redirect(newUrl);
      redirectResponse.cookies.set("NEXT_LOCALE", locale, {
        maxAge: 60 * 60 * 24 * 365,
        path: "/",
      });

      return redirectResponse;
    }
  }

  const response = NextResponse.next();
  if (!req.cookies.get("NEXT_LOCALE")) {
    response.cookies.set("NEXT_LOCALE", locale, {
      maxAge: 60 * 60 * 24 * 365,
      path: "/",
    });
  }

  return response;
});

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
