# Operations Runbook

## Deploy
```bash
./scripts/deploy-production.sh
./scripts/migrate-production.sh
```

## Check containers
```bash
docker compose --env-file .env.production -f docker-compose.prod.yml ps
```

## Logs
```bash
docker compose --env-file .env.production -f docker-compose.prod.yml logs -f backend
```

## Backup database
Use managed provider backups in production. For Docker-only deployments:
```bash
docker compose --env-file .env.production -f docker-compose.prod.yml exec postgres pg_dump -U postgres college_navigation > backup.sql
```

## Rollback
1. Re-deploy previous image/tag.
2. Restore database backup if migration is not backward compatible.
3. Verify `/api/health`.
