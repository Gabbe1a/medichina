import type { Metadata } from "next";
import { formatPrice } from "@/lib/format";
import { getPriceGroups } from "@/lib/queries";

export const metadata: Metadata = { title: "Прейскурант" };

export default async function PricesPage() {
  const groups = await getPriceGroups();

  return (
    <div className="mx-auto max-w-[1100px] px-4 py-12 md:px-8">
      <p className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-accent">Цены</p>
      <h1 className="mt-3 text-5xl font-semibold tracking-tight text-navy">Прейскурант</h1>
      <p className="mt-4 max-w-2xl text-muted">
        Актуальные позиции с официальной страницы прайса ООО «Ноли Ноцэрэ+». Точную смету врач назовёт после осмотра.
      </p>
      <div className="mt-10 grid gap-8">
        {groups.map((group) => (
          <section key={group.categoryName} className="overflow-hidden rounded-[28px] bg-white">
            <h2 className="bg-[#f3f8ff] px-5 py-4 text-xl font-bold text-navy">{group.categoryName}</h2>
            <table className="w-full text-sm">
              <tbody>
                {group.prices.map((item) => (
                  <tr key={item.id} className="border-t border-[var(--line)]">
                    <td className="px-5 py-3">{item.title}</td>
                    <td className="whitespace-nowrap px-5 py-3 text-right font-bold text-navy">
                      {formatPrice(item.price)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        ))}
      </div>
    </div>
  );
}
