#!/usr/bin/env bash
set -euo pipefail
cat <<'MSG'
Demo checklist:
1. docker compose up -d
2. cd apps/backend && pnpm prisma:generate && pnpm prisma:migrate --name init_postgis_schema && pnpm prisma:seed && pnpm start:dev
3. cd apps/frontend && pnpm dev
4. Open http://localhost:5173
5. Demo A-204 route, BCA Lab search, Smart Search, Admin page.
MSG
