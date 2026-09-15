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
      <aside className="h-fit rounded-[24px] bg-white p-4 shadow-sm lg:sticky lg:top-24">
        <p className="px-3 pb-2 text-[10px] font-extrabold uppercase tracking-[0.18em] text-muted">
          Разделы прайса
        </p>
        <nav className="grid gap-1">
          {groups.map((group, index) => (
            <a
              key={group.categoryName}
              href={`#price-${index}`}
              className="rounded-xl px-3 py-2 text-sm font-semibold text-navy transition hover:bg-[#edf5ff] hover:text-accent"
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
            className="w-full rounded-2xl border border-white bg-white px-5 py-3 text-sm text-navy outline-none placeholder:text-muted/70 focus:border-accent focus:ring-2 focus:ring-accent/20"
          />
        </label>
        <div className="mt-6 grid gap-6">
          {filtered.map((group) => (
            <section
              id={`price-${groups.findIndex((source) => source.categoryName === group.categoryName)}`}
              key={group.categoryName}
              className="scroll-mt-28 overflow-hidden rounded-[28px] bg-white shadow-sm"
            >
              <h2 className="bg-[#f3f8ff] px-5 py-4 text-xl font-bold text-navy">{group.categoryName}</h2>
              <table className="w-full text-sm">
                <tbody>
                  {group.prices.map((item) => (
                    <tr key={item.id} className="border-t border-[var(--line)]">
                      <td className="px-5 py-3 text-ink">{item.title}</td>
                      <td className="whitespace-nowrap px-5 py-3 text-right font-bold text-navy">
                        {formatPrice(item.price)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          ))}
          {!filtered.length && <p className="rounded-2xl bg-white p-6 text-sm text-muted">Ничего не найдено.</p>}
        </div>
      </div>
    </div>
  );
}
