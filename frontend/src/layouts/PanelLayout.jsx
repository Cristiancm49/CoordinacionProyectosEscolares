import Sidebar from '../components/Sidebar';
import { Outlet } from 'react-router-dom';

export default function PanelLayout() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 bg-gray-100 p-6">
        <Outlet />
      </main>
    </div>
  );
}
