import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const parts = request.nextUrl.pathname.split("/").filter(Boolean);
  if (parts[0] === "services" && parts.length >= 4) {
    const category = parts[1];
    const leaf = parts.at(-1);
    if (category && leaf) {
      const destination = request.nextUrl.clone();
      destination.pathname = `/services/${category}/${leaf}`;
      return NextResponse.redirect(destination, 301);
    }
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-pathname", request.nextUrl.pathname);
  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)"],
};
