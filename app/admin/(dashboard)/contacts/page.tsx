import { prisma } from "@/lib/prisma";
import { saveSettings } from "../actions";

export default async function AdminContactsPage() {
  const settings = await prisma.setting.findUniqueOrThrow({ where: { id: "site" } });

  return (
    <form action={saveSettings} className="max-w-3xl rounded-[24px] bg-white p-6">
      <h1 className="text-3xl font-semibold text-navy">Контакты и настройки</h1>
      <div className="mt-5 grid gap-3">
        {([
          ["brand", "Бренд", settings.brand],
          ["legalEntity", "Юрлицо", settings.legalEntity],
          ["address", "Адрес", settings.address],
          ["metro", "Метро", settings.metro],
          ["phone1", "Телефон 1", settings.phone1],
          ["phone2", "Телефон 2", settings.phone2],
          ["email", "Email", settings.email],
          ["hours", "Часы", settings.hours],
          ["whatsapp", "WhatsApp", settings.whatsapp],
          ["yandexOrgId", "Яндекс org id", settings.yandexOrgId],
          ["lon", "Долгота", String(settings.lon)],
          ["lat", "Широта", String(settings.lat)],
          ["rating", "Рейтинг", String(settings.rating)],
          ["reviewsCount", "Отзывов", String(settings.reviewsCount)],
          ["ratingsCount", "Оценок", String(settings.ratingsCount)],
          ["license", "Лицензия", settings.license],
          ["ogrn", "ОГРН", settings.ogrn],
          ["metrika", "Метрика", settings.metrika],
        ] as const).map(([name, label, value]) => (
          <label key={name} className="grid gap-1 text-sm">
            {label}
            <input name={name} defaultValue={value} className="rounded-2xl border px-4 py-3" />
          </label>
        ))}
        <label className="grid gap-1 text-sm">
          Как добраться
          <textarea name="howToGet" defaultValue={settings.howToGet} rows={4} className="rounded-2xl border px-4 py-3" />
        </label>
        <label className="grid gap-1 text-sm">
          Приём главного врача
          <input name="receptionNote" defaultValue={settings.receptionNote} className="rounded-2xl border px-4 py-3" />
        </label>
        <button className="rounded-full bg-navy px-5 py-3 text-sm font-bold text-white">Сохранить настройки</button>
      </div>
    </form>
  );
}
