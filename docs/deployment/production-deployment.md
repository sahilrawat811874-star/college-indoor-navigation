# Phase 12: Production Deployment

## Built
- Production Dockerfile for backend.
- Production Dockerfile and Nginx config for frontend.
- Production Docker Compose stack.
- Production environment template.
- Deployment and migration scripts.
- GitHub Actions CI workflow.

## Local Production Run
```bash
cp .env.production.example .env.production
# edit secrets and domains
./scripts/deploy-production.sh
./scripts/migrate-production.sh
```

## Cloud Option A: Practical Managed Stack
- Frontend: Vercel or Netlify.
- Backend: Render, Railway, or Fly.io.
- Database: Supabase or Neon PostgreSQL with PostGIS.
- Assets: S3-compatible object storage.
- Monitoring: Sentry.

## Cloud Option B: AWS Production Stack
- Frontend: S3 + CloudFront.
- Backend: ECS Fargate.
- Database: RDS PostgreSQL with PostGIS.
- Secrets: AWS Secrets Manager.
- Logs: CloudWatch.
- Assets: S3.

## Required Production Steps
1. Create production PostgreSQL with PostGIS enabled.
2. Set strong JWT secrets.
3. Configure CORS to the frontend domain only.
4. Run Prisma migrations with `prisma migrate deploy`.
5. Seed demo data only for staging or initial setup.
6. Verify `/api/health`.
7. Verify frontend can reach backend.
8. Configure TLS through platform, load balancer, or reverse proxy.

## Health Check
Backend:
```text
GET /api/health
```

## Security Checklist
- Never commit `.env.production`.
- Rotate JWT secrets before real launch.
- Use HTTPS only.
- Restrict database network access.
- Use managed backups.
- Keep admin users minimal.
