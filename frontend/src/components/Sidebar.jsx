import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Sidebar() {
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => location.pathname.includes(path);

  return (
    <aside className="w-64 bg-blue-800 text-white min-h-screen flex flex-col justify-between py-6 shadow-lg">
      <div className="px-6">
        <h2 className="text-xl font-bold mb-6 text-white text-center">Menú principal</h2>

        <nav className="flex flex-col space-y-2 text-sm">
          <Link
            to="perfil"
            className={`px-4 py-2 rounded transition ${
              isActive('perfil') ? 'bg-blue-700' : 'hover:bg-blue-800'
            }`}
          >
            Mi perfil
          </Link>

          {usuario?.idRol === 3 && (
            <>
              <Link
                to="instituciones"
                className={`px-4 py-2 rounded transition ${
                  isActive('instituciones') ? 'bg-blue-700' : 'hover:bg-blue-800'
                }`}
              >
                Instituciones
              </Link>
              <Link
                to="usuarios"
                className={`px-4 py-2 rounded transition ${
                  isActive('usuarios') ? 'bg-blue-700' : 'hover:bg-blue-800'
                }`}
              >
                Usuarios
              </Link>
              <Link
                to="proyectos"
                className={`px-4 py-2 rounded transition ${
                  isActive('proyectos') ? 'bg-blue-700' : 'hover:bg-blue-800'
                }`}
              >
                Proyectos
              </Link>
              <Link
                to="estados"
                className={`px-4 py-2 rounded transition ${
                  isActive('estados') ? 'bg-blue-700' : 'hover:bg-blue-800'
                }`}
              >
                Estados Proyecto
              </Link>
            </>
          )}

          {usuario?.idRol === 2 && (
            <Link
              to="proyectos"
              className={`px-4 py-2 rounded transition ${
                isActive('proyectos') ? 'bg-blue-700' : 'hover:bg-blue-800'
              }`}
            >
              Mis Proyectos
            </Link>
          )}

          {usuario?.idRol === 1 && (
            <Link
              to="mis-proyectos"
              className={`px-4 py-2 rounded transition ${
                isActive('mis-proyectos') ? 'bg-blue-700' : 'hover:bg-blue-800'
              }`}
            >
              Proyectos Asignados
            </Link>
          )}
        </nav>
      </div>

      <div className="px-6">
        <button
          onClick={handleLogout}
          className="w-full text-left text-sm text-red-300 hover:text-red-500 transition"
        >
          Cerrar sesión
        </button>
      </div>
    </aside>
  );
}
