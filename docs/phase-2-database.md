# Phase 2: Database + PostGIS

## Built

- Prisma schema for campus, rooms, facilities, departments, faculty, navigation graph, closures, QR markers, analytics events, and audit logs.
- PostGIS geometry columns for blocks, floors, rooms, facilities, navigation nodes, navigation edges, and QR markers.
- Demo seed data for A Block, B Block, and C Block.
- Spatial index SQL file.

## Migration Commands

```bash
cd apps/backend
pnpm install
pnpm prisma:generate
pnpm prisma:migrate --name init_postgis_schema
pnpm prisma:seed
```

Then apply spatial indexes if the migration did not include them yet:

```bash
psql "$DATABASE_URL" -f prisma/phase2-spatial-indexes.sql
```

## Demo Dataset

The seed creates:

- A Block: Ground, 1st, 2nd, 3rd floors
- B Block: Ground, 1st, 2nd floors
- C Block: Ground, 1st, 2nd floors
- Rooms including A-204, B-105 BCA Lab, B-204, C-208
- Facilities including library, canteen, auditorium, washroom, staircase, elevator
- Navigation nodes and edges for same-floor, multi-floor, and cross-block routing
- QR marker: `QR-A-G-MAIN-ENTRANCE`

## Notes

This is a replaceable demo dataset. Real production accuracy requires actual college floor dimensions, room positions, corridors, stairs, elevators, and entrances.
