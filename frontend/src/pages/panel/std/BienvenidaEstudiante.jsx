import { useAuth } from '../../../context/AuthContext';

export default function BienvenidaEstudiante() {
  const { usuario } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center h-full p-6 bg-gray-50 rounded-xl shadow-md text-center">
      <h1 className="text-3xl font-bold text-blue-800 mb-4">
        ¡Bienvenido, {usuario?.nombre || 'Estudiante'}!
      </h1>

      <p className="text-gray-700 text-lg max-w-2xl">
        Este es tu espacio exclusivo para interactuar con los proyectos escolares en los que estás participando.
      </p>

      <p className="text-gray-600 mt-3 max-w-2xl">
        Desde aquí puedes explorar tus <span className="font-medium text-blue-700">proyectos asignados</span>, subir
        reportes importantes, revisar los <span className="font-medium text-blue-700">archivos compartidos</span> por ti y tus docentes,
        y mantener tu perfil actualizado.
      </p>

      <p className="text-gray-600 mt-3 max-w-2xl">
        ¡Recuerda que tu participación activa hace la diferencia! Cada aporte cuenta para el éxito del proyecto.
        Navega por las secciones del menú para comenzar 🚀
      </p>

      <img
        src="https://universidadalnus.com/wp-content/uploads/2023/02/Universidad-Alnus-Que-es-la-administracion-de-proyectos.png"
        alt="Bienvenida"
        className="mt-6 w-52 h-auto rounded-full shadow"
      />
    </div>
  );
}
