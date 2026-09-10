import { Canvas } from '@react-three/fiber';
import type { CampusMapDto } from '../types/map';
import { CampusScene } from './CampusScene';
export function CampusCanvas({ map }: { map: CampusMapDto }) { return <Canvas shadows dpr={[1, 2]}><CampusScene map={map} /></Canvas>; }
