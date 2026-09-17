import Link from "next/link";
import type { Setting } from "@prisma/client";
import { phoneHref } from "@/lib/format";

export function Footer({ settings }: { settings: Setting }) {
  return (
    <footer className="mt-20 bg-footer text-white">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-16 md:grid-cols-4 md:px-10">
        <div>
          <div className="flex items-center gap-3">
            <img src="/media/logos/logo.svg" alt="Логотип стоматологии «Один к Одному»" className="h-12 w-12 rounded-2xl bg-white" />
            <div>
              <p className="text-lg font-extrabold">Один к Одному</p>
              <p className="text-xs uppercase tracking-[0.16em] text-accent">стоматология</p>
            </div>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-6 text-white/70">
            Точная диагностика и спокойное лечение у метро Войковская. Без спешки и без лишних процедур.
          </p>
        </div>

        <div>
          <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-accent">Разделы</p>
          <div className="mt-4 grid gap-2 text-sm">
            <Link href="/about">О клинике</Link>
            <Link href="/services">Услуги</Link>
            <Link href="/doctors">Врачи</Link>
            <Link href="/prices">Прейскурант</Link>
            <Link href="/reviews">Отзывы</Link>
            <Link href="/patients/faq">Вопросы</Link>
          </div>
        </div>

        <div>
          <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-accent">Пациентам</p>
          <div className="mt-4 grid gap-2 text-sm">
            <Link href="/contacts">Как добраться</Link>
            <Link href="/legal">Официальная информация</Link>
            <Link href="/privacy">Политика ПДн</Link>
            <a href={settings.whatsapp} target="_blank" rel="noreferrer">
              WhatsApp
            </a>
          </div>
        </div>

        <div>
          <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-accent">Контакты</p>
          <div className="mt-4 grid gap-2 text-sm text-white/80">
            <a href={phoneHref(settings.phone1)}>{settings.phone1}</a>
            <a href={phoneHref(settings.phone2)}>{settings.phone2}</a>
            <a href={`mailto:${settings.email}`}>{settings.email}</a>
            <p>{settings.address}</p>
            <p>{settings.hours}</p>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-3 px-5 py-6 text-xs text-white/50 md:flex-row md:items-center md:justify-between md:px-10">
          <p>
            © {new Date().getFullYear()} {settings.legalEntity}. Лицензия {settings.license}
          </p>
          <p>
            Источник рейтинга:{" "}
            <a
              className="underline decoration-white/30 hover:text-white"
              href={`https://yandex.ru/maps/org/${settings.yandexOrgId}/`}
              target="_blank"
              rel="noreferrer"
            >
              Яндекс Карты
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
