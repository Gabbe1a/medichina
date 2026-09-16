import type { Metadata } from "next";
import { headers } from "next/headers";
import { SiteChrome } from "@/components/public/SiteChrome";
import { pathMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const path = headersListSafe(headerList);
  return pathMetadata(path);
}

function headersListSafe(headerList: Headers) {
  return headerList.get("x-pathname") || "/";
}

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return <SiteChrome>{children}</SiteChrome>;
}
