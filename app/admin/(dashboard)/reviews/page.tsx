import { prisma } from "@/lib/prisma";
import { deleteReview, saveReview } from "../actions";

export default async function AdminReviewsPage() {
  const reviews = await prisma.review.findMany({ orderBy: { sortOrder: "asc" } });

  return (
    <div>
      <h1 className="text-3xl font-semibold text-navy">Отзывы</h1>
      <form action={saveReview} className="mt-6 grid gap-3 rounded-[24px] bg-white p-5">
        <input name="author" placeholder="Автор" className="rounded-2xl border px-4 py-3" required />
        <input name="dateLabel" placeholder="Дата" className="rounded-2xl border px-4 py-3" />
        <input name="rating" type="number" min={1} max={5} defaultValue={5} className="rounded-2xl border px-4 py-3" />
        <textarea name="text" placeholder="Текст" rows={4} className="rounded-2xl border px-4 py-3" required />
        <label className="text-sm">
          <input name="published" type="checkbox" defaultChecked /> опубликовано
        </label>
        <button className="rounded-full bg-navy px-5 py-3 text-sm font-bold text-white">Добавить отзыв</button>
      </form>
      <div className="mt-6 grid gap-4">
        {reviews.map((review) => (
          <article key={review.id} className="rounded-[24px] bg-white p-5">
            <form action={saveReview} className="grid gap-2">
              <input type="hidden" name="id" value={review.id} />
              <input name="author" defaultValue={review.author} className="rounded-xl border px-3 py-2" />
              <input name="dateLabel" defaultValue={review.dateLabel} className="rounded-xl border px-3 py-2" />
              <input name="rating" defaultValue={review.rating} className="rounded-xl border px-3 py-2" />
              <textarea name="text" defaultValue={review.text} rows={4} className="rounded-xl border px-3 py-2" />
              <label className="text-sm">
                <input name="published" type="checkbox" defaultChecked={review.published} /> опубликовано
              </label>
              <button className="text-left font-semibold text-accent">Сохранить</button>
            </form>
            <form action={deleteReview} className="mt-2">
              <input type="hidden" name="id" value={review.id} />
              <button className="text-red-600">Удалить</button>
            </form>
          </article>
        ))}
      </div>
    </div>
  );
}
