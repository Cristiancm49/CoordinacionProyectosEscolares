import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [nombre, setNombre] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [email, setEmail] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [idRol, setIdRol] = useState('1');
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje('');

    const res = await fetch('http://localhost:4000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre, apellidos, email, contrasena, idRol }),
    });

    const data = await res.json();

    if (res.ok) {
      setMensaje('Usuario registrado exitosamente');
      setTimeout(() => navigate('/login'), 2000);
    } else {
      setMensaje(data.message || 'Error al registrar');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-green-800 px-4">
      <div className="bg-white w-full max-w-lg p-10 rounded-2xl shadow-2xl space-y-6">
        <h2 className="text-3xl font-bold text-center text-green-700">Registro de Usuario</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block px-2 font-semibold text-sm text-gray-700 mb-1">Nombre</label>
            <input
              type="text"
              className="w-full border p-3 rounded-xl"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block px-2 font-semibold text-sm text-gray-700 mb-1">Apellidos</label>
            <input
              type="text"
              className="w-full border p-3 rounded-xl"
              value={apellidos}
              onChange={(e) => setApellidos(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block px-2 font-semibold text-sm text-gray-700 mb-1">Correo electrónico</label>
            <input
              type="email"
              className="w-full border p-3 rounded-xl"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block font-semibold px-2 text-sm text-gray-700 mb-1">Contraseña</label>
            <input
              type="password"
              className="w-full border p-3 rounded-xl"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block font-semibold text-sm px-2 text-gray-700 mb-1">Rol</label>
            <select
              className="w-full border p-3 rounded-xl"
              value={idRol}
              onChange={(e) => setIdRol(e.target.value)}
              required
            >
              <option value="1">Estudiante</option>
              <option value="2">Docente</option>
              <option value="3">Coordinador</option>
            </select>
          </div>

          <button className="w-full bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 font-semibold">
            Registrarse
          </button>
        </form>

        {mensaje && (
          <div className="text-center text-sm mt-4 text-red-600">
            {mensaje}
          </div>
        )}
      </div>
    </div>
  );
}
