"use client";

import { useEffect, useRef, useState } from "react";

export function LazyIframe({
  src,
  title,
  className,
}: {
  src: string;
  title: string;
  className: string;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" },
    );
    observer.observe(wrapper);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={wrapperRef} className={`${className} overflow-hidden bg-[#eaf3ff]`}>
      {visible ? (
        <iframe title={title} src={src} className="h-full w-full border-0" loading="lazy" />
      ) : (
        <div className="grid h-full w-full place-items-center text-sm font-semibold text-muted">Карта загружается…</div>
      )}
    </div>
  );
}
