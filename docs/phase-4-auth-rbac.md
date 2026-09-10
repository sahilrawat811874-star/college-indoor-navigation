# Phase 4: Authentication + RBAC

## Built
- JWT authentication with access and refresh tokens.
- Argon2 password hashing.
- Register, login, refresh, and current-user endpoints.
- Passport JWT strategy.
- Role decorator and role guard.
- Admin-protected users endpoint.

## Endpoints
- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/refresh`
- `GET /api/auth/me`
- `GET /api/users` admin/super-admin only

## Test Command
```bash
cd apps/backend
pnpm install
pnpm prisma:generate
pnpm build
```
