"use client";

import { useMemo, useState } from "react";
import { formatPrice } from "@/lib/format";

type PriceGroup = {
  categoryName: string;
  prices: { id: string; title: string; price: number }[];
};

export function PriceDirectory({ groups }: { groups: PriceGroup[] }) {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return groups;
    return groups
      .map((group) => ({
        ...group,
        prices: group.prices.filter((item) => item.title.toLowerCase().includes(normalized)),
      }))
      .filter((group) => group.prices.length > 0 || group.categoryName.toLowerCase().includes(normalized));
  }, [groups, query]);

  return (
    <div className="mt-10 grid gap-8 lg:grid-cols-[230px_1fr]">
      <aside className="h-fit rounded-2xl border border-[#eae3d9] bg-white p-4 shadow-2xs lg:sticky lg:top-24">
        <p className="px-3 pb-2 text-[10px] font-extrabold uppercase tracking-[0.18em] text-accent">
          Разделы прайса
        </p>
        <nav className="grid gap-1">
          {groups.map((group, index) => (
            <a
              key={group.categoryName}
              href={`#price-${index}`}
              className="rounded-lg px-3 py-2 text-sm font-semibold text-navy transition hover:bg-[#fbf9f6] hover:text-accent"
            >
              {group.categoryName}
            </a>
          ))}
        </nav>
      </aside>

      <div>
        <label className="relative block">
          <span className="sr-only">Поиск по названию услуги</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Найти услугу по названию…"
            className="w-full rounded-xl border border-[#eae3d9] bg-white px-5 py-3 text-sm text-navy outline-none placeholder:text-muted/60 focus:border-chocolate focus:ring-1 focus:ring-chocolate/20 shadow-2xs"
          />
        </label>
        <div className="mt-6 grid gap-6">
          {filtered.map((group) => (
            <section
              id={`price-${groups.findIndex((source) => source.categoryName === group.categoryName)}`}
              key={group.categoryName}
              className="scroll-mt-28 overflow-hidden rounded-2xl border border-[#eae3d9] bg-white shadow-2xs"
            >
              <h2 className="border-b border-[#eae3d9] bg-[#fbf9f6] px-5 py-4 text-lg font-bold text-navy">{group.categoryName}</h2>
              <table className="w-full text-sm">
                <tbody>
                  {group.prices.map((item) => (
                    <tr key={item.id} className="border-t border-[#eae3d9]">
                      <td className="px-5 py-3.5 text-ink">{item.title}</td>
                      <td className="whitespace-nowrap px-5 py-3.5 text-right font-extrabold text-chocolate">
                        {formatPrice(item.price)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          ))}
          {!filtered.length && <p className="rounded-xl border border-[#eae3d9] bg-white p-6 text-sm text-muted">Ничего не найдено.</p>}
        </div>
      </div>
    </div>
  );
}
