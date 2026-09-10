# 3D College Indoor Mapping & Navigation System

Production-oriented web platform for searchable, accessible, 3D indoor college navigation across A Block, B Block, and C Block.

## Phase 1 Status

This phase defines the architecture, repository layout, technology decisions, environment strategy, local infrastructure, and development roadmap. Implementation code starts in later phases.

## Core Stack

- Frontend: React, Vite, TypeScript, React Three Fiber, Three.js, Zustand, TanStack Query, Tailwind CSS
- Backend: NestJS, TypeScript, Prisma, PostgreSQL, PostGIS, Swagger/OpenAPI
- Routing: A* over a database-backed indoor navigation graph
- Auth: JWT, refresh tokens, Argon2, RBAC
- DevOps: Docker Compose locally, deployable to Vercel/Render/Supabase or AWS

## Local Prerequisites

- Node.js 20+
- pnpm 9+
- Docker and Docker Compose

## First Commands

```bash
pnpm install
docker compose up -d
```

Application-specific run commands will be added as backend and frontend apps are implemented.

## Documentation

- `docs/architecture.md`
- `docs/database-er-diagram.md`
- `docs/routing-flow.md`
- `docs/deployment.md`
