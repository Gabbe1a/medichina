"use client";

import Link from "next/link";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

export interface CarouselItem {
  tag?: string;
  titleLine1: string;
  titleLine2?: string;
  desc?: string;
  img: string;
  ctaText?: string;
  ctaUrl?: string;
}

type CoverFlowCarouselProps = {
  items: CarouselItem[];
  sectionLabel?: string;
  autoplay?: boolean;
  autoplayDelay?: number;
  initialIndex?: number;
};

const Chevron = ({ direction }: { direction: "left" | "right" }) => (
  <svg
    aria-hidden="true"
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2.5}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d={direction === "left" ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"}
    />
  </svg>
);

export function CoverFlowCarousel({
  items,
  sectionLabel = "Специалисты клиники",
  autoplay = false,
  autoplayDelay = 5000,
  initialIndex = 0,
}: CoverFlowCarouselProps) {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(() =>
    Math.min(Math.max(initialIndex, 0), Math.max(items.length - 1, 0)),
  );
  const [isHovered, setIsHovered] = useState(false);
  const touchStartX = useRef(0);
  const total = items.length;

  const nextSlide = useCallback(() => {
    setCurrentIndex((current) => (current + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((current) => (current - 1 + total) % total);
  }, [total]);

  useEffect(() => {
    if (!autoplay || isHovered || total <= 1) return;
    const interval = window.setInterval(nextSlide, autoplayDelay);
    return () => window.clearInterval(interval);
  }, [autoplay, autoplayDelay, isHovered, nextSlide, total]);

  if (total === 0) return null;

  return (
    <section
      className="relative min-h-[560px] overflow-hidden rounded-2xl px-2 py-4 text-navy md:min-h-[640px] md:px-4"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={(event) => {
        touchStartX.current = event.touches[0]?.clientX ?? 0;
      }}
      onTouchEnd={(event) => {
        const diff = (event.changedTouches[0]?.clientX ?? 0) - touchStartX.current;
        if (Math.abs(diff) > 45) (diff < 0 ? nextSlide : prevSlide)();
      }}
    >
      <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center">
        <p className="mb-6 text-[11px] font-extrabold uppercase tracking-[0.24em] text-accent">
          {sectionLabel}
        </p>

        <div className="relative flex h-[470px] w-full items-center justify-center md:h-[520px]">
          {items.map((item, itemIndex) => {
            const offset = (itemIndex - currentIndex + total) % total;
            let transform = "translateX(0) scale(.45)";
            let opacity = 0;
            let zIndex = 0;
            const isCenter = offset === 0;

            if (offset === 0) {
              transform = "translateX(0) scale(1)";
              opacity = 1;
              zIndex = 30;
            } else if (offset === 1) {
              transform = "translateX(275px) scale(.82)";
              opacity = 0.58;
              zIndex = 20;
            } else if (offset === total - 1) {
              transform = "translateX(-275px) scale(.82)";
              opacity = 0.58;
              zIndex = 20;
            }

            return (
              <article
                key={item.titleLine1}
                onClick={() => {
                  if (!isCenter) {
                    setCurrentIndex(itemIndex);
                  } else if (item.ctaUrl) {
                    router.push(item.ctaUrl);
                  }
                }}
                onKeyDown={(event) => {
                  if ((event.key === "Enter" || event.key === " ") && isCenter && item.ctaUrl) {
                    event.preventDefault();
                    router.push(item.ctaUrl);
                  }
                }}
                role="link"
                tabIndex={0}
                className="absolute h-[420px] w-[270px] cursor-pointer overflow-hidden rounded-[28px] border border-accent/25 bg-[#eef4fc] shadow-[0_12px_32px_rgba(124,167,235,0.12)] transition-[transform,opacity] duration-500 ease-[cubic-bezier(.25,1,.5,1)] md:h-[480px] md:w-[320px]"
                style={{ transform, opacity, zIndex }}
              >
                <Image
                  src={item.img}
                  alt={item.titleLine1}
                  fill
                  sizes="(max-width: 768px) 280px, 330px"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#eef4fc] via-[#eef4fc]/10 to-transparent" />
                <div
                  className={`relative z-10 flex h-full flex-col justify-between p-5 transition-opacity duration-500 ${
                    isCenter ? "opacity-100" : "pointer-events-none opacity-0"
                  }`}
                >
                  <span className="self-start rounded-full border border-accent/35 bg-white/95 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-accent">
                    {item.tag}
                  </span>
                  <div className="rounded-2xl border border-white/80 bg-white/92 p-4 shadow-[0_8px_24px_rgba(67,40,20,0.08)] backdrop-blur-md">
                    <h2 className="text-xl font-extrabold leading-tight text-navy md:text-[22px]">{item.titleLine1}</h2>
                    {item.titleLine2 && <p className="text-sm font-bold text-muted">{item.titleLine2}</p>}
                    {item.desc && <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-muted">{item.desc}</p>}
                    {item.ctaUrl && (
                      <Link
                        href={item.ctaUrl}
                        className="mt-3 inline-flex rounded-full bg-chocolate px-4 py-2 text-[11px] font-bold uppercase tracking-wider text-white transition hover:bg-chocolate-light"
                        onClick={(event) => event.stopPropagation()}
                      >
                        {item.ctaText ?? "Открыть профиль"} →
                      </Link>
                    )}
                  </div>
                </div>
              </article>
            );
          })}

          <button
            type="button"
            onClick={prevSlide}
            aria-label="Предыдущий врач"
            className="absolute left-0 z-40 grid h-11 w-11 place-items-center rounded-full border border-[#eadfd0] bg-white text-chocolate shadow-xs transition-colors hover:border-chocolate md:left-4 cursor-pointer"
          >
            <Chevron direction="left" />
          </button>
          <button
            type="button"
            onClick={nextSlide}
            aria-label="Следующий врач"
            className="absolute right-0 z-40 grid h-11 w-11 place-items-center rounded-full border border-[#eadfd0] bg-white text-chocolate shadow-xs transition-colors hover:border-chocolate md:right-4 cursor-pointer"
          >
            <Chevron direction="right" />
          </button>
        </div>

        <div className="flex items-center gap-2">
          {items.map((item, itemIndex) => (
            <button
              key={item.titleLine1}
              type="button"
              onClick={() => setCurrentIndex(itemIndex)}
              aria-label={`Врач ${itemIndex + 1}`}
              className={`h-2 rounded-full transition-[width,background-color] ${
                itemIndex === currentIndex ? "w-7 bg-accent" : "w-2 bg-accent/30"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
