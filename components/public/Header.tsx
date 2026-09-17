"use client";

import Link from "next/link";
import { useState } from "react";
import type { Service } from "@prisma/client";
import { serviceHref } from "@/lib/routes";

type NavService = Service & { children: Service[] };

const navLinkClass =
  "inline-flex h-9 items-center justify-center rounded-lg px-3 text-[11px] font-extrabold uppercase leading-none tracking-[0.14em] text-navy hover:bg-[#f7f2eb] hover:text-chocolate transition-colors";

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
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 rounded-full border border-[#eae3d9] bg-white px-4 py-2.5 shadow-[0_4px_20px_rgba(30,20,10,0.04)] md:px-6">
        <Link href="/" className="flex items-center gap-3">
          <img src="/media/logos/logo.svg" alt="Один к Одному" className="h-10 w-10 rounded-xl" />
          <span className="text-sm font-extrabold tracking-tight text-navy">
            Один к Одному
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          <Link className={navLinkClass} href="/about">
            О клинике
          </Link>
          <div
            className="relative flex items-center"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <Link className={navLinkClass} href="/services">
              Услуги
            </Link>
            {servicesOpen ? (
              <div className="absolute left-1/2 top-full z-50 w-[640px] -translate-x-1/2 pt-3">
                <div className="rounded-2xl border border-[#eae3d9] bg-white p-5 shadow-[0_16px_40px_rgba(30,20,10,0.08)]">
                  <div className="grid grid-cols-2 gap-2">
                    {services.map((item) => (
                      <Link
                        key={item.id}
                        href={serviceHref(item)}
                        className="rounded-xl px-3 py-2 text-sm font-semibold text-navy transition hover:bg-[#f7f2eb] hover:text-chocolate"
                      >
                        {item.title}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : null}
          </div>
          <Link className={navLinkClass} href="/akcii">
            Акции
          </Link>
          <Link className={navLinkClass} href="/doctors">
            Врачи
          </Link>
          <Link className={navLinkClass} href="/prices">
            Цены
          </Link>
          <Link className={navLinkClass} href="/reviews">
            Отзывы
          </Link>
          <Link className={navLinkClass} href="/patients/faq">
            Вопросы
          </Link>
          <Link className={navLinkClass} href="/contacts">
            Контакты
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={`tel:${phone.replace(/[^\d+]/g, "")}`}
            className="hidden text-sm font-bold text-navy hover:text-chocolate transition-colors md:block"
          >
            {phone}
          </a>
          <Link
            href="/contacts#zapis"
            className="hidden rounded-full bg-chocolate px-5 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white transition hover:bg-chocolate-light md:inline-flex"
          >
            Запись
          </Link>
          <button
            type="button"
            className="rounded-full border border-[#eae3d9] px-3.5 py-2 text-sm font-bold text-navy lg:hidden"
            onClick={() => {
              setOpen((value) => {
                if (value) setMobileServicesOpen(false);
                return !value;
              });
            }}
            aria-expanded={open}
          >
            Меню
          </button>
        </div>
      </div>

      {open ? (
        <div className="mx-auto mt-2 max-w-[1440px] rounded-2xl border border-[#eae3d9] bg-white p-5 shadow-lg lg:hidden">
          <div className="grid gap-2 text-sm font-semibold text-navy">
            <Link href="/about" onClick={() => setOpen(false)}>О клинике</Link>
            <div className="rounded-xl bg-[#f7f2eb]">
              <button
                type="button"
                aria-expanded={mobileServicesOpen}
                onClick={() => setMobileServicesOpen((value) => !value)}
                className="flex w-full items-center justify-between px-3 py-2.5 text-left font-bold text-chocolate"
              >
                <span>Услуги</span>
                <span className={`text-lg font-bold text-chocolate transition-transform ${mobileServicesOpen ? "rotate-180" : ""}`}>
                  ⌄
                </span>
              </button>
              {mobileServicesOpen ? (
                <div className="grid gap-1 border-t border-[#eae3d9] px-3 pb-3 pt-2">
                  <Link
                    href="/services"
                    className="rounded-lg bg-white px-3 py-2 text-sm font-bold text-chocolate"
                    onClick={() => setOpen(false)}
                  >
                    Все направления →
                  </Link>
                  {services.map((item) => (
                    <Link
                      key={item.id}
                      href={serviceHref(item)}
                      className="rounded-lg px-3 py-2 text-sm font-medium text-muted transition hover:bg-white hover:text-chocolate"
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
