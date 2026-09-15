FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM node:22-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
ENV DATABASE_URL="file:./dev.db"
ENV SESSION_SECRET="build-time-session-secret-not-used-in-runtime-32"
ENV ADMIN_EMAIL="build@local"
ENV ADMIN_PASSWORD="BuildPassword_32chars_min"
RUN npx prisma generate && npx prisma db push && npx tsx prisma/seed.ts && npm run build

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
RUN apk add --no-cache libc6-compat
COPY --from=builder /app/public ./public
COPY --from=builder /app/content ./content
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY docker/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh && mkdir -p /data /app/public/uploads
EXPOSE 3000
ENTRYPOINT ["/entrypoint.sh"]
