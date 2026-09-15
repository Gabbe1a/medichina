import type { Metadata } from "next";
import Link from "next/link";
import { getTopServices } from "@/lib/queries";
import { serviceHref } from "@/lib/routes";

export const metadata: Metadata = { title: "Услуги" };

export default async function ServicesPage() {
  const services = await getTopServices();

  return (
    <div className="mx-auto max-w-[1200px] px-4 py-12 md:px-8">
      <p className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-accent">Каталог</p>
      <h1 className="mt-3 text-5xl font-semibold tracking-tight text-navy">Услуги клиники</h1>
      <p className="mt-4 max-w-2xl text-lg text-muted">
        Одиннадцать направлений: от гигиены и терапии до имплантации и ортодонтии. Выберите раздел — внутри подробности и связанные цены.
      </p>
      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {services.map((service) => (
          <article key={service.id} className="rounded-[28px] bg-white p-6 shadow-[0_10px_30px_rgba(0,47,108,0.06)]">
            <Link href={serviceHref(service)}>
              <h2 className="text-2xl font-bold text-navy">{service.title}</h2>
            </Link>
            <p className="mt-3 line-clamp-4 text-sm leading-6 text-muted">
              {service.description.replace(/\n+/g, " ").slice(0, 220)}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {service.children.slice(0, 6).map((child) => (
                <Link
                  key={child.id}
                  href={serviceHref(child)}
                  className="rounded-full bg-[#f3f8ff] px-3 py-1 text-xs font-semibold text-navy"
                >
                  {child.title}
                </Link>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
