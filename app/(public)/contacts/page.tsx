import type { Metadata } from "next";
import { AppointmentForm } from "@/components/public/AppointmentForm";
import { LazyIframe } from "@/components/public/LazyIframe";
import { phoneHref } from "@/lib/format";
import { getSettings } from "@/lib/queries";

export const metadata: Metadata = { title: "Контакты" };

export default async function ContactsPage() {
  const settings = await getSettings();

  return (
    <div className="mx-auto grid max-w-[1200px] gap-8 px-4 py-8 md:grid-cols-2 md:px-8 md:py-12">
      <div className="rounded-2xl border border-[#eae3d9] bg-white p-6 shadow-xs md:p-8">
        <p className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-accent">Контакты</p>
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-navy md:text-5xl">Как нас найти</h1>
        <div className="mt-6 grid gap-3 text-sm text-muted">
          <p>
            <strong className="text-navy">Адрес:</strong> {settings.address}
          </p>
          <p>
            <strong className="text-navy">Метро:</strong> {settings.metro}
          </p>
          <p>
            <strong className="text-navy">Телефоны:</strong>{" "}
            <a className="hover:text-accent font-medium" href={phoneHref(settings.phone1)}>{settings.phone1}</a>,{" "}
            <a className="hover:text-accent font-medium" href={phoneHref(settings.phone2)}>{settings.phone2}</a>
          </p>
          <p>
            <strong className="text-navy">Email:</strong>{" "}
            <a className="hover:text-accent font-medium" href={`mailto:${settings.email}`}>{settings.email}</a>
          </p>
          <p>
            <strong className="text-navy">Часы:</strong> {settings.hours}
          </p>
          <p>
            <a className="font-bold text-chocolate underline hover:text-accent" href={settings.whatsapp} target="_blank" rel="noreferrer">
              Написать в WhatsApp
            </a>
          </p>
        </div>
        <p className="mt-6 max-w-xl text-sm leading-6 text-muted">{settings.howToGet}</p>
        <LazyIframe
          title="Карта клиники"
          src={`https://yandex.ru/map-widget/v1/?ll=${settings.lon}%2C${settings.lat}&z=16&pt=${settings.lon},${settings.lat},pm2rdm&oid=${settings.yandexOrgId}`}
          className="mt-6 h-80 rounded-xl border border-[#eae3d9]"
        />
      </div>
      <div className="rounded-2xl border border-[#eae3d9] bg-white p-6 shadow-xs md:p-8">
        <h2 className="text-2xl font-bold text-navy">Записаться на консультацию</h2>
        <p className="mt-2 text-sm text-muted">Оставьте контакты — администратор перезвонит и подберёт удобное время.</p>
        <div className="mt-6">
          <AppointmentForm />
        </div>
      </div>
    </div>
  );
}
