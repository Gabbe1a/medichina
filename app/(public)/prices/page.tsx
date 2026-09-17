import type { Metadata } from "next";
import { PriceDirectory } from "@/components/public/PriceDirectory";
import { getPriceGroups } from "@/lib/queries";

export const metadata: Metadata = { title: "Прейскурант" };

export default async function PricesPage() {
  const groups = await getPriceGroups();

  return (
    <div className="mx-auto max-w-[1200px] px-4 py-8 md:px-8 md:py-12">
      <div className="rounded-2xl border border-[#eae3d9] bg-white p-6 shadow-xs md:p-10">
        <p className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-accent">Цены</p>
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-navy md:text-5xl">Прейскурант</h1>
        <p className="mt-4 max-w-2xl text-base text-muted md:text-[17px]">
          Актуальные позиции с официальной страницы прайса. Точную смету врач назовёт после осмотра.
        </p>
      </div>
      <PriceDirectory groups={groups} />
    </div>
  );
}
