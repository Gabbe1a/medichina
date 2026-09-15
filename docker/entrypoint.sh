#!/bin/sh
set -eu
mkdir -p /data /app/public/uploads
export DATABASE_URL="${DATABASE_URL:-file:/data/prod.db}"
if [ ! -f /data/prod.db ]; then
  echo "Initializing SQLite database..."
  npx prisma db push --schema=/app/prisma/schema.prisma
  npx tsx /app/prisma/seed.ts
else
  npx prisma db push --schema=/app/prisma/schema.prisma
fi
exec node /app/server.js
