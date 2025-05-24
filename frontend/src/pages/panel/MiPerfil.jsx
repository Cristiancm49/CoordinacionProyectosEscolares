import { useAuth } from '../../context/AuthContext';
import { useState, useRef, useEffect } from 'react';
import { subirFotoPerfil } from '../../api/fotoPerfilApi';
import Swal from 'sweetalert2';

export default function MiPerfil() {
  const { usuario, token, login } = useAuth();
  const fileInputRef = useRef(null);

  const [nombre, setNombre] = useState(usuario?.nombre || '');
  const [apellidos, setApellidos] = useState(usuario?.apellidos || '');
  const [contrasena, setContrasena] = useState('');
  const [confirmarContrasena, setConfirmarContrasena] = useState('');
  const [errores, setErrores] = useState({});
  const [fotoPreview, setFotoPreview] = useState(null);

  useEffect(() => {
    if (usuario?.id) {
      setFotoPreview(`http://localhost:4000/api/foto-perfil/${usuario.id}?t=${Date.now()}`);
    }
  }, [usuario]);

  const handleSeleccionarFoto = () => fileInputRef.current.click();

  const handleFotoChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      await subirFotoPerfil(usuario.id, file);
      setFotoPreview(`http://localhost:4000/api/foto-perfil/${usuario.id}?t=${Date.now()}`);
      Swal.fire({
        icon: 'success',
        title: 'Foto actualizada',
        text: 'Tu foto de perfil se ha cambiado con éxito.',
        timer: 1500,
        showConfirmButton: false
      });
    } catch (err) {
      console.error('Error subiendo la imagen:', err);
      Swal.fire({
        icon: 'error',
        title: 'Error al subir foto',
        text: 'No se pudo actualizar tu imagen.'
      });
    }
  };

  const validar = () => {
    const erroresNuevos = {};
    if (!nombre.trim()) erroresNuevos.nombre = 'Este campo es obligatorio';
    if (!apellidos.trim()) erroresNuevos.apellidos = 'Este campo es obligatorio';

    if (contrasena || confirmarContrasena) {
      if (contrasena !== confirmarContrasena) {
        erroresNuevos.confirmarContrasena = 'Las contraseñas no coinciden';
      }
      if (contrasena.length < 6) {
        erroresNuevos.contrasena = 'Mínimo 6 caracteres';
      }
    }

    setErrores(erroresNuevos);
    return Object.keys(erroresNuevos).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validar()) return;

    const payload = {};
    if (nombre) payload.nombre = nombre;
    if (apellidos) payload.apellidos = apellidos;
    if (contrasena) payload.contrasena = contrasena;
    if (usuario.email) payload.email = usuario.email;
    if (usuario.idRol !== undefined) payload.idRol = usuario.idRol;

    try {
      const res = await fetch(`http://localhost:4000/api/usuarios/updateUsuarios/${usuario.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (res.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Perfil actualizado',
          text: 'Tus cambios se guardaron correctamente.',
          timer: 2000,
          showConfirmButton: false
        });

        // Reset de campos
        setNombre(data.usuario.nombre);
        setApellidos(data.usuario.apellidos);
        setContrasena('');
        setConfirmarContrasena('');
        setErrores({});

        // 🔁 Actualizar contexto y localStorage
        const usuarioActualizado = {
            ...data.usuario,
            id: data.usuario.idusuario,
            idRol: data.usuario.idrol// para que funcione el contexto y rutas
        };
        login(usuarioActualizado, token);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error al actualizar',
          text: data.message || 'No se pudieron guardar los cambios.'
        });
      }
    } catch (error) {
      console.error('Error al actualizar:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error del servidor',
        text: 'Intenta más tarde.'
      });
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-8 space-y-6">
      {/* FOTO */}
      <div className="flex flex-col items-center space-y-3">
        <img
          src={fotoPreview}
          alt="Foto de perfil"
          className="w-32 h-32 rounded-full object-cover border-4 border-blue-500"
          onError={(e) =>
            (e.target.src = 'https://via.placeholder.com/150/3b82f6/ffffff?text=Perfil')
          }
        />
        <button
          type="button"
          onClick={handleSeleccionarFoto}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition text-sm"
        >
          Editar foto
        </button>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFotoChange}
          hidden
        />
      </div>

      {/* FORMULARIO */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold mb-1">Nombre</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className={`w-full border px-4 py-2 rounded-lg ${errores.nombre ? 'border-red-500' : ''}`}
          />
          {errores.nombre && <p className="text-red-600 text-xs mt-1">{errores.nombre}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">Apellidos</label>
          <input
            type="text"
            value={apellidos}
            onChange={(e) => setApellidos(e.target.value)}
            className={`w-full border px-4 py-2 rounded-lg ${errores.apellidos ? 'border-red-500' : ''}`}
          />
          {errores.apellidos && <p className="text-red-600 text-xs mt-1">{errores.apellidos}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">Correo electrónico</label>
          <input
            type="email"
            value={usuario.email}
            disabled
            className="w-full border px-4 py-2 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">Nueva contraseña</label>
          <input
            type="password"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            className={`w-full border px-4 py-2 rounded-lg ${errores.contrasena ? 'border-red-500' : ''}`}
          />
          {errores.contrasena && <p className="text-red-600 text-xs mt-1">{errores.contrasena}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">Confirmar contraseña</label>
          <input
            type="password"
            value={confirmarContrasena}
            onChange={(e) => setConfirmarContrasena(e.target.value)}
            className={`w-full border px-4 py-2 rounded-lg ${errores.confirmarContrasena ? 'border-red-500' : ''}`}
          />
          {errores.confirmarContrasena && (
            <p className="text-red-600 text-xs mt-1">{errores.confirmarContrasena}</p>
          )}
        </div>

        <button
          type="submit"
          className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Guardar cambios
        </button>
      </form>
    </div>
  );
}
