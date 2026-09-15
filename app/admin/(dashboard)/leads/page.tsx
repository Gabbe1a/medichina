import { prisma } from "@/lib/prisma";

export default async function AdminLeadsPage() {
  const leads = await prisma.lead.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <h1 className="text-3xl font-semibold text-navy">Заявки</h1>
      <div className="mt-6 overflow-auto rounded-[24px] bg-white">
        <table className="w-full text-sm">
          <thead className="bg-[#f3f8ff] text-left">
            <tr>
              <th className="px-4 py-3">Дата</th>
              <th className="px-4 py-3">Имя</th>
              <th className="px-4 py-3">Телефон</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Сообщение</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr key={lead.id} className="border-t border-[var(--line)]">
                <td className="px-4 py-3">{lead.createdAt.toLocaleString("ru-RU")}</td>
                <td className="px-4 py-3">{lead.name}</td>
                <td className="px-4 py-3">{lead.phone}</td>
                <td className="px-4 py-3">{lead.email}</td>
                <td className="px-4 py-3">{lead.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
