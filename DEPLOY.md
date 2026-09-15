# Деплой «Один к Одному» на VPS

Целевой хост задаётся в локальном файле секретов (не коммитить): `VPS_HOST`, `VPS_USER`, `VPS_PASSWORD`.

## Политика диска

- При нехватке места: только `docker builder prune` / `docker system prune` **без** удаления каталогов других сайтов.
- Существующие проекты на сервере не трогать.

## Каталог на сервере

Приложение живёт отдельно: `/opt/odin-k-odnomu`.

Публичный HTTP: `http://<VPS>:8091` (nginx → Next.js). Порт 8088 на этом VPS уже занят другим проектом, 80/443 — тоже. HTTPS/домен — когда DNS `superdentos.ru` укажет на этот VPS (Let's Encrypt отдельно).

## Переменные окружения на сервере

Файл `/opt/odin-k-odnomu/.env` (не в git):

```
DATABASE_URL=file:/app/data/prod.db
SESSION_SECRET=<минимум 32 случайных символа>
ADMIN_EMAIL=<рабочий email администратора>
ADMIN_PASSWORD=<длинный пароль>
ADMIN_NAME=Администратор
NEXT_PUBLIC_SITE_URL=http://<VPS>:8091
SESSION_SECURE=false
```

## Фактический способ на этом VPS (мало места)

Полный `docker compose build` на сервере тяжёлый (14 ГБ диск, уже заняты kofe / maskkostum / backend). Поэтому:

1. Собрать `next build` локально (`output: "standalone"`).
2. Залить в `/opt/odin-k-odnomu` содержимое `.next/standalone` + `.next/static` + `public` + SQLite `data/prod.db`.
3. Записать `.env` **без кавычек**, `DATABASE_URL=file:/app/data/prod.db`.
4. Не класть локальный `.env` в архив: Next standalone копирует его сам.
5. Запустить отдельный контейнер `odin-k-odnomu` на порту **8091**:

```bash
cd /opt/odin-k-odnomu
docker compose -f deploy/vps-compose.yml up -d
curl -sS http://127.0.0.1:8091/api/health
```

Живой URL сейчас: `http://94.249.239.210:8091`

Prisma-движки: в `schema.prisma` заданы `debian-openssl-3.0.x` и `debian-openssl-1.1.x`.

## Команды (полный Docker-билд, если места достаточно)

```bash
cd /opt/odin-k-odnomu
docker compose build
docker compose up -d
curl -I http://127.0.0.1:8091/api/health
```

Первый старт создаёт SQLite в volume `oko_data` и прогоняет seed (врачи, прайс, отзывы, страницы).

## Обновление

Залить новый standalone-бандл в `/opt/odin-k-odnomu` (не затирая серверный `.env` и `data/prod.db`), затем:

```bash
docker restart odin-k-odnomu
```

## Healthcheck

`GET /api/health` → `{ "ok": true, "service": "odin-k-odnomu" }`
