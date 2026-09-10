# Judges Q&A

## Is this just a 3D model?
No. The app uses a backend database model and navigation graph. The 3D view renders data-driven blocks, floors, rooms, and route overlays.

## Does routing draw a straight line?
No. Routes are calculated with A* over navigation nodes and edges such as corridors, stairs, elevators, room entrances, and block connectors.

## Can it support real college data?
Yes. Demo data can be replaced with actual floor plans, room coordinates, corridors, staircases, elevators, and entrances.

## What happens if AI fails?
Core navigation continues to work. AI is only used for natural-language intent interpretation.

## Is accessibility supported?
Yes. Accessible mode filters inaccessible nodes and edges and prefers elevator-accessible paths.

## How is it secured?
JWT authentication, Argon2 password hashing, RBAC, validation, Helmet, CORS controls, and protected admin APIs.
