import { Line } from '@react-three/drei';
export function RouteLayer() { const points: [number, number, number][] = [[10,0.6,35],[50,0.6,35],[50,4.6,42],[70,8.6,28]]; return <Line points={points} color="#2783DE" lineWidth={5} dashed={false} />; }
