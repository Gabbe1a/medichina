import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deleteService } from "../actions";

export default async function AdminServicesPage() {
  const services = await prisma.service.findMany({
    orderBy: { sortOrder: "asc" },
    include: { parent: true },
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold text-navy">Услуги</h1>
        <Link href="/admin/services/new" className="rounded-full bg-navy px-4 py-2 text-sm font-bold text-white">
          Добавить
        </Link>
      </div>
      <div className="mt-6 overflow-auto rounded-[24px] bg-white">
        <table className="w-full text-sm">
          <thead className="bg-[#f3f8ff] text-left">
            <tr>
              <th className="px-4 py-3">Название</th>
              <th className="px-4 py-3">Путь</th>
              <th className="px-4 py-3">Опубликовано</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {services.map((item) => (
              <tr key={item.id} className="border-t border-[var(--line)]">
                <td className="px-4 py-3">
                  {item.parent ? `${item.parent.title} / ` : ""}
                  {item.title}
                </td>
                <td className="px-4 py-3 text-muted">{item.path}</td>
                <td className="px-4 py-3">{item.published ? "да" : "нет"}</td>
                <td className="px-4 py-3 text-right">
                  <Link href={`/admin/services/${item.id}`} className="mr-3 font-semibold text-accent">
                    Изменить
                  </Link>
                  <form action={deleteService} className="inline">
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
