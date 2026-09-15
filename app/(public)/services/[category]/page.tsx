import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { serviceHref } from "@/lib/routes";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const service = await prisma.service.findFirst({
    where: { topSlug: category, parentId: null, published: true },
  });
  return { title: service?.title ?? "Услуга" };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const service = await prisma.service.findFirst({
    where: { topSlug: category, parentId: null, published: true },
    include: {
      children: { where: { published: true }, orderBy: { sortOrder: "asc" } },
      prices: { where: { active: true }, orderBy: { sortOrder: "asc" } },
    },
  });

  if (!service) notFound();

  return (
    <div className="mx-auto max-w-[1100px] px-4 py-12 md:px-8">
      <p className="text-sm text-muted">
        <Link href="/services">Услуги</Link> / {service.title}
      </p>
      <h1 className="mt-3 text-5xl font-semibold tracking-tight text-navy">{service.title}</h1>
      <div className="prose-clinic mt-6 max-w-3xl whitespace-pre-line">{service.description}</div>
      <div className="mt-10 grid gap-3">
        {service.children.map((child) => (
          <Link
            key={child.id}
            href={serviceHref(child)}
            className="rounded-[24px] bg-white px-5 py-4 font-semibold text-navy"
          >
            {child.title}
          </Link>
        ))}
      </div>
    </div>
  );
}
