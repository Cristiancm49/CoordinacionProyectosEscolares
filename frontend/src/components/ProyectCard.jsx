import { useAuth } from '../context/AuthContext';

export default function ProyectoCard({ proyecto, onVerMas, onEditar = null, onEliminar = null }) {
  const { usuario } = useAuth();

  const nombreProyecto = proyecto.nombre || proyecto.nombre_proyecto;
  const institucion = proyecto.nombre_institucion || proyecto.institucion;
  const estado = proyecto.estado_actual || 'Sin estado';
  const creador = proyecto.creador || proyecto.nombre_creador || '';

  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm hover:shadow-md transition-all border border-gray-200 flex flex-col justify-between h-full">
      <div className="space-y-3 text-sm text-gray-700">
        <h2 className="text-lg font-bold text-blue-800 break-words">{nombreProyecto}</h2>

        <span className="inline-block bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full font-semibold">
          {estado}
        </span>

        <p className="font-semibold">{institucion}</p>
        {creador && <p className="text-sm text-gray-600">Creado por: {creador}</p>}

        <div className="flex justify-between items-start flex-wrap gap-4 mt-4">
          <div className="text-xs text-gray-500">
            <p className="font-medium">Inicio</p>
            <p className="text-sm text-gray-700">
              {new Date(proyecto.fechainicio).toLocaleDateString()}
            </p>
          </div>

          <div className="text-xs text-gray-500 text-right">
            <p className="font-medium">Fin</p>
            <p className="text-sm text-gray-700">
              {new Date(proyecto.fechafin).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 mt-6">
        <button
          onClick={() => onVerMas(proyecto)}
          className="w-full sm:w-auto bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm"
        >
          Ver más
        </button>

        {onEditar && (
          <button
            onClick={() => onEditar(proyecto)}
            className="w-full sm:w-auto bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition text-sm"
          >
            Editar
          </button>
        )}

        {usuario?.idRol === 3 && onEliminar && (
          <button
            onClick={() => onEliminar(proyecto.idproyecto)}
            className="w-full sm:w-auto bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition text-sm"
          >
            Eliminar
          </button>
        )}
      </div>
    </div>
  );
}
