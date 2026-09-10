# Deployment Architecture

## Local Development

Use Docker Compose for PostgreSQL/PostGIS and Redis.

```bash
docker compose up -d
```

## Practical Cloud Deployment

| Component | Recommended Option |
|---|---|
| Frontend | Vercel |
| Backend | Render, Railway, or Fly.io |
| Database | Supabase or Neon PostgreSQL with PostGIS |
| Redis | Upstash |
| Assets | Supabase Storage or S3-compatible storage |
| Monitoring | Sentry |

## Scalable AWS Deployment

| Component | AWS Service |
|---|---|
| Frontend | S3 + CloudFront |
| Backend | ECS Fargate |
| Database | RDS PostgreSQL with PostGIS |
| Redis | ElastiCache |
| Assets | S3 |
| Secrets | AWS Secrets Manager |
| Logs | CloudWatch |

## Required Runtime Configuration

See `.env.example` for backend and frontend variables.

## Health Check

Backend will expose:

```text
GET /health
```

It should verify API process health and database connectivity.
