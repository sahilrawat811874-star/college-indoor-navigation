# Navigation and Routing Architecture

## Algorithm

Use A* as the primary routing algorithm. Dijkstra will be available for tests and debugging.

## Graph

- Node: room entrance, corridor point, intersection, staircase entry/exit, elevator entry/exit, block entrance, outdoor connector, emergency exit.
- Edge: walkable segment between nodes.

## Route Request Flow

```text
Client selects current location and destination
        |
POST /api/navigation/route
        |
Resolve start node and destination node
        |
Load active graph from database
        |
Filter closed, restricted, or inaccessible edges
        |
Apply accessibility mode costs/rules
        |
Run A*
        |
Generate route geometry and turn-by-turn instructions
        |
Return route response to client
        |
Render route in 3D
```

## Cost Model

```text
cost = distance
     + floor_change_penalty
     + stairs_penalty
     + elevator_wait_penalty
     + accessibility_penalty
     + restricted_area_penalty
     + congestion_penalty
```

Closed edges are removed entirely from the graph.

## Accessibility Mode

When wheelchair-accessible mode is enabled:

- Remove stair edges.
- Remove non-accessible edges.
- Prefer elevators and ramps.
- Avoid restricted areas unless the user role permits them.

## Turn Instructions

Instructions are derived from edge metadata and geometry angle changes:

- Continue straight
- Turn left/right
- Take staircase
- Take elevator
- Change floor
- Enter block
- Exit block
- Destination ahead
