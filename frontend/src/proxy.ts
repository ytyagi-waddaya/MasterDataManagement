import { NextRequest, NextResponse } from "next/server";

const PUBLIC_ROUTES = [
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
];

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  console.log("🔥 PROXY RUNNING:", pathname);

  // Skip static and API assets
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/static") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }


  // Get token
  const refreshToken = req.cookies.get("refreshToken")?.value || null;

  const accessToken =
    req.cookies.get("accessToken")?.value ||
    req.headers.get("authorization")?.replace("Bearer ", "") ||
    null;

  const isPublicRoute = PUBLIC_ROUTES.some((route) =>
    pathname.startsWith(route)
  );

  // Root redirect
  if (pathname === "/") {
    return accessToken
      ? NextResponse.redirect(new URL("/dashboard", req.url))
      : NextResponse.redirect(new URL("/login", req.url));
  }

  // Logged-in user on /login → go to dashboard
  if (isPublicRoute && accessToken) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // Private route with no token → go to login
  // if (!isPublicRoute && !accessToken) {
  //   const redirect = new URL("/login", req.url);
  //   redirect.searchParams.set("from", pathname);
  //   return NextResponse.redirect(redirect);
  // }
  if (!isPublicRoute && !refreshToken) {
  const redirect = new URL("/login", req.url);
  redirect.searchParams.set("from", pathname);
  return NextResponse.redirect(redirect);
}

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
