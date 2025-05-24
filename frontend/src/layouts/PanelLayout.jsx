import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { Menu } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function PanelLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { usuario } = useAuth(); // ← Aquí tomamos el rol

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Botón toggle (móvil) */}
      <button
        className="absolute top-4 left-4 z-50 md:hidden bg-blue-800 text-white p-2 rounded-md shadow-md"
        onClick={() => setSidebarOpen(true)}
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 z-40 h-full transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0
          md:static md:block w-64 bg-blue-800 text-white`}
      >
        <Sidebar rol={usuario?.idRol} onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Overlay móvil */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Contenido */}
      <main className="flex-1 h-full overflow-y-auto bg-gray-100 p-6">
        <Outlet />
      </main>
    </div>
  );
}
