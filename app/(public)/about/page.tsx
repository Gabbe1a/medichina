import type { Metadata } from "next";
import { getGallery, getPage, getSettings } from "@/lib/queries";

export const metadata: Metadata = { title: "О клинике" };

export default async function AboutPage() {
  const [page, gallery, settings] = await Promise.all([
    getPage("about"),
    getGallery(),
    getSettings(),
  ]);

  return (
    <div className="mx-auto max-w-[1200px] px-4 py-12 md:px-8">
      <p className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-accent">О клинике</p>
      <h1 className="mt-3 text-5xl font-semibold tracking-tight text-navy">«Один к Одному»</h1>
      <div className="prose-clinic mt-8 max-w-3xl whitespace-pre-line text-lg">
        {page?.body}
      </div>
      <div className="mt-10 grid gap-4 md:grid-cols-3">
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
      <h2 className="mt-14 text-3xl font-semibold text-navy">Галерея клиники</h2>
      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {gallery.map((image) => (
          <img key={image.id} src={image.url} alt={image.alt} className="h-56 w-full rounded-[24px] object-cover" />
        ))}
      </div>
    </div>
  );
}
