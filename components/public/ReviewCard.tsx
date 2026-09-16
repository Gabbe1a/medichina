import type { Review } from "@prisma/client";
import { initials } from "@/lib/format";

function Stars({ value }: { value: number }) {
  return (
    <span className="text-[13px] tracking-tight text-[#f5b400]" aria-label={`${value} из 5`}>
      {"★".repeat(value)}
      <span className="text-[#d7e3f4]">{"★".repeat(Math.max(0, 5 - value))}</span>
    </span>
  );
}

export function ReviewCard({
  review,
  featured = false,
  sourceHref,
}: {
  review: Review;
  featured?: boolean;
  sourceHref?: string;
}) {
  return (
    <article
      className={`flex h-full flex-col rounded-[28px] bg-white p-5 shadow-[0_12px_32px_rgba(0,47,108,0.08)] md:p-6 ${
        featured ? "md:col-span-2 md:p-8" : ""
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#dbeaff] to-[#edf5ff] text-sm font-black text-navy">
            {initials(review.author)}
          </div>
          <div>
            <p className="font-extrabold text-navy">{review.author}</p>
            <p className="mt-0.5 text-xs text-muted">{review.dateLabel}</p>
          </div>
        </div>
        <Stars value={review.rating} />
      </div>
      <p
        className={`mt-4 leading-relaxed text-navy/80 ${
          featured ? "line-clamp-6 text-base md:text-[17px]" : "line-clamp-5 text-sm"
        }`}
      >
        {review.text}
      </p>
      <div className="mt-auto flex items-center justify-between gap-3 pt-4">
        {sourceHref ? (
          <a
            href={sourceHref}
            target="_blank"
            rel="noreferrer"
            className="text-[11px] font-bold uppercase tracking-wider text-accent hover:text-navy"
          >
            Яндекс Карты
          </a>
        ) : (
          <span className="text-[11px] font-bold uppercase tracking-wider text-accent">Яндекс Карты</span>
        )}
        <details className="group">
          <summary className="cursor-pointer list-none text-xs font-bold text-navy [&::-webkit-details-marker]:hidden">
            Читать полностью →
          </summary>
          <p className="mt-3 text-sm leading-relaxed text-muted">{review.text}</p>
        </details>
      </div>
    </article>
  );
}
