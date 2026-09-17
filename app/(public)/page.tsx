import Link from "next/link";
import Image from "next/image";
import { AppointmentForm } from "@/components/public/AppointmentForm";
import { ServicesAccordion } from "@/components/public/ServicesAccordion";
import { TeamSlider } from "@/components/public/TeamSlider";
import { BeforeAfterInteractive } from "@/components/public/BeforeAfterInteractive";
import { VideoReviewsSection } from "@/components/public/VideoReviewsSection";
import { LazyIframe } from "@/components/public/LazyIframe";
import { ReviewCard } from "@/components/public/ReviewCard";
import {
  getDoctors,
  getFaqs,
  getGallery,
  getReviews,
  getSettings,
  getTopServices,
} from "@/lib/queries";
import { DirectionsCatalog } from "@/components/public/DirectionsCatalog";

export default async function HomePage() {
  const [settings, services, doctors, reviews, faqs, gallery] = await Promise.all([
    getSettings(),
    getTopServices(),
    getDoctors(),
    getReviews(6),
    getFaqs(),
    getGallery(6),
  ]);

  return (
    <div className="home-page mx-auto max-w-[1440px] px-4 pb-20 md:px-8">
      {/* HERO SECTION — Calm light beige luxury styling without anxious surgical screws */}
      <section className="relative mt-6 min-h-[720px] overflow-hidden rounded-2xl border border-[#eae3d9] bg-[#fbf9f6] shadow-[0_4px_24px_rgba(30,20,10,0.04)] md:min-h-[580px]">
        <div className="grid min-h-[720px] md:min-h-[580px] md:grid-cols-[1.05fr_0.95fr]">
          {/* Left Column: Solid text layer */}
          <div className="relative z-10 flex flex-col justify-between bg-gradient-to-b from-[#fbf9f6] via-[#fbf9f6]/95 to-[#fbf9f6]/80 px-6 py-8 md:bg-gradient-to-r md:from-[#fbf9f6] md:via-[#fbf9f6]/95 md:to-transparent md:px-10 md:py-12 lg:px-14 lg:py-14">
            <div>
              <span className="inline-block rounded-full border border-[#e4dcce] bg-[#f4ece1] px-3.5 py-1 text-[11px] font-extrabold uppercase tracking-[0.24em] text-chocolate">
                Стоматология на Войковской
              </span>

              <h1 className="mt-4 max-w-xl text-3xl font-extrabold leading-[1.06] tracking-tight text-navy sm:text-5xl md:text-5xl lg:text-6xl">
                Точная цифровая стоматология с бережным сохранением зубов
              </h1>

              {/* Social proof badge */}
              <div className="mt-6 flex items-center gap-3">
                <div className="flex -space-x-3">
                  {doctors.slice(0, 4).map((doctor) => (
                    <Image
                      key={doctor.id}
                      src={doctor.photoUrl}
                      alt={doctor.name}
                      width={40}
                      height={40}
                      sizes="40px"
                      className="h-10 w-10 rounded-full border-2 border-white object-cover shadow-xs"
                    />
                  ))}
                </div>
                <div>
                  <p className="text-sm font-bold text-navy">
                    {settings.rating} ★ · {settings.reviewsCount} отзывов
                  </p>
                  <p className="text-xs text-muted">
                    Реальные оценки на{" "}
                    <a
                      className="font-bold underline decoration-chocolate/30 text-chocolate hover:text-chocolate-light"
                      href={`https://yandex.ru/maps/org/${settings.yandexOrgId}/`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Яндекс Картах
                    </a>
                  </p>
                </div>
              </div>

              <p className="mt-6 max-w-lg text-base leading-relaxed text-muted md:text-[17px]">
                Диагностика Sirona и приём 10 опытных специалистов в одном здании клиники «Один к Одному».
                Работаем под микроскопом, используем швейцарские и немецкие материалы и спасаем каждый живой зуб без навязывания лишних процедур.
              </p>

              {/* CTAs and Rating Pill */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  href="/contacts#zapis"
                  className="inline-flex items-center gap-2 rounded-xl bg-chocolate px-7 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-xs transition hover:bg-chocolate-light"
                >
                  <span>Записаться на приём</span>
                  <span>→</span>
                </Link>
                <Link
                  href="/prices"
                  className="inline-flex items-center gap-2 rounded-xl border border-[#d8cfc2] bg-white px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-navy transition hover:bg-[#f6f1ea] hover:border-chocolate"
                >
                  Посмотреть цены
                </Link>
              </div>
            </div>

            {/* Rating card */}
            <div className="mt-8 inline-flex max-w-md items-center gap-4 rounded-xl border border-[#eae3d9] bg-white p-4 shadow-2xs">
              <span className="text-3xl font-black text-chocolate">{settings.rating}</span>
              <div className="text-xs leading-tight text-muted">
                <p className="font-bold text-navy">Рейтинг клиники</p>
                <p className="mt-0.5">{settings.ratingsCount} подтвержденных оценок на Яндексе</p>
              </div>
            </div>
          </div>

          {/* Right Column: peaceful aesthetic smile artwork */}
          <div className="absolute inset-0 z-0 m-0 min-h-0 overflow-hidden md:relative md:inset-auto md:z-auto md:min-h-[580px] lg:relative lg:inset-auto lg:z-auto lg:m-0 lg:min-h-[580px]">
            <Image
              src="/images/hero-aesthetic.webp"
              alt="Эстетичный и естественный результат лечения в клинике Один к Одному"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="h-full w-full object-cover object-[70%_50%]"
            />
          </div>
        </div>

        {/* Bottom micro info */}
        <div className="relative z-10 border-t border-[#eae3d9] bg-white/80 px-6 py-3 md:px-14">
          <p className="text-xs font-semibold text-muted">
            Москва, 1-й Новоподмосковный пер., 2/1 (5 мин от м. Войковская) · Ежедневно 09:00–21:00
          </p>
        </div>
      </section>

      {/* SECTION 2: INTERACTIVE SERVICES ACCORDION (Phenomenon/Celestia Inspired) */}
      <section id="services" className="mt-20">
        <ServicesAccordion />
      </section>

      {/* SECTION 3: ABOUT CLINIC & VALUES */}
      <section id="about-clinic" className="mt-16 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-2xl border border-[#eae3d9] bg-white p-7 shadow-xs md:p-10">
          <span className="text-[11px] font-extrabold uppercase tracking-[0.24em] text-chocolate">
            О клинике
          </span>
          <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-navy md:text-4xl">
            Почему лечение ведут в одном здании у Войковской?
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted md:text-[17px]">
            Мы работаем у Войковской больше пятнадцати лет: терапия, микроскопия, хирургия, имплантация,
            ортодонтия и протезирование — в одном здании и в одной сплочённой команде. Наш главный
            принцип — не навязывать избыточных вмешательств и спасать каждый живой зуб.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              ["15+ лет", "приём в одном здании"],
              ["10 000+", "пациентов доверили нам зубы"],
              ["Лицензия", settings.license],
            ].map(([title, text]) => (
              <div key={title} className="rounded-xl border border-[#eae3d9] bg-[#fbf9f6] p-4 text-left">
                <p className="text-xl font-extrabold text-chocolate">{title}</p>
                <p className="mt-1 text-xs text-muted">{text}</p>
              </div>
            ))}
          </div>
          <div className="mt-7">
            <Link
              href="/about"
              className="inline-flex items-center gap-2 rounded-xl border border-[#d8cfc2] bg-white px-5 py-3 text-xs font-bold uppercase tracking-wider text-navy transition hover:bg-[#f6f1ea] hover:border-chocolate"
            >
              Подробнее об истории и стандартах клиники →
            </Link>
          </div>
        </div>

        {/* Gallery preview */}
        <div className="grid grid-cols-2 gap-3">
          {gallery.slice(0, 4).map((image) => (
            <div key={image.id} className="relative h-44 overflow-hidden rounded-2xl border border-[#eae3d9] shadow-xs md:h-52">
              <Image
                src={image.url}
                alt={image.alt}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 4: TEAM SLIDER (Dribbble/Phenomenon Inspired with real doctors & bio) */}
      <section id="specialists" className="mt-20">
        <TeamSlider doctors={doctors} />
      </section>

      {/* SECTION 5: CLINICAL CASES BEFORE & AFTER (Interactive Drag Slider) */}
      <section className="mt-20">
        <BeforeAfterInteractive />
      </section>

      {/* SECTION 6: VIDEO REVIEWS & PATIENT STORIES */}
      <section className="mt-20">
        <VideoReviewsSection />
      </section>

      {/* SECTION 7: PROCESS (4 STEPS) */}
      <section id="process" className="mt-16 rounded-2xl border border-[#eae3d9] bg-white p-7 shadow-xs md:p-12">
        <span className="text-[11px] font-extrabold uppercase tracking-[0.24em] text-chocolate">
          Как мы работаем
        </span>
        <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-navy md:text-4xl">
          Как проходит первый визит и лечение?
        </h2>
        <div className="mt-8 grid gap-4 md:grid-cols-4">
          {[
            ["01", "Консультация и диалог", "Вы рассказываете, что беспокоит. Мы внимательно слушаем и проводим первичный осмотр без спешки."],
            ["02", "3D-снимки и план", "Высокоточная цифровая диагностика Sirona. Составляем прозрачную смету и фиксируем этапы."],
            ["03", "Бережное лечение", "Современная безопасная анестезия, микроскоп и сохранение максимального объема собственных тканей."],
            ["04", "Гарантия и забота", "Юридическая гарантия, контрольные осмотры и постоянная связь с вашим лечащим доктором."],
          ].map(([num, title, text]) => (
            <div key={num} className="rounded-xl border border-[#eae3d9] bg-[#fbf9f6] p-5">
              <span className="text-xs font-black text-chocolate">{num}</span>
              <h3 className="mt-2 text-base font-bold text-navy">{title}</h3>
              <p className="mt-2 text-xs leading-relaxed text-muted">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <DirectionsCatalog services={services} />

      <section className="mt-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="text-[11px] font-extrabold uppercase tracking-[0.24em] text-chocolate">Отзывы Яндекса</span>
            <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-navy md:text-4xl">
              Слова благодарности от пациентов
            </h2>
            <p className="mt-3 text-sm text-muted">
              {settings.rating} из 5 на основе {settings.ratingsCount} оценок на{" "}
              <a
                className="font-bold text-chocolate underline decoration-chocolate/30 hover:text-chocolate-light"
                href={`https://yandex.ru/maps/org/${settings.yandexOrgId}/`}
                target="_blank"
                rel="noreferrer"
              >
                Яндекс Картах
              </a>
            </p>
          </div>
          <Link
            href="/reviews"
            className="inline-flex items-center gap-2 rounded-xl border border-[#d8cfc2] bg-white px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-navy transition hover:bg-[#f6f1ea] hover:border-chocolate"
          >
            Все отзывы →
          </Link>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {reviews.map((review, index) => (
            <ReviewCard
              key={review.id}
              review={review}
              featured={index === 0}
              sourceHref={`https://yandex.ru/maps/org/${settings.yandexOrgId}/`}
            />
          ))}
        </div>
      </section>

      {/* SECTION 10: FAQ */}
      <section id="faq" className="mt-16 grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <span className="text-[11px] font-extrabold uppercase tracking-[0.24em] text-chocolate">
            Вопросы и ответы
          </span>
          <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-navy md:text-4xl">
            Какие вопросы пациенты задают чаще всего?
          </h2>
          <p className="mt-3 text-sm text-muted">
            Собрали ответы на самые популярные вопросы пациентов об обезболивании, гарантиях и приёме.
          </p>
          <Link
            href="/patients/faq"
            className="mt-6 inline-flex items-center gap-2 rounded-xl border border-[#d8cfc2] bg-white px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-navy transition hover:bg-[#f6f1ea] hover:border-chocolate"
          >
            Все частые вопросы →
          </Link>
        </div>
        <div className="grid gap-3">
          {faqs.slice(0, 6).map((faq) => (
            <details key={faq.id} className="rounded-xl border border-[#eae3d9] bg-white px-5 py-4 shadow-2xs">
              <summary className="cursor-pointer font-bold text-navy hover:text-chocolate transition-colors">{faq.question}</summary>
              <p className="mt-3 text-xs leading-relaxed text-muted">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      {/* SECTION 11: APPOINTMENT & MAP */}
      <section className="mt-16 grid gap-8 rounded-2xl border border-[#eae3d9] bg-white p-7 shadow-xs md:grid-cols-2 md:p-10">
        <div>
          <span className="text-[11px] font-extrabold uppercase tracking-[0.24em] text-chocolate">
            Запись на приём
          </span>
          <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-navy md:text-4xl">
            Как записаться на консультацию?
          </h2>
          <p className="mt-3 text-sm text-muted">
            Или позвоните нам напрямую:{" "}
            <a href={`tel:${settings.phone1.replace(/\D/g, "")}`} className="font-bold text-navy hover:text-chocolate transition-colors">
              {settings.phone1}
            </a>
            . Мы всегда на связи с 09:00 до 21:00.
          </p>
          <LazyIframe
            title="Клиника Один к Одному на карте"
            src={`https://yandex.ru/map-widget/v1/?ll=${settings.lon}%2C${settings.lat}&z=16&pt=${settings.lon},${settings.lat},pm2rdm&oid=${settings.yandexOrgId}`}
            className="mt-6 h-64 rounded-xl border border-[#eae3d9]"
          />
        </div>
        <AppointmentForm />
      </section>
    </div>
  );
}
