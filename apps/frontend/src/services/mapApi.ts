import { apiGet } from './apiClient';
import type { CampusMapDto } from '../types/map';
export function fetchCampusMap() { return apiGet<CampusMapDto>('/map/campus'); }
