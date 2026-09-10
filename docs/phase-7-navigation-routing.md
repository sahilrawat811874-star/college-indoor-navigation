# Phase 7: Indoor Navigation + A* Routing Engine

## Built
- Backend Navigation module.
- A* routing algorithm over navigation nodes and edges.
- Graph builder reading active nodes/edges from PostgreSQL/PostGIS.
- Accessibility mode that filters non-accessible nodes and edges.
- Route API returning distance, estimated time, node IDs, edge IDs, path points, and turn-by-turn style steps.
- Navigation nodes and edges listing endpoints.
- Frontend route response types, API client, and route steps component foundation.

## Endpoints
- `POST /api/navigation/route`
- `GET /api/navigation/nodes?q=`
- `GET /api/navigation/edges`

## Boundary
This phase implements the routing engine and API. Deeper UI integration and polished live navigation controls can continue in Phase 8.
