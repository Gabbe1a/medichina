import { prisma } from "@/lib/prisma";
import { deletePrice, savePrice } from "../actions";

export default async function AdminPricesPage() {
  const prices = await prisma.priceItem.findMany({ orderBy: { sortOrder: "asc" } });

  return (
    <div>
      <h1 className="text-3xl font-semibold text-navy">Цены</h1>
      <form action={savePrice} className="mt-6 grid gap-3 rounded-[24px] bg-white p-5 md:grid-cols-2">
        <input name="title" placeholder="Название позиции" className="rounded-2xl border px-4 py-3" required />
        <input name="price" placeholder="Цена" className="rounded-2xl border px-4 py-3" required />
        <input name="categoryName" placeholder="Категория" className="rounded-2xl border px-4 py-3" required />
        <input name="code" placeholder="Код" className="rounded-2xl border px-4 py-3" />
        <label className="text-sm">
          <input name="active" type="checkbox" defaultChecked /> активно
        </label>
        <button className="rounded-full bg-navy px-5 py-3 text-sm font-bold text-white">Добавить</button>
      </form>
      <div className="mt-6 overflow-auto rounded-[24px] bg-white">
        <table className="w-full text-sm">
          <tbody>
            {prices.map((item) => (
              <tr key={item.id} className="border-t border-[var(--line)]">
                <td className="px-4 py-3">
                  <form action={savePrice} className="grid gap-2 md:grid-cols-[1fr_120px_180px_auto] md:items-center">
                    <input type="hidden" name="id" value={item.id} />
                    <input name="title" defaultValue={item.title} className="rounded-xl border px-3 py-2" />
                    <input name="price" defaultValue={item.price} className="rounded-xl border px-3 py-2" />
                    <input name="categoryName" defaultValue={item.categoryName} className="rounded-xl border px-3 py-2" />
                    <input type="hidden" name="code" value={item.code} />
                    <input type="hidden" name="sortOrder" value={item.sortOrder} />
                    <label className="text-xs">
                      <input name="active" type="checkbox" defaultChecked={item.active} /> акт.
                    </label>
                    <button className="text-accent">Сохранить</button>
                  </form>
                </td>
                <td className="px-4 py-3">
                  <form action={deletePrice}>
                    <input type="hidden" name="id" value={item.id} />
                    <button className="text-red-600">Удалить</button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
