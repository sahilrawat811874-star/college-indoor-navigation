# Phase 3: Backend API Foundation

## Built

- NestJS backend application shell.
- Global config, CORS, Helmet, validation pipe, and exception filter.
- Prisma database service.
- Health endpoint with database check.
- Read APIs for blocks, floors, rooms, facilities, and departments.
- Campus map API returning core map/navigation data.
- Basic deterministic search API.
- Swagger/OpenAPI at `/api/docs`.

## Run

```bash
cd apps/backend
pnpm install
pnpm prisma:generate
pnpm start:dev
```

## Endpoints

- `GET /api/health`
- `GET /api/blocks`
- `GET /api/blocks/:id`
- `GET /api/floors`
- `GET /api/floors/:id`
- `GET /api/rooms`
- `GET /api/rooms/:id`
- `GET /api/facilities`
- `GET /api/facilities/:id`
- `GET /api/departments`
- `GET /api/departments/:id`
- `GET /api/map/campus`
- `GET /api/search?q=A-204`
- `GET /api/docs`

## Current Limitation

Write/admin endpoints, authentication, RBAC, advanced PostGIS DTO shaping, and routing APIs come in later phases.
