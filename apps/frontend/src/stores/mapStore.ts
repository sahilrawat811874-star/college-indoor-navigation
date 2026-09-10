import { create } from 'zustand';
import type { ViewMode } from '../types/map';
type MapState = { selectedBlockId?: string; selectedFloorId?: string; selectedRoomId?: string; mode: ViewMode; showAllFloors: boolean; setBlock: (id?: string) => void; setFloor: (id?: string) => void; setRoom: (id?: string) => void; setMode: (mode: ViewMode) => void; toggleAllFloors: () => void };
export const useMapStore = create<MapState>((set) => ({ mode: '3d', showAllFloors: true, setBlock: (selectedBlockId) => set({ selectedBlockId }), setFloor: (selectedFloorId) => set({ selectedFloorId, showAllFloors: false }), setRoom: (selectedRoomId) => set({ selectedRoomId }), setMode: (mode) => set({ mode }), toggleAllFloors: () => set((s) => ({ showAllFloors: !s.showAllFloors })) }));
