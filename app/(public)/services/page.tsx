import type { Metadata } from "next";
import Link from "next/link";
import { ServicesAccordion } from "@/components/public/ServicesAccordion";
import { getTopServices } from "@/lib/queries";
import { serviceHref } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Услуги стоматологической клиники «Один к Одному»",
  description:
    "Полный каталог стоматологических услуг: терапия, ортопедия, имплантация, хирургия, ортодонтия, отбеливание и диагностика.",
};

export default async function ServicesPage() {
  const services = await getTopServices();

  return (
    <div className="mx-auto max-w-[1300px] px-4 py-12 md:px-8">
      {/* Featured visual accordion */}
      <ServicesAccordion />

      {/* Full 11-category directory */}
      <div className="mt-16">
        <span className="text-[11px] font-extrabold uppercase tracking-[0.24em] text-accent">
          Все направления
        </span>
        <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-navy md:text-5xl">
          Полный рубрикатор процедур
        </h2>
        <p className="mt-3 max-w-2xl text-base text-muted">
          158 специализированных подразделов и методик лечения. Выберите категорию для подробного описания этапов, показаний и цен.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <article
              key={service.id}
              className="flex flex-col justify-between rounded-[32px] border border-white/80 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-accent">
                  {service.children.length} процедур
                </span>
                <Link href={serviceHref(service)}>
                  <h3 className="mt-1 text-2xl font-bold text-navy hover:text-accent transition-colors">
                    {service.title}
                  </h3>
                </Link>
                <p className="mt-3 line-clamp-3 text-xs leading-relaxed text-muted">
                  {service.description.replace(/\n+/g, " ").slice(0, 180)}…
                </p>

                {/* Subcategories tags */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {service.children.slice(0, 5).map((child) => (
                    <Link
                      key={child.id}
                      href={serviceHref(child)}
                      className="rounded-full bg-[#f4f8ff] px-2.5 py-1 text-[11px] font-semibold text-navy transition hover:bg-navy hover:text-white"
                    >
                      {child.title}
                    </Link>
                  ))}
                  {service.children.length > 5 && (
                    <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-bold text-muted">
                      +{service.children.length - 5}
                    </span>
                  )}
                </div>
              </div>

              <div className="mt-6 border-t border-[var(--line)] pt-3">
                <Link
                  href={serviceHref(service)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-accent hover:text-navy"
                >
                  <span>Все услуги раздела</span>
                  <span>→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
