# Hackathon Demo Script

## 1. Opening Pitch
"This is a 3D indoor navigation system for colleges — like Google Maps, but for rooms, labs, departments, stairs, elevators, and facilities inside campus buildings."

## 2. Problem
Students, visitors, and faculty often cannot quickly find rooms, labs, offices, washrooms, or departments inside large campuses. Outdoor maps do not solve indoor floor-aware navigation.

## 3. Solution
The app provides:
- 3D indoor map
- Block/floor/room selection
- Search
- Natural-language queries
- A* routing
- Accessibility mode
- Admin map management

## 4. Demo Flow
1. Open the web app.
2. Show the 3D map with A/B/C Blocks.
3. Select A Block and 2nd Floor.
4. Select Room A-204.
5. Set current location as A-0-ENTRANCE.
6. Click Navigate.
7. Show distance, estimated time, and route steps.
8. Toggle accessible route.
9. Search "BCA Lab".
10. Use Smart Search: "Where is the BCA lab?"
11. Open Admin tab and show map data overview.

## 5. Technical Highlights
- React Three Fiber / Three.js frontend.
- NestJS TypeScript backend.
- PostgreSQL/PostGIS spatial model.
- A* routing engine.
- JWT authentication and RBAC.
- Deterministic NLP layer with future LLM extension point.
- Dockerized deployment.

## 6. Closing
"The map is data-driven, not hard-coded. Admins can update campus data, and the navigation engine uses the database graph to calculate real indoor routes."
