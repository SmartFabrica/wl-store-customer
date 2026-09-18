import { NextResponse, type NextRequest } from "next/server";

import { SESSION_COOKIE } from "@/lib/auth/cookies";
import { CATALOG_PATH, LOGIN_PATH, PUBLIC_PATHS } from "@/lib/routes";

export const proxy = (request: NextRequest) => {
  const { pathname } = request.nextUrl;
  const hasSession = Boolean(request.cookies.get(SESSION_COOKIE)?.value);
  const isPublic = PUBLIC_PATHS.includes(pathname);

  if (hasSession && (isPublic || pathname === "/")) {
    return NextResponse.redirect(new URL(CATALOG_PATH, request.nextUrl));
  }

  if (!hasSession && !isPublic) {
    return NextResponse.redirect(new URL(LOGIN_PATH, request.nextUrl));
  }

  return NextResponse.next();
};

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.svg$).*)"],
};
