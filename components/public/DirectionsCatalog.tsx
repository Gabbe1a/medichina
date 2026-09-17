import Image from "next/image";
import Link from "next/link";
import type { Service } from "@prisma/client";
import { serviceHref } from "@/lib/routes";
import { serviceArtwork } from "@/lib/service-art";

type CatalogService = Service & { children: Service[] };

export function DirectionsCatalog({ services }: { services: CatalogService[] }) {
  return (
    <section id="catalog" className="mt-16">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="text-[11px] font-extrabold uppercase tracking-[0.24em] text-accent">Каталог</span>
          <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-navy md:text-4xl">
            Все 11 направлений стоматологии
          </h2>
        </div>
        <Link
          href="/services"
          className="inline-flex items-center gap-2 rounded-xl border border-[#d8cfc2] bg-white px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-navy transition hover:bg-[#f6f1ea] hover:border-chocolate"
        >
          Полный каталог →
        </Link>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {services.map((service, index) => (
          <Link
            key={service.id}
            href={serviceHref(service)}
            className="group overflow-hidden rounded-2xl border border-[#eae3d9] bg-white shadow-2xs transition hover:-translate-y-0.5 hover:border-chocolate hover:shadow-xs"
          >
            <div className="relative h-36 overflow-hidden bg-chocolate">
              <Image
                src={serviceArtwork(service.topSlug)}
                alt={service.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105 opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#402924]/85 via-[#402924]/30 to-transparent" />
              <span className="absolute left-4 top-4 grid h-8 w-8 place-items-center rounded-lg bg-white/95 text-[11px] font-black text-chocolate shadow-xs">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>
            <div className="p-5">
              <h3 className="text-lg font-extrabold leading-tight text-navy group-hover:text-accent transition-colors">{service.title}</h3>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {service.children.slice(0, 3).map((child) => (
                  <span key={child.id} className="rounded-md border border-[#eae3d9] bg-[#fbf9f6] px-2.5 py-1 text-[11px] font-medium text-navy">
                    {child.title}
                  </span>
                ))}
                {service.children.length > 3 && (
                  <span className="rounded-md bg-[#f4eee6] px-2.5 py-1 text-[11px] font-bold text-muted">
                    +{service.children.length - 3}
                  </span>
                )}
              </div>
              <div className="mt-5 flex items-center justify-between border-t border-[#eae3d9] pt-3 text-xs">
                <span className="font-extrabold uppercase tracking-[0.08em] text-chocolate">
                  {service.children.length} подразделов
                </span>
                <span className="font-extrabold text-navy transition-transform group-hover:translate-x-1">Перейти →</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
