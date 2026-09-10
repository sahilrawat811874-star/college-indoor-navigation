import { useState } from 'react';
import { MapPage } from '../pages/MapPage';
import { AdminDashboardPage } from '../pages/admin/AdminDashboardPage';
export function App() { const [page,setPage]=useState<'map'|'admin'>('map'); return <><nav className="app-nav"><button className={page==='map'?'active':''} onClick={()=>setPage('map')}>Map</button><button className={page==='admin'?'active':''} onClick={()=>setPage('admin')}>Admin</button></nav>{page==='map'?<MapPage/>:<AdminDashboardPage/>}</>; }
