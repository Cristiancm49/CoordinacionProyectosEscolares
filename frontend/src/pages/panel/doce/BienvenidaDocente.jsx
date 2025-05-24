import { useAuth } from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function BienvenidaDocente() {
  const { usuario } = useAuth();
  const navigate = useNavigate();
  const [mostrarModal, setMostrarModal] = useState(false);

  return (
    <div className="relative bg-white shadow-md rounded-xl p-8 flex flex-col h-full justify-center items-center text-center space-y-6">
      <h1 className="text-4xl font-bold text-blue-900">
        ¡Bienvenid@, {usuario?.nombre || 'Docente'}!
      </h1>

      <p className="text-gray-700 max-w-2xl text-lg">
        Este es tu espacio exclusivo para planificar, crear y monitorear los proyectos académicos que lideras.
        Aquí puedes gestionar equipos, organizar cronogramas y realizar seguimiento a los avances de cada estudiante.
      </p>

      <p className="text-gray-600 max-w-xl">
        Tienes a tu disposición todas las herramientas necesarias para llevar tus ideas a la práctica,
        fomentar el trabajo colaborativo y transformar la experiencia de aprendizaje en tu institución.
        ¡Comienza a construir proyectos significativos hoy mismo!
      </p>

      <div className="flex flex-wrap justify-center gap-4 mt-4">
        <button
          onClick={() => navigate('/docente/proyectos')}
          className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-lg transition shadow"
        >
          Ver mis proyectos
        </button>
        <button
          onClick={() => setMostrarModal(true)}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition shadow"
        >
          Crear nuevo proyecto
        </button>
      </div>

      <img
        src="https://cdn-icons-png.flaticon.com/512/3405/3405806.png"
        alt="Docente gestionando"
        className="w-48 h-auto mt-6"
      />

      {mostrarModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg space-y-4 relative">
            <button
              onClick={() => setMostrarModal(false)}
              className="absolute top-2 right-3 text-gray-500 hover:text-red-600 text-xl"
            >
              ×
            </button>
            <h2 className="text-xl font-bold text-blue-800 mb-2">Crear nuevo proyecto</h2>
            <form className="space-y-3">
              <input
                type="text"
                placeholder="Nombre del proyecto"
                className="w-full p-2 border rounded"
              />
              <textarea
                placeholder="Descripción"
                className="w-full p-2 border rounded"
              ></textarea>
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
              >
                Crear
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
