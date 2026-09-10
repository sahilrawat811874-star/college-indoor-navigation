#!/usr/bin/env bash
set -euo pipefail
if [ ! -f .env.production ]; then
  echo "Missing .env.production" >&2
  exit 1
fi
docker compose --env-file .env.production -f docker-compose.prod.yml exec backend npx prisma migrate deploy
