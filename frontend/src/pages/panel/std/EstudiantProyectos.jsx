import { useEffect, useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { getProyectosAsignados } from '../../../api/estudianteApi';
import { useNavigate } from 'react-router-dom';
import ProyectoCard from '../../../components/ProyectCard';

export default function EstudianteProyectos() {
  const { usuario } = useAuth();
  const [proyectos, setProyectos] = useState([]);
  const [filtro, setFiltro] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProyectos() {
      try {
        const data = await getProyectosAsignados(usuario.id);
        setProyectos(data);
      } catch (error) {
        console.error('Error al cargar proyectos:', error);
      } finally {
        setLoading(false);
      }
    }

    if (usuario) fetchProyectos();
  }, [usuario]);

    const handleVerMas = (proyecto) => {
        navigate(`proyecto/${proyecto.idproyecto}`);
    }

  const proyectosFiltrados = proyectos.filter(p =>
    p.nombre_proyecto?.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-2xl px-12 md:px-0  font-bold mb-6 text-blue-900">Proyectos Asignados</h1>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Buscar proyecto..."
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
      </div>

      {loading ? (
        <p className="text-gray-600">Cargando proyectos...</p>
      ) : proyectosFiltrados.length === 0 ? (
        <p className="text-gray-500">No se encontraron proyectos.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {proyectosFiltrados.map((proyecto) => (
            <ProyectoCard
              key={proyecto.idproyecto}
              proyecto={proyecto}
              onVerMas={() => handleVerMas(proyecto)}
            />
          ))}
        </div>
      )}
    </div>
  );
}