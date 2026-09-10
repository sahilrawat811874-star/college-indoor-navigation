# Database Architecture and ER Diagram

## Database

PostgreSQL with PostGIS is used for normalized semantic data and spatial geometry.

## Core Entities

```mermaid
erDiagram
  roles ||--o{ users : has
  blocks ||--o{ floors : contains
  blocks ||--o{ rooms : contains
  floors ||--o{ rooms : contains
  departments ||--o{ rooms : owns
  departments ||--o{ faculty_members : has
  rooms ||--o{ faculty_members : office_for
  floors ||--o{ facilities : contains
  rooms ||--o{ facilities : may_host
  floors ||--o{ navigation_nodes : contains
  navigation_nodes ||--o{ navigation_edges : from
  navigation_nodes ||--o{ navigation_edges : to
  navigation_nodes ||--o{ qr_location_markers : locates
  users ||--o{ audit_logs : creates
```

## Important Tables

- `users`
- `roles`
- `blocks`
- `floors`
- `rooms`
- `facilities`
- `departments`
- `faculty_members`
- `navigation_nodes`
- `navigation_edges`
- `closures`
- `qr_location_markers`
- `search_events`
- `navigation_sessions`
- `audit_logs`

## Spatial Columns

- `blocks.geometry`: Polygon
- `blocks.centroid`: Point
- `floors.floor_plan_geometry`: Polygon
- `rooms.geometry`: Polygon
- `rooms.entrance_point`: Point
- `rooms.center_point`: Point
- `facilities.geometry`: Point or Polygon
- `navigation_nodes.position`: PointZ
- `navigation_edges.geometry`: LineStringZ
- `qr_location_markers.position`: PointZ

## Index Strategy

Use GiST indexes on geometry fields and B-tree indexes on foreign keys. Use full-text indexes for rooms, facilities, departments, and faculty search.

## Demo Data

Phase 2 will seed A Block, B Block, and C Block with sample floors, rooms, corridors, stairs, elevators, entrances, and graph edges. This data is temporary and replaceable through admin tooling later.
