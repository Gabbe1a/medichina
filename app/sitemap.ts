import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";
import { serviceHref } from "@/lib/routes";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  const base =
    configured && !configured.includes("localhost") && !configured.includes("127.0.0.1")
      ? configured
      : "http://94.249.239.210:8091";
  const [services, doctors] = await Promise.all([
    prisma.service.findMany({ where: { published: true } }),
    prisma.doctor.findMany({ where: { published: true } }),
  ]);

  const staticRoutes = [
    "",
    "/about",
    "/services",
    "/doctors",
    "/prices",
    "/reviews",
    "/contacts",
    "/privacy",
    "/legal",
    "/akcii",
    "/patients",
    "/patients/faq",
  ];

  return [
    ...staticRoutes.map((path) => ({ url: `${base}${path}`, changeFrequency: "weekly" as const, priority: path === "" ? 1 : 0.7 })),
    ...services.map((service) => ({ url: `${base}${serviceHref(service)}`, changeFrequency: "monthly" as const, priority: 0.6 })),
    ...doctors.map((doctor) => ({ url: `${base}/doctors/${doctor.slug}`, changeFrequency: "monthly" as const, priority: 0.5 })),
  ];
}
