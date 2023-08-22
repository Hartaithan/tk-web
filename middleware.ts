import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const unAuthPaths = ["/register", "/login"];

export const middleware = (req: NextRequest) => {
  const pathname = req.nextUrl.pathname;
  const token = req.cookies.get("access_token");

  const res = NextResponse;

  if (token && unAuthPaths.includes(pathname)) {
    return res.redirect(new URL("/", req.url));
  }

  if (!token && !unAuthPaths.includes(pathname)) {
    return res.redirect(new URL("/register", req.url));
  }

  return res.next();
};

export const config = {
  matcher: "/((?!api|static|.*\\..*|_next).*)",
};
