import { prisma } from "@/lib/prisma";
import fs from "node:fs";
import path from "node:path";

export async function getSettings() {
  const settings = await prisma.setting.findUnique({ where: { id: "site" } });
  if (!settings) {
    throw new Error("Site settings are not seeded");
  }
  return settings;
}

export async function getTopServices() {
  return prisma.service.findMany({
    where: { published: true, parentId: null },
    orderBy: { sortOrder: "asc" },
    include: {
      children: {
        where: { published: true },
        orderBy: { sortOrder: "asc" },
      },
    },
  });
}

export async function getServiceByPath(path: string) {
  return prisma.service.findFirst({
    where: { path, published: true },
    include: {
      children: { where: { published: true }, orderBy: { sortOrder: "asc" } },
      parent: true,
      prices: { where: { active: true }, orderBy: { sortOrder: "asc" } },
    },
  });
}

export async function getServiceBySlug(slug: string) {
  return prisma.service.findFirst({
    where: { slug, published: true },
    include: {
      children: { where: { published: true }, orderBy: { sortOrder: "asc" } },
      parent: true,
      prices: { where: { active: true }, orderBy: { sortOrder: "asc" } },
    },
  });
}

export async function getDoctors() {
  return prisma.doctor.findMany({
    where: { published: true },
    orderBy: { sortOrder: "asc" },
  });
}

export async function getDoctor(slug: string) {
  return prisma.doctor.findFirst({
    where: { slug, published: true },
  });
}

export async function getReviews(limit?: number) {
  return prisma.review.findMany({
    where: { published: true },
    orderBy: { sortOrder: "asc" },
    take: limit,
  });
}

export async function getFaqs() {
  const stored = await prisma.faq.findMany({
    where: { published: true },
    orderBy: { sortOrder: "asc" },
  });
  if (stored.length >= 20) return stored;

  const dir = path.join(process.cwd(), "content", "intake", "pages");
  if (!fs.existsSync(dir)) return stored;
  const intake = fs
    .readdirSync(dir)
    .filter((name) => name.startsWith("paczientam__faq__") && name.endsWith(".md"))
    .map((name, index) => {
      const raw = fs.readFileSync(path.join(dir, name), "utf8");
      const question = raw.match(/^#\s+(.+)$/m)?.[1]?.trim() ?? "";
      const marker = raw.lastIndexOf("Записаться на бесплатную консультацию");
      const answer = (marker >= 0 ? raw.slice(0, marker) : raw)
        .split("\n")
        .filter((line) => line.trim() && !line.startsWith("URL:") && !line.startsWith("#"))
        .slice(-30)
        .join(" ")
        .replace(/\s+/g, " ")
        .trim();
      return { id: `intake-${index}`, question, answer, published: true, sortOrder: stored.length + index };
    })
    .filter((item) => item.question && item.answer);
  return [...stored, ...intake];
}

export async function getPage(slug: string) {
  return prisma.page.findFirst({
    where: { slug, published: true },
  });
}

export async function getGallery(limit?: number) {
  return prisma.galleryImage.findMany({
    where: { published: true },
    orderBy: { sortOrder: "asc" },
    take: limit,
  });
}

export async function getPriceGroups() {
  const items = await prisma.priceItem.findMany({
    where: { active: true },
    orderBy: [{ categoryName: "asc" }, { sortOrder: "asc" }],
  });

  const groups = new Map<string, typeof items>();
  for (const item of items) {
    const list = groups.get(item.categoryName) ?? [];
    list.push(item);
    groups.set(item.categoryName, list);
  }
  return Array.from(groups.entries()).map(([categoryName, prices]) => ({
    categoryName,
    prices,
  }));
}
