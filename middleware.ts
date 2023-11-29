import { NextResponse } from "next/server";
import type { NextMiddleware } from "next/server";
import { NullableRefreshResponse, refresh } from "./actions/refresh";

export const config = {
  matcher: "/((?!api|static|.*\\..*|_next).*)",
};

const unAuthPaths = ["/register", "/login"];

const refreshTokens = async (
  token: string,
): Promise<NullableRefreshResponse> => {
  let tokens: NullableRefreshResponse = null;
  try {
    tokens = await refresh(token);
  } catch (error) {
    console.error("unable to refresh tokens", error);
  }
  return tokens;
};

export const middleware: NextMiddleware = async (req) => {
  const res = NextResponse;
  const isPublicPage = unAuthPaths.includes(req.nextUrl.pathname);

  let access = req.cookies.get("access_token")?.value;
  const refresh = req.cookies.get("refresh_token")?.value;

  let refreshed: NullableRefreshResponse = null;

  if (access == null && refresh != null) {
    refreshed = await refreshTokens(refresh);
    if (refreshed != null && refreshed.status === 200) {
      const { access_token } = refreshed.data;
      access = access_token;
    }
  }

  if (!access && !isPublicPage) {
    const redirectRes = res.redirect(new URL("/register", req.url));
    redirectRes.cookies.delete("access_token");
    redirectRes.cookies.delete("refresh_token");
    return redirectRes;
  }

  if (access && isPublicPage) {
    return res.redirect(new URL("/", req.url));
  }

  const response = res.next();

  if (refreshed != null && refreshed.status === 200) {
    const { access_token, expires_in } = refreshed.data;
    response.cookies.set("access_token", access_token, {
      maxAge: expires_in,
    });
  }

  return response;
};
