import type { Metadata } from "next";
import { initials } from "@/lib/format";
import { getReviews, getSettings } from "@/lib/queries";

export const metadata: Metadata = { title: "Отзывы" };

export default async function ReviewsPage() {
  const [reviews, settings] = await Promise.all([getReviews(), getSettings()]);

  return (
    <div className="mx-auto max-w-[1100px] px-4 py-12 md:px-8">
      <p className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-accent">Отзывы</p>
      <h1 className="mt-3 text-5xl font-semibold tracking-tight text-navy">Что говорят пациенты</h1>
      <p className="mt-4 text-muted">
        {settings.rating} на Яндекс Картах · {settings.reviewsCount} отзывов · {settings.ratingsCount} оценок
      </p>
      <div className="mt-8 overflow-hidden rounded-[28px] bg-white">
        <iframe
          title="Виджет отзывов Яндекс Карт"
          src={`https://yandex.ru/maps-reviews-widget/${settings.yandexOrgId}?comments`}
          className="h-[420px] w-full border-0"
        />
      </div>
      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {reviews.map((review) => (
          <article key={review.id} className="rounded-[28px] bg-white p-6">
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
            <p className="mt-4 text-sm leading-6 text-muted">{review.text}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
