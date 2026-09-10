# Phase 5: 3D Map Engine

## Built
- React/Vite frontend app on top of the existing monorepo.
- React Three Fiber 3D canvas.
- Camera, lighting, orbit controls, grid, floor slabs, room meshes, labels, and route overlay layer.
- 2D/3D camera behavior toggle.
- Floor selection and show/isolate floors control.
- Clickable room selection with information panel.
- Backend `/api/map/campus` integration with fallback demo data for frontend-only development.

## Important Boundary
This phase builds the 3D rendering engine. Real route calculation is intentionally not implemented here; A* routing comes in Phase 7.

## Run
```bash
cd apps/frontend
pnpm install
pnpm dev
```

Frontend URL: `http://localhost:5173`
