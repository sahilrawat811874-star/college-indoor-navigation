import type { RouteResponse } from '../types/route';
export function RouteSteps({ route }: { route?: RouteResponse }) {
  if (!route) return <div className="route"><h2>Navigation</h2><p>Select a room and calculate a route in Phase 7.</p></div>;
  return <div className="route"><h2>Route</h2><p>{route.distanceMeters} m · {Math.ceil(route.estimatedTimeSeconds / 60)} min</p><ol className="steps">{route.steps.map(s => <li key={s.sequence}>{s.instruction}</li>)}</ol></div>;
}
