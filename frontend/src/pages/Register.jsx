import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function Register() {
    const [nombre, setNombre] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [email, setEmail] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [idRol, setIdRol] = useState('1');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const validate = () => {
        const newErrors = {};
        if (!nombre.trim()) newErrors.nombre = true;
        if (!apellidos.trim()) newErrors.apellidos = true;
        if (!email.trim()) newErrors.email = true;
        if (!contrasena.trim()) newErrors.contrasena = true;
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) {
            Swal.fire({
                icon: 'error',
                title: 'Faltan campos obligatorios',
                text: 'Por favor completa todos los campos.',
            });
            return;
        }

        const res = await fetch('http://localhost:4000/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre, apellidos, email, contrasena, idRol }),
        });

        const data = await res.json();

        if (res.ok) {
            Swal.fire({
                icon: 'success',
                title: '¡Registro exitoso!',
                text: 'Redirigiendo al login...',
                timer: 2000,
                showConfirmButton: false,
            });
            setTimeout(() => navigate('/login'), 2000);
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: data.message || 'No se pudo registrar el usuario.',
            });
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
                            className={`w-full border p-3 rounded-xl ${errors.nombre ? 'border-red-500' : ''}`}
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block px-2 font-semibold text-sm text-gray-700 mb-1">Apellidos</label>
                        <input
                            type="text"
                            className={`w-full border p-3 rounded-xl ${errors.apellidos ? 'border-red-500' : ''}`}
                            value={apellidos}
                            onChange={(e) => setApellidos(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block px-2 font-semibold text-sm text-gray-700 mb-1">Correo electrónico</label>
                        <input
                            type="email"
                            className={`w-full border p-3 rounded-xl ${errors.email ? 'border-red-500' : ''}`}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block font-semibold px-2 text-sm text-gray-700 mb-1">Contraseña</label>
                        <input
                            type="password"
                            className={`w-full border p-3 rounded-xl ${errors.contrasena ? 'border-red-500' : ''}`}
                            value={contrasena}
                            onChange={(e) => setContrasena(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block font-semibold text-sm px-2 text-gray-700 mb-1">Rol</label>
                        <select
                            className="w-full border p-3 rounded-xl"
                            value={idRol}
                            onChange={(e) => setIdRol(e.target.value)}
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
                <div className="text-center text-sm mt-6 text-green-700">
                    ¿Ya tienes una cuenta?
                    <button
                        onClick={() => navigate('/login')}
                        className="ml-1 underline font-semibold hover:text-green-900"
                    >
                        Inicia sesión aquí
                    </button>
                </div>

            </div>
        </div>
    );
}
