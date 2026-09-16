import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const parts = request.nextUrl.pathname.split("/").filter(Boolean);
  if (parts[0] !== "services" || parts.length < 4) return NextResponse.next();

  // The old site used nested service paths. The CMS stores the same leaf by
  // category + slug, so preserve those links instead of returning a 404.
  const category = parts[1];
  const leaf = parts.at(-1);
  if (!category || !leaf) return NextResponse.next();

  const destination = request.nextUrl.clone();
  destination.pathname = `/services/${category}/${leaf}`;
  return NextResponse.redirect(destination, 301);
}

export const config = {
  matcher: ["/services/:path*"],
};
