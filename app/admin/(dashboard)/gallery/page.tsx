import { prisma } from "@/lib/prisma";
import { deleteGallery, saveGallery } from "../actions";

export default async function AdminGalleryPage() {
  const images = await prisma.galleryImage.findMany({ orderBy: { sortOrder: "asc" } });

  return (
    <div>
      <h1 className="text-3xl font-semibold text-navy">Галерея</h1>
      <form action={saveGallery} className="mt-6 grid gap-3 rounded-[24px] bg-white p-5">
        <input name="url" placeholder="/media/gallery/ или /uploads/" className="rounded-2xl border px-4 py-3" required />
        <input name="alt" placeholder="Подпись" className="rounded-2xl border px-4 py-3" />
        <label className="text-sm">
          <input name="published" type="checkbox" defaultChecked /> опубликовано
        </label>
        <button className="rounded-full bg-navy px-5 py-3 text-sm font-bold text-white">Добавить изображение</button>
      </form>
      <p className="mt-3 text-sm text-muted">
        Загрузка файла: отправьте multipart на <code>/api/admin/upload</code> и вставьте полученный URL.
      </p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((image) => (
          <div key={image.id} className="rounded-[24px] bg-white p-3">
            <img src={image.url} alt={image.alt} className="h-40 w-full rounded-2xl object-cover" />
            <form action={saveGallery} className="mt-3 grid gap-2">
              <input type="hidden" name="id" value={image.id} />
              <input name="url" defaultValue={image.url} className="rounded-xl border px-3 py-2 text-xs" />
              <input name="alt" defaultValue={image.alt} className="rounded-xl border px-3 py-2 text-xs" />
              <input name="sortOrder" defaultValue={image.sortOrder} className="rounded-xl border px-3 py-2 text-xs" />
              <label className="text-xs">
                <input name="published" type="checkbox" defaultChecked={image.published} /> опубликовано
              </label>
              <button className="text-left text-sm font-semibold text-accent">Сохранить</button>
            </form>
            <form action={deleteGallery}>
              <input type="hidden" name="id" value={image.id} />
              <button className="mt-2 text-sm text-red-600">Удалить</button>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
}
