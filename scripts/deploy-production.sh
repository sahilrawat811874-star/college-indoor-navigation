#!/usr/bin/env bash
set -euo pipefail
if [ ! -f .env.production ]; then
  echo "Missing .env.production. Copy .env.production.example and fill secrets." >&2
  exit 1
fi
docker compose --env-file .env.production -f docker-compose.prod.yml build
docker compose --env-file .env.production -f docker-compose.prod.yml up -d
