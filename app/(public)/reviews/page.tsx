import type { Metadata } from "next";
import { BeforeAfterInteractive } from "@/components/public/BeforeAfterInteractive";
import { VideoReviewsSection } from "@/components/public/VideoReviewsSection";
import { initials } from "@/lib/format";
import { getReviews, getSettings } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Отзывы о стоматологии «Один к Одному» — Рейтинг 4.9 на Яндексе",
  description:
    "Реальные отзывы пациентов о врачах клиники «Один к Одному». Видеоистории, клинические случаи до и после и виджет Яндекс Карт.",
};

export default async function ReviewsPage() {
  const [reviews, settings] = await Promise.all([getReviews(), getSettings()]);

  return (
    <div className="mx-auto max-w-[1300px] px-4 py-12 md:px-8">
      {/* Header */}
      <div className="max-w-2xl">
        <span className="text-[11px] font-extrabold uppercase tracking-[0.24em] text-accent">
          Репутация и опыт
        </span>
        <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-navy md:text-6xl">
          Что говорят пациенты
        </h1>
        <p className="mt-4 text-base text-muted md:text-lg">
          Честные оценки на Яндекс Картах ({settings.rating} из 5 на основе {settings.ratingsCount}{" "}
          оценок). Больше половины новых пациентов приходят к нам по рекомендациям близких.
        </p>
      </div>

      {/* Video section */}
      <div className="mt-12">
        <VideoReviewsSection />
      </div>

      {/* Clinical cases before / after */}
      <div className="mt-16">
        <BeforeAfterInteractive />
      </div>

      {/* Official Yandex Widget */}
      <div className="mt-16 rounded-[36px] border border-white/80 bg-white p-6 shadow-sm md:p-10">
        <div className="flex items-center justify-between border-b border-[var(--line)] pb-4">
          <div>
            <h2 className="text-xl font-bold text-navy">Официальный виджет Яндекс Карт</h2>
            <p className="text-xs text-muted">Клиника «Один к Одному» (ID: {settings.yandexOrgId})</p>
          </div>
          <span className="rounded-full bg-amber-400/20 px-3 py-1 text-xs font-bold text-amber-800">
            ★ {settings.rating}
          </span>
        </div>
        <div className="mt-6 overflow-hidden rounded-[24px]">
          <iframe
            title="Виджет отзывов Яндекс Карт"
            src={`https://yandex.ru/maps-reviews-widget/${settings.yandexOrgId}?comments`}
            className="h-[460px] w-full border-0"
          />
        </div>
      </div>

      {/* Detailed text reviews grid */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-navy">Текстовые отзывы с подтверждённым посещением</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <article
              key={review.id}
              className="group min-h-[270px] rounded-[28px] border border-white/80 bg-white p-6 shadow-sm"
            >
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
              <p className="mt-4 line-clamp-5 text-xs leading-relaxed text-muted">{review.text}</p>
              <details className="mt-3">
                <summary className="flex cursor-pointer list-none items-center justify-between text-xs font-bold text-accent [&::-webkit-details-marker]:hidden">
                  <span>Читать отзыв</span>
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-[#edf5ff] text-sm transition-transform group-open:rotate-180">
                    ↓
                  </span>
                </summary>
                <p className="mt-3 text-xs leading-relaxed text-muted">{review.text}</p>
              </details>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
