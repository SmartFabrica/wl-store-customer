import { NextResponse, type NextRequest } from "next/server";

import { clearSession } from "@/lib/auth/session";
import { LOGIN_PATH } from "@/lib/routes";

export const GET = async (request: NextRequest) => {
  await clearSession();
  return NextResponse.redirect(new URL(LOGIN_PATH, request.nextUrl));
};
