"use client";

import Link from "next/link";
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
      className="relative min-h-[610px] overflow-hidden rounded-[30px] bg-[#081d3a] px-4 py-10 text-white md:min-h-[680px] md:px-8"
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
      <div className="absolute inset-0 pointer-events-none">
        <img
          src={items[currentIndex]?.img}
          alt=""
          loading="lazy"
          decoding="async"
          className="h-full w-full scale-110 object-cover opacity-25 blur-3xl transition-all duration-700"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(21,83,151,.2),rgba(4,18,39,.96)_75%)]" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center">
        <div className="mb-6 flex items-center gap-3 text-center">
          <span className="h-px w-9 bg-gradient-to-r from-transparent to-[#93c5fd]" />
          <h3 className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#93c5fd]">
            {sectionLabel}
          </h3>
          <span className="h-px w-9 bg-gradient-to-l from-transparent to-[#93c5fd]" />
        </div>

        <div className="relative flex h-[490px] w-full items-center justify-center [perspective:1400px] md:h-[540px]">
          {items.map((item, itemIndex) => {
            const offset = (itemIndex - currentIndex + total) % total;
            let transform = "translateX(0) scale(.45) rotateY(0deg)";
            let opacity = 0;
            let zIndex = 0;
            let filter = "brightness(.35) blur(2px)";
            const isCenter = offset === 0;

            if (offset === 0) {
              transform = "translateX(0) scale(1) rotateY(0deg)";
              opacity = 1;
              zIndex = 30;
              filter = "brightness(1)";
            } else if (offset === 1) {
              transform = "translateX(275px) scale(.82) rotateY(-24deg)";
              opacity = 0.65;
              zIndex = 20;
              filter = "brightness(.72)";
            } else if (offset === total - 1) {
              transform = "translateX(-275px) scale(.82) rotateY(24deg)";
              opacity = 0.65;
              zIndex = 20;
              filter = "brightness(.72)";
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
                className="absolute h-[430px] w-[280px] cursor-pointer overflow-hidden rounded-[24px] border border-white/15 bg-[#102f5d] shadow-2xl transition-all duration-700 ease-[cubic-bezier(.25,1,.5,1)] md:h-[500px] md:w-[330px]"
                style={{ transform, opacity, zIndex, filter }}
              >
                <img
                  src={item.img}
                  alt={item.titleLine1}
                  loading={isCenter ? "eager" : "lazy"}
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-[#04152f]" />
                <div
                  className={`relative z-10 flex h-full flex-col justify-between p-5 transition-opacity duration-500 ${
                    isCenter ? "opacity-100" : "pointer-events-none opacity-0"
                  }`}
                >
                  <span className="self-start rounded-full bg-white/90 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-navy">
                    {item.tag}
                  </span>
                  <div>
                    <h2 className="text-2xl font-black leading-tight md:text-[27px]">{item.titleLine1}</h2>
                    {item.titleLine2 && <p className="text-base font-bold text-white/90">{item.titleLine2}</p>}
                    <div className="my-3 h-0.5 w-9 bg-[#93c5fd]" />
                    {item.desc && <p className="line-clamp-3 text-xs leading-relaxed text-white/85">{item.desc}</p>}
                    {item.ctaUrl && (
                      <Link
                        href={item.ctaUrl}
                        className="mt-4 inline-flex rounded-full bg-white px-4 py-2 text-[11px] font-bold text-navy transition hover:bg-[#93c5fd]"
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
            className="absolute left-0 z-40 grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-black/30 text-white backdrop-blur-md transition hover:bg-white hover:text-navy md:left-4"
          >
            <Chevron direction="left" />
          </button>
          <button
            type="button"
            onClick={nextSlide}
            aria-label="Следующий врач"
            className="absolute right-0 z-40 grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-black/30 text-white backdrop-blur-md transition hover:bg-white hover:text-navy md:right-4"
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
              className={`h-2 rounded-full transition-all ${
                itemIndex === currentIndex ? "w-7 bg-[#93c5fd]" : "w-2 bg-white/25"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
