"use client";

import Link from "next/link";
import { useState } from "react";
import type { Service } from "@prisma/client";
import { serviceHref } from "@/lib/routes";

type NavService = Service & { children: Service[] };

export function Header({
  services,
  phone,
}: {
  services: NavService[];
  phone: string;
}) {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 px-4 pt-4 md:px-8">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 rounded-full border border-white/70 bg-white/75 px-4 py-2.5 shadow-[0_10px_40px_rgba(0,47,108,0.08)] backdrop-blur-xl md:px-6">
        <Link href="/" className="flex items-center gap-3">
          <img src="/media/logos/logo.svg" alt="Один к Одному" className="h-10 w-10 rounded-2xl" />
          <span className="text-sm font-extrabold tracking-tight text-navy">
            Один к Одному
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          <Link className="rounded-full px-3 py-2 text-[11px] font-extrabold uppercase tracking-[0.14em] text-navy hover:bg-[#f3f8ff]" href="/about">
            О клинике
          </Link>
          <div
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <Link className="rounded-full px-3 py-2 text-[11px] font-extrabold uppercase tracking-[0.14em] text-navy hover:bg-[#f3f8ff]" href="/services">
              Услуги
            </Link>
            {servicesOpen ? (
              <div className="absolute left-1/2 top-full z-50 w-[640px] -translate-x-1/2 pt-3">
                <div className="rounded-[28px] border border-white/80 bg-white p-5 shadow-[0_20px_60px_rgba(0,47,108,0.12)]">
                  <div className="grid grid-cols-2 gap-2">
                    {services.map((item) => (
                      <Link
                        key={item.id}
                        href={serviceHref(item)}
                        className="rounded-2xl px-3 py-2 text-sm font-semibold text-navy transition hover:bg-[#f3f8ff]"
                      >
                        {item.title}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : null}
          </div>
          <Link className="rounded-full px-3 py-2 text-[11px] font-extrabold uppercase tracking-[0.14em] text-navy hover:bg-[#f3f8ff]" href="/akcii">
            Акции
          </Link>
          <Link className="rounded-full px-3 py-2 text-[11px] font-extrabold uppercase tracking-[0.14em] text-navy hover:bg-[#f3f8ff]" href="/doctors">
            Врачи
          </Link>
          <Link className="rounded-full px-3 py-2 text-[11px] font-extrabold uppercase tracking-[0.14em] text-navy hover:bg-[#f3f8ff]" href="/prices">
            Цены
          </Link>
          <Link className="rounded-full px-3 py-2 text-[11px] font-extrabold uppercase tracking-[0.14em] text-navy hover:bg-[#f3f8ff]" href="/reviews">
            Отзывы
          </Link>
          <Link className="rounded-full px-3 py-2 text-[11px] font-extrabold uppercase tracking-[0.14em] text-navy hover:bg-[#f3f8ff]" href="/patients/faq">
            Вопросы
          </Link>
          <Link className="rounded-full px-3 py-2 text-[11px] font-extrabold uppercase tracking-[0.14em] text-navy hover:bg-[#f3f8ff]" href="/contacts">
            Контакты
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={`tel:${phone.replace(/[^\d+]/g, "")}`}
            className="hidden text-sm font-bold text-navy md:block"
          >
            {phone}
          </a>
          <Link
            href="/contacts#zapis"
            className="hidden rounded-full bg-navy px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white md:inline-flex"
          >
            Запись
          </Link>
          <button
            type="button"
            className="rounded-full border border-[var(--line)] px-3 py-2 text-sm font-bold text-navy lg:hidden"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
          >
            Меню
          </button>
        </div>
      </div>

      {open ? (
        <div className="mx-auto mt-2 max-w-[1440px] rounded-[28px] bg-white p-5 shadow-lg lg:hidden">
          <div className="grid gap-2 text-sm font-semibold text-navy">
            <Link href="/about" onClick={() => setOpen(false)}>О клинике</Link>
            <div className="rounded-2xl bg-[#f4f8ff]">
              <div className="flex items-center justify-between">
                <Link href="/services" className="flex-1 px-3 py-2.5" onClick={() => setOpen(false)}>
                  Услуги
                </Link>
                <button
                  type="button"
                  aria-label={mobileServicesOpen ? "Скрыть направления" : "Показать направления"}
                  aria-expanded={mobileServicesOpen}
                  onClick={() => setMobileServicesOpen((value) => !value)}
                  className="px-4 py-2.5 text-lg font-bold text-accent"
                >
                  <span className={`block transition-transform ${mobileServicesOpen ? "rotate-180" : ""}`}>⌄</span>
                </button>
              </div>
              {mobileServicesOpen ? (
                <div className="grid gap-1 border-t border-[#dceafd] px-3 pb-3 pt-2">
                  {services.map((item) => (
                    <Link
                      key={item.id}
                      href={serviceHref(item)}
                      className="rounded-xl px-3 py-2 text-sm font-medium text-muted transition hover:bg-white hover:text-navy"
                      onClick={() => setOpen(false)}
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>
            <Link href="/akcii" onClick={() => setOpen(false)}>Акции</Link>
            <Link href="/doctors" onClick={() => setOpen(false)}>Врачи</Link>
            <Link href="/prices" onClick={() => setOpen(false)}>Цены</Link>
            <Link href="/reviews" onClick={() => setOpen(false)}>Отзывы</Link>
            <Link href="/patients/faq" onClick={() => setOpen(false)}>Вопросы</Link>
            <Link href="/contacts" onClick={() => setOpen(false)}>Контакты</Link>
          </div>
        </div>
      ) : null}

    </header>
  );
}
