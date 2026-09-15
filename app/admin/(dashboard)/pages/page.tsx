import { prisma } from "@/lib/prisma";
import { deletePage, saveFaq, savePage } from "../actions";

export default async function AdminPagesPage() {
  const [pages, faqs] = await Promise.all([
    prisma.page.findMany({ orderBy: { slug: "asc" } }),
    prisma.faq.findMany({ orderBy: { sortOrder: "asc" } }),
  ]);

  return (
    <div>
      <h1 className="text-3xl font-semibold text-navy">Страницы и FAQ</h1>
      <div className="mt-6 grid gap-6">
        {pages.map((page) => (
          <form key={page.id} action={savePage} className="rounded-[24px] bg-white p-5">
            <input type="hidden" name="id" value={page.id} />
            <input name="slug" defaultValue={page.slug} className="rounded-xl border px-3 py-2" />
            <input name="title" defaultValue={page.title} className="mt-2 w-full rounded-xl border px-3 py-2" />
            <input name="excerpt" defaultValue={page.excerpt} className="mt-2 w-full rounded-xl border px-3 py-2" />
            <textarea name="body" defaultValue={page.body} rows={8} className="mt-2 w-full rounded-xl border px-3 py-2" />
            <label className="mt-2 block text-sm">
              <input name="published" type="checkbox" defaultChecked={page.published} /> опубликовано
            </label>
            <div className="mt-3 flex gap-4">
              <button className="font-semibold text-accent">Сохранить</button>
            </div>
          </form>
        ))}
        <form action={savePage} className="rounded-[24px] bg-white p-5">
          <h2 className="font-bold text-navy">Новая страница</h2>
          <input name="slug" placeholder="slug" className="mt-3 w-full rounded-xl border px-3 py-2" required />
          <input name="title" placeholder="Заголовок" className="mt-2 w-full rounded-xl border px-3 py-2" required />
          <input name="excerpt" placeholder="Коротко" className="mt-2 w-full rounded-xl border px-3 py-2" />
          <textarea name="body" placeholder="Текст" rows={6} className="mt-2 w-full rounded-xl border px-3 py-2" />
          <label className="mt-2 block text-sm">
            <input name="published" type="checkbox" defaultChecked /> опубликовано
          </label>
          <button className="mt-3 rounded-full bg-navy px-4 py-2 text-sm font-bold text-white">Создать</button>
        </form>
        {pages.length ? (
          <form action={deletePage}>
            <input type="hidden" name="id" value={pages[pages.length - 1].id} />
          </form>
        ) : null}
      </div>

      <h2 className="mt-10 text-2xl font-semibold text-navy">FAQ</h2>
      <form action={saveFaq} className="mt-4 grid gap-3 rounded-[24px] bg-white p-5">
        <input name="question" placeholder="Вопрос" className="rounded-xl border px-3 py-2" required />
        <textarea name="answer" placeholder="Ответ" rows={3} className="rounded-xl border px-3 py-2" required />
        <label className="text-sm">
          <input name="published" type="checkbox" defaultChecked /> опубликовано
        </label>
        <button className="rounded-full bg-navy px-4 py-2 text-sm font-bold text-white">Добавить вопрос</button>
      </form>
      <div className="mt-4 grid gap-3">
        {faqs.map((faq) => (
          <form key={faq.id} action={saveFaq} className="rounded-[24px] bg-white p-5">
            <input type="hidden" name="id" value={faq.id} />
            <input name="question" defaultValue={faq.question} className="w-full rounded-xl border px-3 py-2" />
            <textarea name="answer" defaultValue={faq.answer} rows={3} className="mt-2 w-full rounded-xl border px-3 py-2" />
            <label className="mt-2 block text-sm">
              <input name="published" type="checkbox" defaultChecked={faq.published} /> опубликовано
            </label>
            <button className="mt-2 font-semibold text-accent">Сохранить</button>
          </form>
        ))}
      </div>
    </div>
  );
}
