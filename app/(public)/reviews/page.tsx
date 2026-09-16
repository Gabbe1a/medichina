import type { Metadata } from "next";
import { BeforeAfterInteractive } from "@/components/public/BeforeAfterInteractive";
import { VideoReviewsSection } from "@/components/public/VideoReviewsSection";
import { LazyIframe } from "@/components/public/LazyIframe";
import { ReviewCard } from "@/components/public/ReviewCard";
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
      <div className="max-w-2xl rounded-[32px] bg-white p-6 shadow-[0_20px_60px_rgba(0,47,108,0.1)] md:p-8">
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
        <LazyIframe
          title="Виджет отзывов Яндекс Карт"
          src={`https://yandex.ru/maps-reviews-widget/${settings.yandexOrgId}?comments`}
          className="mt-6 h-[460px] rounded-[24px]"
        />
      </div>

      {/* Detailed text reviews grid */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-navy">Текстовые отзывы с подтверждённым посещением</h2>
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
      </div>
    </div>
  );
}
