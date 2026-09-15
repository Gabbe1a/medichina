# Деплой «Один к Одному» на VPS

Целевой хост задаётся в локальном файле секретов (не коммитить): `VPS_HOST`, `VPS_USER`, `VPS_PASSWORD`.

## Политика диска

- При нехватке места: только `docker builder prune` / `docker system prune` **без** удаления каталогов других сайтов.
- Существующие проекты на сервере не трогать.

## Каталог на сервере

Приложение живёт отдельно: `/opt/odin-k-odnomu`.

Публичный HTTP: `http://<VPS>:8088` (nginx → Next.js). HTTPS/домен — когда DNS `superdentos.ru` укажет на этот VPS (Let's Encrypt отдельно).

## Переменные окружения на сервере

Файл `/opt/odin-k-odnomu/.env` (не в git):

```
DATABASE_URL=file:/data/prod.db
SESSION_SECRET=<минимум 32 случайных символа>
ADMIN_EMAIL=<рабочий email администратора>
ADMIN_PASSWORD=<длинный пароль>
ADMIN_NAME=Администратор
NEXT_PUBLIC_SITE_URL=http://<VPS>:8088
```

## Команды

```bash
cd /opt/odin-k-odnomu
docker compose build
docker compose up -d
curl -I http://127.0.0.1:8088/api/health
```

Первый старт создаёт SQLite в volume `oko_data` и прогоняет seed (врачи, прайс, отзывы, страницы).

## Обновление

Залить новый код в `/opt/odin-k-odnomu`, затем:

```bash
docker compose build app
docker compose up -d
```

Volume с базой и загрузками сохраняется.

## Healthcheck

`GET /api/health` → `{ "ok": true, "service": "odin-k-odnomu" }`
