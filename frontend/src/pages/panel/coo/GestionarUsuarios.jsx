import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import UsuarioCard from '../../../components/UsuarioCard';
import Modal from '../../../components/Modal';

export default function GestionUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [mostrarModal, setMostrarModal] = useState(false);
  const [editando, setEditando] = useState(null);
  const [roles, setRoles] = useState([]);

  const cargarUsuarios = async () => {
    const res = await fetch('http://localhost:4000/api/usuarios/getUsuarios');
    const data = await res.json();
    setUsuarios(data);
  };

  const cargarRoles = async () => {
    const res = await fetch('http://localhost:4000/api/roles/getRoles');
    const data = await res.json();
    setRoles(data);
  };

  useEffect(() => {
    cargarUsuarios();
    cargarRoles();
  }, []);

  const filtrados = usuarios.filter((u) =>
    `${u.nombreusuario} ${u.apellidos}`.toLowerCase().includes(busqueda.toLowerCase())
  );

  const handleEliminar = async (id) => {
    const confirm = await Swal.fire({
      title: '¿Eliminar usuario?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    });

    if (!confirm.isConfirmed) return;

    const res = await fetch(`http://localhost:4000/api/usuarios/deleteUsuario/${id}`, {
      method: 'DELETE'
    });

    if (res.ok) {
      Swal.fire('Eliminado', 'Usuario eliminado correctamente', 'success');
      cargarUsuarios();
    } else {
      Swal.fire('Error', 'No se pudo eliminar el usuario', 'error');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const payload = {
      nombre: form.nombre.value,
      apellidos: form.apellidos.value,
      email: form.email.value,
      contrasena: form.contrasena.value,
      idRol: parseInt(form.idRol.value)
    };

    const url = editando
      ? `http://localhost:4000/api/usuarios/updateUsuarios/${editando.idusuario}`
      : 'http://localhost:4000/api/usuarios/createUsuario';

    const method = editando ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (res.ok) {
      Swal.fire(
        editando ? 'Actualizado' : 'Creado',
        `Usuario ${editando ? 'actualizado' : 'creado'} correctamente`,
        'success'
      );
      cargarUsuarios();
      setMostrarModal(false);
      setEditando(null);
    } else {
      Swal.fire('Error', 'No se pudo guardar el usuario', 'error');
    }
  };

  return (
    <div className="p-6 max-w-screen-lg mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-blue-800">Gestión de Usuarios</h2>
        <button
          onClick={() => {
            setEditando(null);
            setMostrarModal(true);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Crear Usuario
        </button>
      </div>

      <input
        type="text"
        placeholder="Buscar..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        className="mb-4 p-2 border rounded w-full"
      />

      <div className="grid gap-4 md:grid-cols-2">
        {filtrados.map((u) => (
          <UsuarioCard
            key={u.idusuario}
            usuario={u}
            onEditar={() => {
              setEditando({
                ...u,
                nombre: u.nombreusuario // 🔧 corrección clave aquí
              });
              setMostrarModal(true);
            }}
            onEliminar={() => handleEliminar(u.idusuario)}
          />
        ))}
      </div>

      {mostrarModal && (
        <Modal
          titulo={editando ? 'Editar usuario' : 'Crear nuevo usuario'}
          onClose={() => {
            setMostrarModal(false);
            setEditando(null);
          }}
        >
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="text"
              name="nombre"
              defaultValue={editando?.nombre || ''}
              placeholder="Nombre"
              required
              className="w-full p-2 border rounded"
            />
            <input
              type="text"
              name="apellidos"
              defaultValue={editando?.apellidos || ''}
              placeholder="Apellidos"
              required
              className="w-full p-2 border rounded"
            />
            <input
              type="email"
              name="email"
              defaultValue={editando?.email || ''}
              placeholder="Correo"
              required
              className="w-full p-2 border rounded"
            />
            <input
              type="password"
              name="contrasena"
              placeholder={editando ? 'Nueva contraseña (opcional)' : 'Contraseña'}
              className="w-full p-2 border rounded"
              required={!editando}
            />
            <select
              name="idRol"
              defaultValue={editando?.idrol || ''}
              required
              className="w-full p-2 border rounded"
            >
              <option value="">Selecciona un rol</option>
              {roles.map((r) => (
                <option key={r.idrol} value={r.idrol}>
                  {r.nombre}
                </option>
              ))}
            </select>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  setMostrarModal(false);
                  setEditando(null);
                }}
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
              >
                {editando ? 'Actualizar' : 'Crear'}
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
