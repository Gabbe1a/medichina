import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getGallery, getPage, getSettings } from "@/lib/queries";

export const metadata: Metadata = { title: "О клинике" };

const DIRECTIONS = [
  ["Гигиена", "/services/professionalnaya_chistka_zubov"],
  ["Терапия", "/services/terapevticheskaja_stomatologija"],
  ["Хирургия", "/services/hirurgicheskaja_stomatologija"],
  ["Имплантация", "/services/implantaciya_zubov"],
  ["Ортодонтия", "/services/ortodonticheskoe_lechenie"],
  ["Протезирование", "/services/protesirovanie_zubov"],
] as const;

function splitParagraphs(body: string) {
  return body
    .split(/\n+/)
    .map((part) => part.trim())
    .filter(Boolean);
}

function principleCards(paragraph?: string) {
  if (!paragraph) return [];
  const sentences = paragraph.split(/(?<=\.)\s+/).filter((item) => item.length > 24);
  const labels: [string, string][] = [
    ["не закрыть приём", "Безопасный план"],
    ["диагностика опирается", "Цифровые снимки"],
    ["зуб можно сохранить", "Зубосохранение"],
  ];
  return sentences.map((text, index) => {
    const match = labels.find(([needle]) => text.toLowerCase().includes(needle));
    return { title: match?.[1] ?? `Как мы работаем`, text, index };
  });
}

export default async function AboutPage() {
  const [page, gallery, settings] = await Promise.all([
    getPage("about"),
    getGallery(),
    getSettings(),
  ]);

  const paragraphs = splitParagraphs(page?.body ?? "");
  const lead = paragraphs[0] ?? page?.excerpt ?? "";
  const principles = principleCards(paragraphs[1]);
  const extras = paragraphs.slice(2).filter((item) => !/лицензи/i.test(item));
  const heroPhoto = gallery[0]?.url ?? "/images/hero-clean.webp";
  const heroAlt = gallery[0]?.alt || "Клиника «Один к Одному»";
  const galleryRest = gallery.slice(1);

  return (
    <div className="mx-auto max-w-[1200px] px-4 py-8 md:px-8 md:py-12">
      <div className="overflow-hidden rounded-[28px] bg-white shadow-[0_20px_60px_rgba(0,47,108,0.1)] md:rounded-[36px]">
        <div className="grid md:grid-cols-[1.05fr_.95fr]">
          <div className="p-5 md:p-10">
            <p className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-accent">О клинике</p>
            <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-navy md:text-5xl">«Один к Одному»</h1>
            <p className="mt-4 text-sm font-medium leading-relaxed text-muted md:text-base md:leading-7">{lead}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {DIRECTIONS.map(([title, href]) => (
                <Link
                  key={href}
                  href={href}
                  className="rounded-full bg-[#edf5ff] px-3 py-1.5 text-[11px] font-bold text-navy transition hover:bg-navy hover:text-white"
                >
                  {title}
                </Link>
              ))}
            </div>
            <Link
              href="/contacts#zapis"
              className="mt-7 inline-flex rounded-full bg-navy px-6 py-3 text-sm font-bold text-white transition hover:bg-accent"
            >
              Записаться на консультацию →
            </Link>
          </div>
          <div className="relative min-h-[220px] overflow-hidden bg-[#0a2c5b] md:min-h-[420px]">
            <Image src={heroPhoto} alt={heroAlt} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#061a38]/75 to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 rounded-[22px] bg-white/95 p-4 shadow-sm">
              <p className="text-2xl font-black text-navy">
                {settings.rating} ★
              </p>
              <p className="mt-1 text-xs font-semibold text-muted">
                {settings.reviewsCount} отзывов · {settings.ratingsCount} оценок на Яндекс Картах
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        {[
          ["15+ лет", "приём у метро Войковская"],
          ["10 врачей", "хирурги, ортопеды, терапевты и ортодонты"],
          ["Ежедневно", settings.hours],
        ].map(([title, text]) => (
          <div key={title} className="rounded-[24px] bg-white px-5 py-4 shadow-sm">
            <p className="text-xl font-extrabold text-navy">{title}</p>
            <p className="mt-1 text-xs leading-relaxed text-muted">{text}</p>
          </div>
        ))}
      </div>

      {principles.length > 0 && (
        <section className="mt-8">
          <p className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-white/80">Принципы лечения</p>
          <div className="mt-3 grid gap-4 md:grid-cols-3">
            {principles.map((item) => (
              <article
                key={item.text}
                className="rounded-[28px] bg-white p-5 shadow-[0_16px_40px_rgba(0,47,108,0.08)] md:p-6"
              >
                <span className="grid h-8 w-8 place-items-center rounded-full bg-[#dbeaff] text-[11px] font-black text-accent">
                  {String(item.index + 1).padStart(2, "0")}
                </span>
                <h2 className="mt-4 text-xl font-extrabold tracking-tight text-navy">{item.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted">{item.text}</p>
              </article>
            ))}
          </div>
        </section>
      )}

      {extras.length > 0 && (
        <div className="mt-4 space-y-4">
          {extras.map((text) => (
            <p key={text.slice(0, 40)} className="rounded-[28px] bg-white p-5 text-sm leading-relaxed text-muted shadow-sm md:p-6">
              {text}
            </p>
          ))}
        </div>
      )}

      <section className="mt-8 grid gap-4 md:grid-cols-3">
        <article className="rounded-[28px] bg-white p-5 shadow-sm md:p-6">
          <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-accent">Режим</p>
          <h2 className="mt-2 text-xl font-extrabold text-navy">{settings.hours}</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">{settings.address}</p>
        </article>
        <article className="rounded-[28px] bg-white p-5 shadow-sm md:p-6">
          <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-accent">Как добраться</p>
          <h2 className="mt-2 text-xl font-extrabold text-navy">Метро {settings.metro}</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">{settings.howToGet}</p>
        </article>
        <article className="rounded-[28px] bg-white p-5 shadow-sm md:p-6">
          <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-accent">Лицензия</p>
          <h2 className="mt-2 text-xl font-extrabold text-navy">{settings.legalEntity}</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">Лицензия {settings.license}</p>
          <Link href="/legal" className="mt-4 inline-flex text-xs font-bold text-accent hover:text-navy">
            Официальные документы →
          </Link>
        </article>
      </section>

      {galleryRest.length > 0 || gallery.length > 0 ? (
        <section className="mt-10">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-white/80">Пространство</p>
              <h2 className="mt-2 text-3xl font-extrabold text-white">Галерея клиники</h2>
            </div>
            <Link href="/contacts" className="hidden rounded-full bg-white px-5 py-3 text-xs font-bold text-navy md:inline-flex">
              Как нас найти →
            </Link>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {(galleryRest.length ? galleryRest : gallery).map((image) => (
              <div key={image.id} className="relative h-56 overflow-hidden rounded-[24px]">
                <Image src={image.url} alt={image.alt} fill sizes="(max-width: 640px) 100vw, 33vw" className="object-cover" />
              </div>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
