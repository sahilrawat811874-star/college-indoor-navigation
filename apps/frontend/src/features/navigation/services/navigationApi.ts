import type { RouteResponse } from '../types/route';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:4000/api';
export async function fetchRoute(startNodeId: string, destinationNodeId: string, accessible: boolean) {
  const res = await fetch(`${API_BASE_URL}/navigation/route`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ startNodeId, destinationNodeId, accessible }) });
  if (!res.ok) throw new Error('Route not found');
  return res.json() as Promise<RouteResponse>;
}
