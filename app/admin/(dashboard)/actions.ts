"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/session";
import { toWebpUrl } from "@/lib/media";

async function guard() {
  const session = await requireAdmin();
  if (!session) redirect("/admin/login");
}

function boolFromForm(value: FormDataEntryValue | null) {
  return value === "on" || value === "true";
}

export async function saveService(formData: FormData) {
  await guard();
  const id = String(formData.get("id") || "");
  const data = {
    title: String(formData.get("title") || ""),
    slug: String(formData.get("slug") || ""),
    path: String(formData.get("path") || ""),
    topSlug: String(formData.get("topSlug") || ""),
    description: String(formData.get("description") || ""),
    seoTitle: String(formData.get("seoTitle") || ""),
    seoDescription: String(formData.get("seoDescription") || ""),
    published: boolFromForm(formData.get("published")),
    sortOrder: Number(formData.get("sortOrder") || 0),
  };
  if (id) {
    await prisma.service.update({ where: { id }, data });
  } else {
    await prisma.service.create({ data });
  }
  revalidatePath("/admin/services");
  revalidatePath("/services");
  redirect("/admin/services");
}

export async function deleteService(formData: FormData) {
  await guard();
  await prisma.service.delete({ where: { id: String(formData.get("id")) } });
  revalidatePath("/admin/services");
}

export async function savePrice(formData: FormData) {
  await guard();
  const id = String(formData.get("id") || "");
  const data = {
    title: String(formData.get("title") || ""),
    price: Number(String(formData.get("price") || "0").replace(/\D/g, "")),
    categoryName: String(formData.get("categoryName") || ""),
    code: String(formData.get("code") || ""),
    active: boolFromForm(formData.get("active")),
    sortOrder: Number(formData.get("sortOrder") || 0),
  };
  if (id) await prisma.priceItem.update({ where: { id }, data });
  else await prisma.priceItem.create({ data });
  revalidatePath("/admin/prices");
  revalidatePath("/prices");
  redirect("/admin/prices");
}

export async function deletePrice(formData: FormData) {
  await guard();
  await prisma.priceItem.delete({ where: { id: String(formData.get("id")) } });
  revalidatePath("/admin/prices");
}

export async function saveDoctor(formData: FormData) {
  await guard();
  const id = String(formData.get("id") || "");
  const data = {
    name: String(formData.get("name") || ""),
    slug: String(formData.get("slug") || ""),
    role: String(formData.get("role") || ""),
    specialty: String(formData.get("specialty") || ""),
    experience: String(formData.get("experience") || ""),
    education: String(formData.get("education") || ""),
    bio: String(formData.get("bio") || ""),
    photoUrl: toWebpUrl(String(formData.get("photoUrl") || "")),
    published: boolFromForm(formData.get("published")),
    sortOrder: Number(formData.get("sortOrder") || 0),
  };
  if (id) await prisma.doctor.update({ where: { id }, data });
  else await prisma.doctor.create({ data });
  revalidatePath("/admin/doctors");
  revalidatePath("/doctors");
  redirect("/admin/doctors");
}

export async function deleteDoctor(formData: FormData) {
  await guard();
  await prisma.doctor.delete({ where: { id: String(formData.get("id")) } });
  revalidatePath("/admin/doctors");
}

export async function saveReview(formData: FormData) {
  await guard();
  const id = String(formData.get("id") || "");
  const data = {
    author: String(formData.get("author") || ""),
    dateLabel: String(formData.get("dateLabel") || ""),
    rating: Number(formData.get("rating") || 5),
    text: String(formData.get("text") || ""),
    published: boolFromForm(formData.get("published")),
    sortOrder: Number(formData.get("sortOrder") || 0),
  };
  if (id) await prisma.review.update({ where: { id }, data });
  else await prisma.review.create({ data });
  revalidatePath("/admin/reviews");
  revalidatePath("/reviews");
  redirect("/admin/reviews");
}

export async function deleteReview(formData: FormData) {
  await guard();
  await prisma.review.delete({ where: { id: String(formData.get("id")) } });
  revalidatePath("/admin/reviews");
}

export async function savePage(formData: FormData) {
  await guard();
  const id = String(formData.get("id") || "");
  const data = {
    slug: String(formData.get("slug") || ""),
    title: String(formData.get("title") || ""),
    excerpt: String(formData.get("excerpt") || ""),
    body: String(formData.get("body") || ""),
    published: boolFromForm(formData.get("published")),
  };
  if (id) await prisma.page.update({ where: { id }, data });
  else await prisma.page.create({ data });
  revalidatePath("/admin/pages");
  redirect("/admin/pages");
}

export async function deletePage(formData: FormData) {
  await guard();
  await prisma.page.delete({ where: { id: String(formData.get("id")) } });
  revalidatePath("/admin/pages");
}

export async function saveSettings(formData: FormData) {
  await guard();
  await prisma.setting.update({
    where: { id: "site" },
    data: {
      brand: String(formData.get("brand") || ""),
      legalEntity: String(formData.get("legalEntity") || ""),
      address: String(formData.get("address") || ""),
      metro: String(formData.get("metro") || ""),
      phone1: String(formData.get("phone1") || ""),
      phone2: String(formData.get("phone2") || ""),
      email: String(formData.get("email") || ""),
      hours: String(formData.get("hours") || ""),
      whatsapp: String(formData.get("whatsapp") || ""),
      yandexOrgId: String(formData.get("yandexOrgId") || ""),
      lon: Number(formData.get("lon") || 0),
      lat: Number(formData.get("lat") || 0),
      rating: Number(formData.get("rating") || 0),
      reviewsCount: Number(formData.get("reviewsCount") || 0),
      ratingsCount: Number(formData.get("ratingsCount") || 0),
      license: String(formData.get("license") || ""),
      ogrn: String(formData.get("ogrn") || ""),
      metrika: String(formData.get("metrika") || ""),
      howToGet: String(formData.get("howToGet") || ""),
      receptionNote: String(formData.get("receptionNote") || ""),
    },
  });
  revalidatePath("/admin/contacts");
  revalidatePath("/contacts");
}

export async function saveGallery(formData: FormData) {
  await guard();
  const id = String(formData.get("id") || "");
  const data = {
    url: toWebpUrl(String(formData.get("url") || "")),
    alt: String(formData.get("alt") || ""),
    published: boolFromForm(formData.get("published")),
    sortOrder: Number(formData.get("sortOrder") || 0),
  };
  if (id) await prisma.galleryImage.update({ where: { id }, data });
  else await prisma.galleryImage.create({ data });
  revalidatePath("/admin/gallery");
  revalidatePath("/about");
  redirect("/admin/gallery");
}

export async function deleteGallery(formData: FormData) {
  await guard();
  await prisma.galleryImage.delete({ where: { id: String(formData.get("id")) } });
  revalidatePath("/admin/gallery");
}

export async function saveFaq(formData: FormData) {
  await guard();
  const id = String(formData.get("id") || "");
  const data = {
    question: String(formData.get("question") || ""),
    answer: String(formData.get("answer") || ""),
    published: boolFromForm(formData.get("published")),
    sortOrder: Number(formData.get("sortOrder") || 0),
  };
  if (id) await prisma.faq.update({ where: { id }, data });
  else await prisma.faq.create({ data });
  revalidatePath("/admin/pages");
  revalidatePath("/patients/faq");
  redirect("/admin/pages");
}
