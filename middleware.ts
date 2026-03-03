import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./src/i18n/routing";

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const response = intlMiddleware(request);
  const pathname = request.nextUrl.pathname;
  const country = request.headers.get("x-vercel-ip-country") || "";

  if (country === "UA" && pathname.startsWith("/ru")) {
    const newPath = "/ua" + pathname.slice(3);
    return NextResponse.redirect(new URL(newPath || "/ua", request.url));
  }

  if (country === "RU" && pathname.startsWith("/ua")) {
    const newPath = "/ru" + pathname.slice(3);
    return NextResponse.redirect(new URL(newPath || "/ru", request.url));
  }

  return response;
}

export const config = {
  matcher: ["/", "/((?!api|_next|_vercel|.*\\..*).*)"],
};
