export type RouteStep = { sequence: number; instruction: string; distanceMeters: number; edgeType?: string };
export type RouteResponse = { distanceMeters: number; estimatedTimeSeconds: number; accessible: boolean; nodeIds: string[]; edgeIds: string[]; path: Array<{ id: string; x: number; y: number; z: number; label: string }>; steps: RouteStep[] };
