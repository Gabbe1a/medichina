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
    <div className="mx-auto max-w-[1300px] px-4 py-8 md:px-8 md:py-12">
      {/* Featured visual accordion */}
      <ServicesAccordion />

      {/* Full 11-category directory */}
      <div className="mt-16 rounded-2xl border border-[#eae3d9] bg-white p-7 shadow-xs md:p-10">
        <span className="text-[11px] font-extrabold uppercase tracking-[0.24em] text-chocolate">
          Все направления
        </span>
        <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-navy md:text-4xl">
          Полный рубрикатор процедур
        </h2>
        <p className="mt-3 max-w-2xl text-base text-muted md:text-[17px]">
          158 специализированных подразделов и методик лечения. Выберите категорию для подробного описания этапов, показаний и цен.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <article
              key={service.id}
              className="flex flex-col justify-between rounded-xl border border-[#eae3d9] bg-white p-6 shadow-2xs transition hover:-translate-y-0.5 hover:border-chocolate hover:shadow-xs"
            >
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-chocolate">
                  {service.children.length} процедур
                </span>
                <Link href={serviceHref(service)}>
                  <h3 className="mt-1 text-xl font-bold text-navy hover:text-chocolate transition-colors">
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
                      className="rounded-md border border-[#eae3d9] bg-[#fbf9f6] px-2.5 py-1 text-[11px] font-medium text-navy transition hover:bg-chocolate hover:text-white"
                    >
                      {child.title}
                    </Link>
                  ))}
                  {service.children.length > 5 && (
                    <span className="rounded-md bg-[#f4eee6] px-2.5 py-1 text-[11px] font-bold text-muted">
                      +{service.children.length - 5}
                    </span>
                  )}
                </div>
              </div>

              <div className="mt-6 border-t border-[#eae3d9] pt-3">
                <Link
                  href={serviceHref(service)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-chocolate hover:text-chocolate-light"
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
