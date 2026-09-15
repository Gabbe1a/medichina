# Стоматология «Один к Одному»

Публичный сайт и отдельная CMS для клиники SuperDentos (`superdentos.ru`). Стек: **Next.js 15 (App Router) + TypeScript + Prisma/SQLite**.

Дизайн — гибрид: карточка-hero и лаймовый круговой CTA в духе SmileLab, структура секций и медицинская синяя система в духе Celestia. Копирайт на русском, без Lenis / smooth scroll, без копирования чужих ассетов.

## Локальный запуск

```bash
cp .env.example .env
# задайте SESSION_SECRET (≥32 символов) и ADMIN_PASSWORD
npm install
npx prisma generate
npx prisma db push
npm run db:seed
npm run dev
```

- Сайт: http://localhost:3000
- Админка: http://localhost:3000/admin

Админ-сессия — httpOnly cookie (`iron-session`), пароль хранится как bcrypt-хеш. Не используйте plaintext / localStorage.

## Что внутри

| Раздел | Маршрут |
|--------|---------|
| Главная | `/` |
| Услуги (дерево) | `/services`, `/services/[category]`, `/services/[category]/[slug]` |
| Прейскурант | `/prices` |
| Врачи | `/doctors`, `/doctors/[slug]` |
| Отзывы + виджет Яндекса | `/reviews` |
| О клинике / галерея | `/about` |
| FAQ | `/patients/faq` |
| Контакты и карта | `/contacts` |
| Legal / ПДн | `/legal`, `/privacy` |
| CMS | `/admin` |

Данные сидируются из `content/intake/` (услуги, 93 цены, 10 врачей, отзывы Яндекса, контакты). Фото врачей и галерея — в `public/media/`. Hero — оригинальная AI-иллюстрация `public/images/hero-tooth.png`.

## Сборка

```bash
npm run build
npm start
```

## Docker / VPS

См. [DEPLOY.md](./DEPLOY.md). Compose поднимает приложение и nginx на порту **8088**, чтобы не занимать чужие проекты на сервере.

## Юрлицо и контакты

ООО «Ноли Ноцэрэ+» · лицензия Л041-01137-77/03335406 · Москва, 1-й Новоподмосковный пер., 2/1 · метро Войковская · +7 (495) 988-35-35.
