import type { Metadata } from "next";
import Image from "next/image";
import { getGallery, getPage, getSettings } from "@/lib/queries";

export const metadata: Metadata = { title: "О клинике" };

export default async function AboutPage() {
  const [page, gallery, settings] = await Promise.all([
    getPage("about"),
    getGallery(),
    getSettings(),
  ]);

  return (
    <div className="mx-auto max-w-[1200px] px-4 py-8 md:px-8 md:py-12">
      <div className="rounded-[36px] bg-white p-6 shadow-[0_20px_60px_rgba(0,47,108,0.1)] md:p-10">
        <p className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-accent">О клинике</p>
        <h1 className="mt-3 text-5xl font-semibold tracking-tight text-navy">«Один к Одному»</h1>
        <div className="prose-clinic mt-8 max-w-3xl whitespace-pre-line text-lg">{page?.body}</div>
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <div className="rounded-[24px] bg-white p-5">
          <p className="font-bold text-navy">{settings.hours}</p>
          <p className="mt-2 text-sm text-muted">{settings.address}</p>
        </div>
        <div className="rounded-[24px] bg-white p-5">
          <p className="font-bold text-navy">Метро {settings.metro}</p>
          <p className="mt-2 text-sm text-muted">{settings.howToGet}</p>
        </div>
        <div className="rounded-[24px] bg-white p-5">
          <p className="font-bold text-navy">{settings.legalEntity}</p>
          <p className="mt-2 text-sm text-muted">Лицензия {settings.license}</p>
        </div>
      </div>
      <h2 className="mt-12 text-3xl font-semibold text-white">Галерея клиники</h2>
      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {gallery.map((image) => (
          <div key={image.id} className="relative h-56 overflow-hidden rounded-[24px]">
            <Image src={image.url} alt={image.alt} fill sizes="(max-width: 640px) 100vw, 33vw" className="object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
}
