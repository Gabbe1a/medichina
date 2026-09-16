import Image from "next/image";
import Link from "next/link";
import type { Service } from "@prisma/client";
import { serviceHref } from "@/lib/routes";
import { serviceArtwork } from "@/lib/service-art";

type CatalogService = Service & { children: Service[] };

export function DirectionsCatalog({ services }: { services: CatalogService[] }) {
  return (
    <section className="mt-20">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="text-[11px] font-extrabold uppercase tracking-[0.24em] text-accent">Каталог</span>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-navy md:text-5xl">
            Все 11 направлений стоматологии
          </h2>
        </div>
        <Link
          href="/services"
          className="rounded-full bg-white px-5 py-2.5 text-sm font-bold text-navy shadow-sm transition hover:bg-navy hover:text-white"
        >
          Полный каталог →
        </Link>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {services.map((service, index) => (
          <Link
            key={service.id}
            href={serviceHref(service)}
            className="group overflow-hidden rounded-[28px] bg-white shadow-[0_12px_32px_rgba(0,47,108,0.08)] transition hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(0,47,108,0.14)]"
          >
            <div className="relative h-36 overflow-hidden bg-[#0a2c5b]">
              <Image
                src={serviceArtwork(service.topSlug)}
                alt={service.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#061a38]/80 via-[#061a38]/20 to-transparent" />
              <span className="absolute left-4 top-4 grid h-8 w-8 place-items-center rounded-full bg-white text-[11px] font-black text-accent">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>
            <div className="p-5">
              <h3 className="text-xl font-extrabold leading-tight text-navy group-hover:text-accent">{service.title}</h3>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {service.children.slice(0, 3).map((child) => (
                  <span key={child.id} className="rounded-full bg-[#edf5ff] px-2.5 py-1 text-[11px] font-semibold text-navy">
                    {child.title}
                  </span>
                ))}
                {service.children.length > 3 && (
                  <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-bold text-muted">
                    +{service.children.length - 3}
                  </span>
                )}
              </div>
              <div className="mt-5 flex items-center justify-between border-t border-[var(--line)] pt-3 text-xs">
                <span className="font-extrabold uppercase tracking-[0.08em] text-accent">
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
