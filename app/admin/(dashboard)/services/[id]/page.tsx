import { prisma } from "@/lib/prisma";
import { saveService } from "../../actions";

export default async function EditServicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const isNew = id === "new";
  const item = isNew
    ? null
    : await prisma.service.findUnique({ where: { id } });

  return (
    <form action={saveService} className="max-w-3xl rounded-[24px] bg-white p-6">
      <h1 className="text-2xl font-semibold text-navy">{isNew ? "Новая услуга" : "Редактирование услуги"}</h1>
      <input type="hidden" name="id" value={item?.id ?? ""} />
      <div className="mt-5 grid gap-3">
        <input name="title" defaultValue={item?.title} placeholder="Название" className="rounded-2xl border px-4 py-3" required />
        <input name="slug" defaultValue={item?.slug} placeholder="slug" className="rounded-2xl border px-4 py-3" required />
        <input name="path" defaultValue={item?.path} placeholder="path" className="rounded-2xl border px-4 py-3" required />
        <input name="topSlug" defaultValue={item?.topSlug} placeholder="top slug" className="rounded-2xl border px-4 py-3" required />
        <input name="seoTitle" defaultValue={item?.seoTitle} placeholder="SEO title" className="rounded-2xl border px-4 py-3" />
        <input name="seoDescription" defaultValue={item?.seoDescription} placeholder="SEO description" className="rounded-2xl border px-4 py-3" />
        <textarea name="description" defaultValue={item?.description} rows={10} className="rounded-2xl border px-4 py-3" />
        <input name="sortOrder" type="number" defaultValue={item?.sortOrder ?? 0} className="rounded-2xl border px-4 py-3" />
        <label className="text-sm">
          <input name="published" type="checkbox" defaultChecked={item?.published ?? true} /> опубликовано
        </label>
        <button className="rounded-full bg-navy px-5 py-3 text-sm font-bold text-white">Сохранить</button>
      </div>
    </form>
  );
}
