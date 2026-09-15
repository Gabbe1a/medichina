import Image from "next/image";
import Link from "next/link";
import { AppointmentForm } from "@/components/public/AppointmentForm";
import { CircularCta } from "@/components/public/CircularCta";
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
      <section className="relative mt-6 overflow-hidden rounded-[40px] bg-[#8ec4ff] px-6 py-10 shadow-[0_24px_80px_rgba(0,85,255,0.16)] md:px-12 md:py-14">
        <div className="grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-navy/70">
              Стоматология на Войковской
            </p>
            <h1 className="mt-4 max-w-xl text-5xl font-semibold leading-[0.95] tracking-tight text-white md:text-7xl">
              Вернём уверенность в улыбке
            </h1>
            <div className="mt-6 flex items-center gap-3">
              <div className="flex -space-x-3">
                {doctors.slice(0, 3).map((doctor) => (
                  <img
                    key={doctor.id}
                    src={doctor.photoUrl}
                    alt={doctor.name}
                    className="h-10 w-10 rounded-full border-2 border-white object-cover"
                  />
                ))}
              </div>
              <p className="text-sm font-bold text-white">
                {settings.rating} · {settings.reviewsCount} отзывов
              </p>
            </div>
            <p className="mt-6 max-w-md text-base leading-7 text-white/90">
              Современная диагностика и спокойное лечение в клинике «Один к Одному».
              Составим план без лишних процедур — и доведём его до предсказуемого результата.
            </p>
          </div>

          <div className="relative min-h-[320px]">
            <Image
              src="/images/hero-tooth.png"
              alt="Сюрреалистичная иллюстрация: гигантский зуб и команда стоматологов"
              width={1400}
              height={788}
              priority
              className="mx-auto w-full max-w-[620px] object-contain"
            />
            <div className="absolute bottom-2 left-2 md:bottom-6 md:left-6">
              <CircularCta />
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-[220px_1fr] md:items-end">
          <div className="rounded-[28px] bg-white p-5 shadow-[0_12px_30px_rgba(0,47,108,0.08)]">
            <p className="text-3xl font-extrabold text-navy">{settings.rating}</p>
            <p className="mt-1 text-sm leading-5 text-muted">
              рейтинг клиники на Яндекс Картах · {settings.ratingsCount} оценок
            </p>
          </div>
          <p className="hidden text-sm text-white/80 md:block">
            Пять минут от метро Войковская · ежедневно {settings.hours.replace(" ежедневно", "")}
          </p>
        </div>
      </section>

      <section id="about-clinic" className="mt-20 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-accent">О клинике</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight text-navy md:text-5xl">
            Лечение, в котором можно разобраться
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-muted">
            Мы работаем у Войковской больше пятнадцати лет: терапия, хирургия, имплантация,
            ортодонтия и протезирование — в одной команде. Если зуб можно сохранить, сначала ищем
            этот путь.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              ["15+ лет", "приём в одном здании"],
              ["10 000+", "пациентов доверили нам зубы"],
              ["Лицензия", settings.license],
            ].map(([title, text]) => (
              <div key={title} className="rounded-[24px] bg-white p-5 shadow-[0_10px_30px_rgba(0,47,108,0.06)]">
                <p className="text-xl font-extrabold text-navy">{title}</p>
                <p className="mt-2 text-sm text-muted">{text}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {gallery.slice(0, 4).map((image) => (
            <img
              key={image.id}
              src={image.url}
              alt={image.alt}
              className="h-40 w-full rounded-[24px] object-cover md:h-48"
            />
          ))}
        </div>
      </section>

      <section id="services" className="mt-24">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-accent">Услуги</p>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight text-navy">11 направлений — один маршрут</h2>
          </div>
          <Link href="/services" className="hidden text-sm font-bold text-accent md:block">
            Все услуги
          </Link>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => (
            <Link
              key={service.id}
              href={serviceHref(service)}
              className="rounded-[28px] bg-white p-6 shadow-[0_10px_30px_rgba(0,47,108,0.06)] transition hover:-translate-y-0.5"
            >
              <h3 className="text-xl font-bold text-navy">{service.title}</h3>
              <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted">
                {service.description.replace(/\n+/g, " ").slice(0, 160)}…
              </p>
              <p className="mt-4 text-xs font-extrabold uppercase tracking-[0.16em] text-accent">
                {service.children.length} подразделов
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section id="process" className="mt-24 rounded-[36px] bg-white px-6 py-12 md:px-10">
        <p className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-accent">Как мы работаем</p>
        <h2 className="mt-3 text-4xl font-semibold tracking-tight text-navy">Четыре шага без суеты</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-4">
          {[
            ["01", "Диалог", "Вы рассказываете, что беспокоит. Мы слушаем и не продаём план «с порога»."],
            ["02", "Снимки и план", "Цифровая диагностика и понятный маршрут: сроки, этапы, ориентир по бюджету."],
            ["03", "Лечение", "Анестезия, аккуратная работа и контроль на каждом этапе."],
            ["04", "Наблюдение", "Гигиена, гарантийные осмотры и связь с лечащим врачом."],
          ].map(([num, title, text]) => (
            <div key={num} className="rounded-[24px] bg-[#f4f8ff] p-5">
              <p className="text-sm font-extrabold text-accent">{num}</p>
              <h3 className="mt-2 text-xl font-bold text-navy">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="specialists" className="mt-24">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-accent">Команда</p>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight text-navy">Врачи, к которым возвращаются</h2>
          </div>
          <Link href="/doctors" className="text-sm font-bold text-accent">
            Все специалисты
          </Link>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          {doctors.map((doctor) => (
            <Link
              key={doctor.id}
              href={`/doctors/${doctor.slug}`}
              className="overflow-hidden rounded-[28px] bg-white shadow-[0_10px_30px_rgba(0,47,108,0.06)]"
            >
              <img src={doctor.photoUrl} alt={doctor.name} className="h-56 w-full object-cover" />
              <div className="p-4">
                <p className="font-bold leading-5 text-navy">{doctor.name}</p>
                <p className="mt-2 text-sm text-muted">{doctor.role}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-24">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-accent">Отзывы</p>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight text-navy">Живые истории с Яндекса</h2>
          </div>
          <Link href="/reviews" className="text-sm font-bold text-accent">
            Читать все
          </Link>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {reviews.map((review) => (
            <article key={review.id} className="rounded-[28px] bg-white p-6 shadow-[0_10px_30px_rgba(0,47,108,0.06)]">
              <div className="flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-full bg-[#e8f2ff] text-sm font-bold text-navy">
                  {initials(review.author)}
                </div>
                <div>
                  <p className="font-bold text-navy">{review.author}</p>
                  <p className="text-xs text-muted">
                    {review.rating}.0 · {review.dateLabel}
                  </p>
                </div>
              </div>
              <p className="mt-4 line-clamp-6 text-sm leading-6 text-muted">{review.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="faq" className="mt-24 grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-accent">Вопросы</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight text-navy">Коротко о главном</h2>
          <Link href="/patients/faq" className="mt-4 inline-block text-sm font-bold text-accent">
            Все ответы
          </Link>
        </div>
        <div className="grid gap-3">
          {faqs.slice(0, 5).map((faq) => (
            <details key={faq.id} className="rounded-[24px] bg-white px-5 py-4">
              <summary className="cursor-pointer font-bold text-navy">{faq.question}</summary>
              <p className="mt-3 text-sm leading-6 text-muted">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="mt-24 grid gap-8 rounded-[36px] bg-white p-6 md:grid-cols-2 md:p-10">
        <div>
          <p className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-accent">Запись</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight text-navy">Подберём удобное время</h2>
          <p className="mt-4 text-muted">
            Или позвоните {settings.phone1}. Перезвоним и согласуем врача.
          </p>
          <div className="mt-6 overflow-hidden rounded-[24px]">
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
