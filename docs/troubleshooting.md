# Troubleshooting Guide

## Frontend shows fallback map
Start backend and verify `VITE_API_BASE_URL`.

## Route not found
Check that the start and destination nodes exist and are connected by active edges.

## Accessible route not found
The graph may require stairs, or elevator/ramp edges may be missing or not marked accessible.

## Admin API returns 401
Login and provide `Authorization: Bearer <token>`.

## Admin API returns 403
User role must be ADMIN, SUPER_ADMIN, or MAP_EDITOR.

## PostGIS errors
Verify extensions:
```sql
SELECT PostGIS_Version();
```
