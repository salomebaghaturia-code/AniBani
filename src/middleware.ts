import { NextRequest, NextResponse } from "next/server";

const SUPPORTED = ["ka", "en"] as const;
const DEFAULT_LANG = "ka";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // First segment of the path
  const first = pathname.split("/")[1] ?? "";

  // If already prefixed with a supported language, just forward + set x-locale header
  if ((SUPPORTED as readonly string[]).includes(first)) {
    const res = NextResponse.next();
    res.headers.set("x-locale", first);
    return res;
  }

  // Otherwise, redirect to the default language, preserving the rest of the path + query
  const url = req.nextUrl.clone();
  url.pathname = `/${DEFAULT_LANG}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

// Skip API, admin, Next internals, and common static asset paths.
// `matcher` runs on inclusion, so anything not matched is skipped entirely.
export const config = {
  matcher: [
    "/((?!api|admin|_next/static|_next/image|images|fonts|favicon\\.png|sitemap\\.xml|robots\\.txt).*)"
  ]
};
