import Link from "next/link";
import { AppointmentForm } from "@/components/public/AppointmentForm";
import { ServicesAccordion } from "@/components/public/ServicesAccordion";
import { TeamSlider } from "@/components/public/TeamSlider";
import { BeforeAfterInteractive } from "@/components/public/BeforeAfterInteractive";
import { VideoReviewsSection } from "@/components/public/VideoReviewsSection";
import { initials } from "@/lib/format";
import {
  getDoctors,
  getFaqs,
  getGallery,
  getReviews,
  getSettings,
  getTopServices,
} from "@/lib/queries";
import { serviceHref } from "@/lib/routes";

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
    <div className="mx-auto max-w-[1440px] px-4 pb-20 md:px-8">
      {/* HERO SECTION — Full-bleed artwork with a readable left text veil */}
      <section className="relative mt-6 min-h-[760px] overflow-hidden rounded-[32px] border border-white/60 bg-[#b9ddff] shadow-[0_30px_90px_rgba(0,85,255,0.18)] md:min-h-[620px] md:rounded-[40px]">
        <div className="grid min-h-[760px] md:min-h-[620px] md:grid-cols-[0.95fr_1.05fr]">
          {/* Left Column: Solid text layer */}
          <div className="relative z-10 flex flex-col justify-between bg-gradient-to-b from-[#98c9ff]/95 via-[#98c9ff]/75 to-[#98c9ff]/25 px-6 py-8 md:bg-gradient-to-r md:from-[#98c9ff] md:via-[#98c9ff]/95 md:to-transparent md:px-10 md:py-12 lg:px-14 lg:py-16">
            <div>
              <span className="inline-block rounded-full bg-white/50 px-3.5 py-1 text-[11px] font-extrabold uppercase tracking-[0.24em] text-navy backdrop-blur-sm">
                Стоматология на Войковской
              </span>

              <h1 className="mt-4 max-w-xl text-4xl font-extrabold leading-[1.02] tracking-tight text-navy sm:text-6xl md:text-6xl lg:text-7xl">
                Вернём уверенность в улыбке
              </h1>

              {/* Social proof badge */}
              <div className="mt-6 flex items-center gap-3">
                <div className="flex -space-x-3">
                  {doctors.slice(0, 4).map((doctor) => (
                    <img
                      key={doctor.id}
                      src={doctor.photoUrl}
                      alt={doctor.name}
                      className="h-10 w-10 rounded-full border-2 border-white object-cover shadow-sm"
                    />
                  ))}
                </div>
                <div>
                  <p className="text-sm font-bold text-navy">
                    {settings.rating} ★ · {settings.reviewsCount} отзывов
                  </p>
                  <p className="text-xs text-navy/70">Реальные оценки на Яндекс Картах</p>
                </div>
              </div>

              <p className="mt-6 max-w-lg text-base leading-relaxed text-navy/85 md:text-lg">
                Современная цифровая диагностика и бережное лечение в клинике «Один к Одному».
                Безболезненно, на материалах экспертного класса и с сохранением ваших собственных зубов.
              </p>

              {/* CTAs and Rating Pill */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  href="/contacts#zapis"
                  className="inline-flex items-center gap-2 rounded-full bg-navy px-8 py-4 text-sm font-bold uppercase tracking-wider text-white shadow-xl transition hover:bg-accent"
                >
                  <span>Записаться на приём</span>
                  <span>→</span>
                </Link>
                <Link
                  href="/prices"
                  className="inline-flex items-center gap-2 rounded-full border border-navy/20 bg-white/70 px-6 py-4 text-sm font-bold text-navy backdrop-blur-md transition hover:bg-white"
                >
                  Посмотреть цены
                </Link>
              </div>
            </div>

            {/* Rating card */}
            <div className="mt-8 inline-flex items-center gap-4 rounded-[22px] bg-white/95 p-4 shadow-sm backdrop-blur-md max-w-md">
              <span className="text-3xl font-black text-navy">{settings.rating}</span>
              <div className="text-xs leading-tight text-muted">
                <p className="font-bold text-navy">Рейтинг клиники</p>
                <p className="mt-0.5">{settings.ratingsCount} подтвержденных оценок на Яндексе</p>
              </div>
            </div>
          </div>

          {/* Right Column: artwork fills the panel instead of sitting in a white box */}
          <div className="absolute inset-0 z-0 m-0 min-h-0 overflow-hidden md:relative md:inset-auto md:z-auto md:-ml-12 md:min-h-[620px] lg:absolute lg:inset-0 lg:z-0 lg:m-0 lg:min-h-0">
            <img
              src="/images/hero-clean.webp"
              alt="Сюрреалистичный 3D-образ: имплант и врачи клиники"
              className="absolute inset-0 h-full w-full scale-[1.12] object-cover object-[72%_50%] drop-shadow-[0_20px_50px_rgba(0,47,108,0.25)] lg:scale-[1.08] lg:object-[70%_50%]"
            />
          </div>
        </div>

        {/* Bottom micro info */}
        <div className="relative z-10 border-t border-white/20 bg-white/30 px-6 py-3 backdrop-blur-md md:px-14">
          <p className="text-xs font-semibold text-navy/80">
            Москва, 1-й Новоподмосковный пер., 2/1 (5 мин от м. Войковская) · Ежедневно 09:00–21:00
          </p>
        </div>
      </section>

      {/* SECTION 2: INTERACTIVE SERVICES ACCORDION (Phenomenon/Celestia Inspired) */}
      <section id="services" className="mt-20">
        <ServicesAccordion />
      </section>

      {/* SECTION 3: ABOUT CLINIC & VALUES */}
      <section id="about-clinic" className="mt-20 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[36px] bg-white p-8 shadow-[0_15px_40px_rgba(0,47,108,0.05)] md:p-10">
          <span className="text-[11px] font-extrabold uppercase tracking-[0.24em] text-accent">
            О клинике
          </span>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-navy md:text-5xl">
            Лечение, в котором легко разобраться
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted md:text-lg">
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
              <div key={title} className="rounded-[22px] bg-[#f4f8ff] p-4 text-left">
                <p className="text-xl font-extrabold text-navy">{title}</p>
                <p className="mt-1 text-xs text-muted">{text}</p>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <Link
              href="/about"
              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-accent transition hover:text-navy"
            >
              Подробнее об истории и стандартах клиники →
            </Link>
          </div>
        </div>

        {/* Gallery preview */}
        <div className="grid grid-cols-2 gap-3">
          {gallery.slice(0, 4).map((image) => (
            <img
              key={image.id}
              src={image.url}
              alt={image.alt}
                    loading="lazy"
                    decoding="async"
              className="h-44 w-full rounded-[26px] object-cover shadow-sm md:h-52"
            />
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
      <section id="process" className="mt-20 rounded-[36px] bg-white p-8 shadow-[0_15px_40px_rgba(0,47,108,0.05)] md:p-12">
        <span className="text-[11px] font-extrabold uppercase tracking-[0.24em] text-accent">
          Как мы работаем
        </span>
        <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-navy md:text-5xl">
          Прозрачный путь без суеты
        </h2>
        <div className="mt-8 grid gap-4 md:grid-cols-4">
          {[
            ["01", "Консультация и диалог", "Вы рассказываете, что беспокоит. Мы внимательно слушаем и проводим первичный осмотр без спешки."],
            ["02", "3D-снимки и план", "Высокоточная цифровая диагностика Sirona. Составляем прозрачную смету и фиксируем этапы."],
            ["03", "Бережное лечение", "Современная безопасная анестезия, микроскоп и сохранение максимального объема собственных тканей."],
            ["04", "Гарантия и забота", "Юридическая гарантия, контрольные осмотры и постоянная связь с вашим лечащим доктором."],
          ].map(([num, title, text]) => (
            <div key={num} className="rounded-[24px] bg-[#f4f8ff] p-5">
              <span className="text-xs font-black text-accent">{num}</span>
              <h3 className="mt-2 text-lg font-bold text-navy">{title}</h3>
              <p className="mt-2 text-xs leading-relaxed text-muted">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 8: 11 NESTED SERVICES DIRECTORY */}
      <section className="mt-20">
        <div className="flex items-end justify-between gap-4">
          <div>
            <span className="text-[11px] font-extrabold uppercase tracking-[0.24em] text-accent">
              Каталог
            </span>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-navy md:text-5xl">
              Все 11 направлений стоматологии
            </h2>
          </div>
          <Link href="/services" className="hidden text-sm font-bold text-accent md:block">
            Полный каталог →
          </Link>
        </div>
        <div className="mt-8 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => (
            <Link
              key={service.id}
              href={serviceHref(service)}
              className="group flex min-h-[132px] flex-col justify-between rounded-[24px] border border-white/80 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-[#9fc4f5] hover:shadow-[0_14px_30px_rgba(0,47,108,0.12)]"
            >
              <h3 className="text-lg font-extrabold leading-tight text-navy group-hover:text-accent md:text-xl">
                {service.title}
              </h3>
              <div className="mt-4 flex items-center justify-between border-t border-[var(--line)] pt-3 text-[11px]">
                <span className="font-extrabold uppercase tracking-[0.08em] text-accent">
                  {service.children.length} подразделов
                </span>
                <span className="font-extrabold text-navy transition-transform group-hover:translate-x-1">
                  Перейти →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* SECTION 9: REVIEWS ARCHIVE */}
      <section className="mt-20">
        <div className="flex items-end justify-between">
          <div>
            <span className="text-[11px] font-extrabold uppercase tracking-[0.24em] text-accent">
              Отзывы Яндекса
            </span>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-navy md:text-5xl">
              Слова благодарности от пациентов
            </h2>
          </div>
          <Link href="/reviews" className="text-sm font-bold text-accent">
            Все отзывы →
          </Link>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {reviews.map((review) => (
            <article key={review.id} className="rounded-[28px] bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-full bg-[#e8f2ff] text-sm font-bold text-navy">
                  {initials(review.author)}
                </div>
                <div>
                  <p className="font-bold text-navy">{review.author}</p>
                  <p className="text-xs text-muted">
                    {review.rating}.0 ★ · {review.dateLabel}
                  </p>
                </div>
              </div>
              <p className="mt-4 line-clamp-6 text-xs leading-relaxed text-muted">{review.text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* SECTION 10: FAQ */}
      <section id="faq" className="mt-20 grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <span className="text-[11px] font-extrabold uppercase tracking-[0.24em] text-accent">
            Вопросы и ответы
          </span>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-navy md:text-5xl">
            Коротко о важном
          </h2>
          <p className="mt-3 text-sm text-muted">
            Собрали ответы на самые популярные вопросы пациентов об обезболивании, гарантиях и приёме.
          </p>
          <Link href="/patients/faq" className="mt-5 inline-block text-sm font-bold text-accent">
            Все частые вопросы →
          </Link>
        </div>
        <div className="grid gap-3">
          {faqs.slice(0, 6).map((faq) => (
            <details key={faq.id} className="rounded-[24px] bg-white px-5 py-4 shadow-sm">
              <summary className="cursor-pointer font-bold text-navy">{faq.question}</summary>
              <p className="mt-3 text-xs leading-relaxed text-muted">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      {/* SECTION 11: APPOINTMENT & MAP */}
      <section className="mt-20 grid gap-8 rounded-[36px] bg-white p-6 shadow-sm md:grid-cols-2 md:p-10">
        <div>
          <span className="text-[11px] font-extrabold uppercase tracking-[0.24em] text-accent">
            Запись на приём
          </span>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-navy md:text-4xl">
            Подберём удобное время
          </h2>
          <p className="mt-3 text-sm text-muted">
            Или позвоните нам напрямую:{" "}
            <a href={`tel:${settings.phone1.replace(/\D/g, "")}`} className="font-bold text-navy">
              {settings.phone1}
            </a>
            . Мы всегда на связи с 09:00 до 21:00.
          </p>
          <div className="mt-6 overflow-hidden rounded-[26px]">
            <iframe
              title="Клиника Один к Одному на карте"
              src={`https://yandex.ru/map-widget/v1/?ll=${settings.lon}%2C${settings.lat}&z=16&pt=${settings.lon},${settings.lat},pm2rdm&oid=${settings.yandexOrgId}`}
              className="h-64 w-full border-0"
              loading="lazy"
            />
          </div>
        </div>
        <AppointmentForm />
      </section>
    </div>
  );
}
