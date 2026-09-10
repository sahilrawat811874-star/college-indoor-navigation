import { useQuery } from '@tanstack/react-query';
import { fetchCampusMap } from '../../services/mapApi';
import { AdminMapManager } from '../../features/admin/components/AdminMapManager';
import { AdminStatGrid } from '../../features/admin/components/AdminStatGrid';
export function AdminDashboardPage(){ const {data:map}=useQuery({queryKey:['campus-map-admin'],queryFn:fetchCampusMap,retry:false}); const stats=map?{blocks:map.blocks.length,floors:map.floors.length,rooms:map.rooms.length,facilities:map.facilities.length,nodes:map.navigationNodes.length,edges:map.navigationEdges.length}:undefined; return <main className="admin-page"><header><p className="eyebrow">Admin dashboard</p><h1>College Map Management</h1><p>Manage campus structure, rooms, facilities, navigation graph data, and closures.</p></header><AdminStatGrid stats={stats}/>{map?<AdminMapManager map={map}/>:<div className="card"><h2>Backend required</h2><p>Start the backend to load admin map data.</p></div>}</main> }
