# Routing Engine

The routing engine uses A* over a graph of navigation nodes and edges.

## Nodes
Represent room entrances, corridors, intersections, stairs, elevators, block entrances, and outdoor connectors.

## Edges
Represent walkable paths. Edge cost is based on distance and can be modified for accessibility, restrictions, closures, or congestion.

## Accessibility
Accessible mode removes inaccessible nodes and edges before routing.
