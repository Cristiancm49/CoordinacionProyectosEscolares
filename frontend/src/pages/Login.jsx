import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [errorContrasena, setErrorContrasena] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Limpiar errores anteriores
    setErrorEmail('');
    setErrorContrasena('');

    const res = await fetch('http://localhost:4000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, contrasena })
    });

    const data = await res.json();
    if (res.ok) {
      login(data.usuario, data.token);
      switch (data.usuario.idRol) {
        case 1:
          navigate('/estudiante');
          break;
        case 2:
          navigate('/docente');
          break;
        case 3:
          navigate('/coordinador');
          break;
        default:
          navigate('/');
      }
    } else {
      // Detectar error por contenido del mensaje
      const mensaje = (data.message || '').toLowerCase();
      if (mensaje.includes('email')) {
        setErrorEmail(data.message);
      } else if (mensaje.includes('contraseña') || mensaje.includes('password')) {
        setErrorContrasena(data.message);
      } else {
        setErrorEmail(data.message); // Error genérico
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-md p-10 rounded-2xl shadow-2xl space-y-6">
        <h1 className="text-3xl font-bold text-center text-blue-700">Iniciar Sesión</h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Correo electrónico</label>
            <input
              type="email"
              className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="ejemplo@correo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {errorEmail && <p className="text-red-600 text-sm mt-1">{errorEmail}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Contraseña</label>
            <input
              type="password"
              className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="••••••••"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              required
            />
            {errorContrasena && <p className="text-red-600 text-sm mt-1">{errorContrasena}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition font-semibold"
          >
            Entrar
          </button>
        </form>

        <div className="flex justify-between text-sm text-blue-600 mt-4">
          <button
            className="hover:underline"
            onClick={() => navigate('/')}
          >
            ← Volver al inicio
          </button>

          <button
            className="hover:underline"
            onClick={() => alert('Función de recuperación de contraseña pendiente')}
          >
            ¿Olvidaste tu contraseña?
          </button>
        </div>
      </div>
    </div>
  );
}
