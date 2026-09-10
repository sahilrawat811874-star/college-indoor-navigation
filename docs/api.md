# API Documentation Summary

Swagger is available at:
```text
/api/docs
```

## Core APIs
- `GET /api/health`
- `GET /api/map/campus`
- `GET /api/search?q=`
- `POST /api/navigation/route`
- `POST /api/ai/query`

## Auth APIs
- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/refresh`
- `GET /api/auth/me`

## Admin APIs
- `GET /api/admin/dashboard`
- `POST /api/admin/rooms`
- `PATCH /api/admin/rooms/:id`
- `DELETE /api/admin/rooms/:id`
- `POST /api/admin/facilities`
- `POST /api/admin/navigation-nodes`
- `POST /api/admin/navigation-edges`
