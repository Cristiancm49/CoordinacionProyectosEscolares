export default function UsuarioCard({ usuario, onEditar, onEliminar }) {
    return (
      <div className="bg-white shadow rounded-xl p-4 space-y-2 border border-gray-200 flex flex-col justify-between">
        <div className="space-y-1 text-sm">
          <h3 className="text-lg font-bold text-blue-800">{usuario.nombreusuario} {usuario.apellidos}</h3>
          <p className="text-gray-700"><span className="font-semibold">Correo:</span> {usuario.email}</p>
          <p className="text-gray-700"><span className="font-semibold">Rol:</span> {usuario.nombrerol}</p>
        </div>
  
        <div className="flex justify-end gap-2 pt-4">
          <button
            onClick={() => onEditar(usuario)}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm"
          >
            Editar
          </button>
          <button
            onClick={() => onEliminar(usuario.idusuario)}
            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
          >
            Eliminar
          </button>
        </div>
      </div>
    );
  }
  