# Map Data Format

The campus map is data-driven.

## Required Real-World Data
- Blocks and dimensions
- Floors and elevation
- Room polygons and entrance points
- Facility points or polygons
- Corridor paths
- Stair/elevator nodes
- Inter-block connectors
- Accessibility flags
- Restricted-area flags

## Navigation Graph Rule
Every navigable location must connect to the graph through nodes and edges. Rooms should connect through a room entrance node.
