import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';

export default function BienvenidaCoordinador() {
  const { usuario } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="h-full w-full bg-gradient-to-br flex items-center justify-center">
      <div className="bg-white shadow-xl rounded-2xl p-6 sm:p-10  max-w-3xl space-y-6 text-center">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-blue-900">
          ¡Hola, {usuario?.nombre || 'Coordinador'}!
        </h1>

        <p className="text-gray-700 text-base sm:text-lg">
          Este es tu panel central. Desde aquí puedes gestionar usuarios, instituciones, roles,
          estados y proyectos. Tienes el control total de la plataforma académica.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            onClick={() => navigate('/coordinador/usuarios')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium shadow transition"
          >
            Gestionar Usuarios
          </button>
          <button
            onClick={() => navigate('/coordinador/instituciones')}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium shadow transition"
          >
            Gestionar Instituciones
          </button>
          <button
            onClick={() => navigate('/coordinador/estados')}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg font-medium shadow transition"
          >
            Gestionar Estados
          </button>
          <button
            onClick={() => navigate('/coordinador/proyectos')}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium shadow transition"
          >
            Gestionar Proyectos
          </button>
        </div>

        <img
          src="https://cdn-icons-png.flaticon.com/512/1055/1055687.png"
          alt="Panel de gestión"
          className="w-28 sm:w-32 h-auto mx-auto mt-4"
        />
      </div>
    </div>
  );
}
