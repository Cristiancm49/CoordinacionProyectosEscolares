import { useAuth } from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Swal from 'sweetalert2';
import Modal from '../../../components/Modal';
import ProyectoForm from '../../../components/proyectoForm';

export default function BienvenidaDocente() {
  const { usuario } = useAuth();
  const navigate = useNavigate();
  const [mostrarModal, setMostrarModal] = useState(false);

  const handleCrearProyecto = async (payload) => {
    try {
      const res = await fetch('http://localhost:4000/api/proyectos/createProyecto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Proyecto creado',
          text: 'El proyecto fue registrado exitosamente.'
        });
        setMostrarModal(false);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error al crear',
          text: 'No se pudo registrar el proyecto.'
        });
      }
    } catch (err) {
      console.error('Error creando proyecto:', err);
      Swal.fire({
        icon: 'error',
        title: 'Error del servidor',
        text: 'Ocurrió un error inesperado.'
      });
    }
  };

  return (
    <div className="relative bg-white shadow-md rounded-xl p-4 sm:p-6 lg:p-8 flex flex-col h-full justify-center items-center text-center space-y-6 max-w-screen-lg mx-auto">
      <h1 className="text-3xl sm:text-4xl font-bold text-blue-900">
        ¡Bienvenid@, {usuario?.nombre || 'Docente'}!
      </h1>

      <p className="text-gray-700 max-w-2xl text-base sm:text-lg">
        Este es tu espacio exclusivo para planificar, crear y monitorear los proyectos académicos que lideras.
        Aquí puedes gestionar equipos, organizar cronogramas y realizar seguimiento a los avances de cada estudiante.
      </p>

      <p className="text-gray-600 max-w-xl text-sm sm:text-base">
        Tienes a tu disposición todas las herramientas necesarias para llevar tus ideas a la práctica,
        fomentar el trabajo colaborativo y transformar la experiencia de aprendizaje en tu institución.
        ¡Comienza a construir proyectos significativos hoy mismo!
      </p>

      <div className="flex flex-col sm:flex-row justify-center gap-4 mt-4 w-full sm:w-auto">
        <button
          onClick={() => navigate('/docente/mis-proyectos')}
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
        className="w-36 sm:w-48 h-auto mt-6"
      />

      {mostrarModal && (
        <Modal titulo="Crear nuevo proyecto" onClose={() => setMostrarModal(false)}>
          <ProyectoForm
            usuario={usuario}
            onCancel={() => setMostrarModal(false)}
            onSubmit={handleCrearProyecto}
          />
        </Modal>
      )}
    </div>
  );
}
