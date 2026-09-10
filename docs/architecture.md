# System Architecture

## Objective

Build a scalable, data-driven, web-based 3D indoor navigation system for a college campus. The application must support block/floor/room selection, full-text and natural-language search, graph-based routing, accessibility-aware navigation, QR-based current-location detection, admin map management, analytics, and secure deployment.

## Core Principle

The map is not hard-coded in frontend components. PostgreSQL/PostGIS stores all campus structure, spatial geometry, navigation nodes, edges, closures, and searchable location metadata. The frontend renders the 3D environment from backend map APIs.

## High-Level Components

```text
React/Vite Web Client
  - User map UI
  - 3D renderer
  - Search/navigation panel
  - Admin dashboard
  - QR scanner
        |
        | HTTPS REST API
        v
NestJS Backend
  - Auth/RBAC
  - Campus data APIs
  - Map APIs
  - Search APIs
  - Navigation APIs
  - Admin APIs
  - Analytics APIs
  - AI/NLP adapter
        |
        | Prisma + raw PostGIS SQL
        v
PostgreSQL + PostGIS
  - Spatial campus model
  - Navigation graph
  - Search indexes
  - Audit logs
  - Analytics events
```

## Main Domains

1. Identity and access control
2. Campus entities: blocks, floors, rooms, facilities, departments, faculty
3. Spatial map data
4. Navigation graph and route calculation
5. Search and NLP interpretation
6. Admin editing
7. Analytics and audit logging
8. Deployment and operations

## Technology Decisions

| Concern | Decision | Reason |
|---|---|---|
| Frontend | React + Vite + TypeScript | Fast, maintainable, strong ecosystem |
| 3D | React Three Fiber + Three.js | Declarative 3D integrated with React state |
| Backend | NestJS + TypeScript | Modular production architecture |
| Database | PostgreSQL + PostGIS | Relational + spatial data support |
| ORM | Prisma | Type-safe data access; raw SQL for PostGIS when needed |
| Routing | A* | Efficient shortest-path routing using spatial heuristics |
| Search | PostgreSQL full-text search first | Reliable deterministic search without extra infrastructure |
| AI | Optional NLP layer | Enhances query interpretation without controlling routing |
| Local infra | Docker Compose | Repeatable local setup |

## API Boundary

The frontend should consume backend DTOs only. It should never know database internals. The backend owns validation, route calculation, permission checks, closures, and search ranking.

## Reliability Rules

- AI must be optional.
- Admin map changes must be audited.
- Closed edges/nodes must be excluded from routing.
- Accessible routing must avoid stairs and non-accessible edges.
- Unknown rooms must return clear errors, not fabricated locations.
