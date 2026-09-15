import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function AdminHomePage() {
  const [services, prices, doctors, reviews, leads] = await Promise.all([
    prisma.service.count(),
    prisma.priceItem.count(),
    prisma.doctor.count(),
    prisma.review.count({ where: { published: true } }),
    prisma.lead.count(),
  ]);

  const cards = [
    ["Услуги", services, "/admin/services"],
    ["Цены", prices, "/admin/prices"],
    ["Врачи", doctors, "/admin/doctors"],
    ["Отзывы", reviews, "/admin/reviews"],
    ["Заявки", leads, "/admin/leads"],
  ] as const;

  return (
    <div>
      <h1 className="text-3xl font-semibold text-navy">Панель управления</h1>
      <p className="mt-2 text-sm text-muted">Контент сайта «Один к Одному». Сессия защищена httpOnly cookie.</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {cards.map(([label, value, href]) => (
          <Link key={label} href={href} className="rounded-[24px] bg-white p-5">
            <p className="text-sm text-muted">{label}</p>
            <p className="mt-2 text-3xl font-extrabold text-navy">{value}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
