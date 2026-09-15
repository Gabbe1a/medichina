import Link from "next/link";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/session";

export const dynamic = "force-dynamic";

const links = [
  ["/admin", "Обзор"],
  ["/admin/services", "Услуги"],
  ["/admin/prices", "Цены"],
  ["/admin/doctors", "Врачи"],
  ["/admin/reviews", "Отзывы"],
  ["/admin/pages", "Страницы"],
  ["/admin/contacts", "Контакты"],
  ["/admin/gallery", "Галерея"],
  ["/admin/leads", "Заявки"],
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await requireAdmin();
  if (!session) redirect("/admin/login");

  return (
    <div className="min-h-screen bg-[#f4f7fb] md:grid md:grid-cols-[240px_1fr]">
      <aside className="bg-footer p-5 text-white">
        <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-white/50">CMS</p>
        <p className="mt-1 text-lg font-bold">Один к Одному</p>
        <nav className="mt-6 grid gap-1 text-sm">
          {links.map(([href, label]) => (
            <Link key={href} href={href} className="rounded-xl px-3 py-2 hover:bg-white/10">
              {label}
            </Link>
          ))}
        </nav>
        <form action="/api/admin/logout" method="post" className="mt-8">
          <button className="text-sm text-white/60">Выйти</button>
        </form>
      </aside>
      <div className="p-5 md:p-8">{children}</div>
    </div>
  );
}
