export default function InstitucionCard({ institucion, onEditar, onEliminar }) {
    return (
      <div className="p-4 bg-white rounded shadow flex justify-between items-start">
        <div>
          <h3 className="text-lg font-bold text-blue-800">{institucion.nombre}</h3>
          <p className="text-sm text-gray-600">📍 {institucion.direccion} - {institucion.ciudad}</p>
          <p className="text-sm text-gray-600">📞 {institucion.telefono}</p>
          <p className="text-sm text-gray-600">✉️ {institucion.email || institucion.correo}</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={onEditar}
            className="text-blue-600 hover:underline text-sm"
          >
            Editar
          </button>
          <button
            onClick={onEliminar}
            className="text-red-500 hover:underline text-sm"
          >
            Eliminar
          </button>
        </div>
      </div>
    );
  }
  