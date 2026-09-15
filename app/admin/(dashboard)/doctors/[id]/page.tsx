import { prisma } from "@/lib/prisma";
import { saveDoctor } from "../../actions";

export default async function EditDoctorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = id === "new" ? null : await prisma.doctor.findUnique({ where: { id } });

  return (
    <form action={saveDoctor} className="max-w-3xl rounded-[24px] bg-white p-6">
      <h1 className="text-2xl font-semibold text-navy">{item ? "Редактирование врача" : "Новый врач"}</h1>
      <input type="hidden" name="id" value={item?.id ?? ""} />
      <div className="mt-5 grid gap-3">
        <input name="name" defaultValue={item?.name} placeholder="ФИО" className="rounded-2xl border px-4 py-3" required />
        <input name="slug" defaultValue={item?.slug} placeholder="slug" className="rounded-2xl border px-4 py-3" required />
        <input name="role" defaultValue={item?.role} placeholder="Должность" className="rounded-2xl border px-4 py-3" required />
        <input name="photoUrl" defaultValue={item?.photoUrl} placeholder="/media/doctors/..." className="rounded-2xl border px-4 py-3" required />
        <textarea name="bio" defaultValue={item?.bio} rows={12} className="rounded-2xl border px-4 py-3" />
        <input name="sortOrder" type="number" defaultValue={item?.sortOrder ?? 0} className="rounded-2xl border px-4 py-3" />
        <label className="text-sm">
          <input name="published" type="checkbox" defaultChecked={item?.published ?? true} /> опубликовано
        </label>
        <button className="rounded-full bg-navy px-5 py-3 text-sm font-bold text-white">Сохранить</button>
      </div>
    </form>
  );
}
