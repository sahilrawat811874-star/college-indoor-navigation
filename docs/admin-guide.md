# Admin Guide

## Access
Admin APIs require a valid JWT and one of these roles:
- ADMIN
- SUPER_ADMIN
- MAP_EDITOR

## Manage Map Data
Admins can create and update:
- Rooms
- Facilities
- Navigation nodes
- Navigation edges

## Best Practices
- Every room should have a matching room entrance node.
- Every corridor should be represented with connected navigation nodes.
- Stair and elevator edges should correctly mark accessibility.
- Closed or restricted areas should be reflected in graph data before users navigate.

## Data Replacement
Replace the demo dataset with real college data by updating seed data or using admin endpoints.
