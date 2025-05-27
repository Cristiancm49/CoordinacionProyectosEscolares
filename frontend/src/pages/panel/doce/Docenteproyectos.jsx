import { useEffect, useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import Swal from 'sweetalert2';
import ProyectoForm from '../../../components/proyectoForm';
import ProyectoCard from '../../../components/ProyectCard';
import Modal from '../../../components/Modal';
import { useNavigate } from 'react-router-dom';

export default function GestionProyectos() {
  const { usuario } = useAuth();
  const navigate = useNavigate();
  const [proyectos, setProyectos] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [proyectoEditando, setProyectoEditando] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [modoCreacion, setModoCreacion] = useState(false);

  const cargarProyectos = async () => {
    try {
      const res = await fetch(`http://localhost:4000/api/proyectos/getProyectos/usuario/${usuario.id}`);
      if (!res.ok) {
        setProyectos([]);
        return;
      }
      const data = await res.json();
      setProyectos(data);
    } catch (err) {
      console.error('Error al cargar proyectos:', err);
      setProyectos([]); 
    }
  };

  useEffect(() => {
    cargarProyectos();
  }, [usuario.id]);

  const proyectosFiltrados = proyectos.filter((p) =>
    (p.nombre || p.nombre_proyecto || '').toLowerCase().includes(busqueda.toLowerCase())
  );

  const handleEditar = (proyecto) => {
    setProyectoEditando(proyecto);
    setModoCreacion(false);
    setMostrarModal(true);
  };

  const handleActualizarProyecto = async (payload) => {
    try {
      const res = await fetch(`http://localhost:4000/api/proyectos/updateProyecto/${proyectoEditando.idproyecto}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        if (payload.idEstadoProyecto) {
          await fetch('http://localhost:4000/api/proyectos/actualizarEstadoProyecto', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              idProyecto: proyectoEditando.idproyecto,
              idEstadoProyecto: parseInt(payload.idEstadoProyecto)
            })
          });
        }

        Swal.fire({
          icon: 'success',
          title: 'Proyecto actualizado',
          text: 'Los datos del proyecto se actualizaron correctamente.'
        });

        setMostrarModal(false);
        setProyectoEditando(null);
        await cargarProyectos();
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error al actualizar',
          text: 'No se pudo actualizar el proyecto.'
        });
      }
    } catch (err) {
      console.error('Error actualizando proyecto:', err);
      Swal.fire({
        icon: 'error',
        title: 'Error del servidor',
        text: 'Ocurrió un error inesperado.'
      });
    }
  };

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
        await cargarProyectos();
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
    <div className="p-6 max-w-screen-lg mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-blue-800">Gestión de mis proyectos</h2>
        <button
          onClick={() => {
            setProyectoEditando(null);
            setModoCreacion(true);
            setMostrarModal(true);
          }}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow"
        >
          Crear nuevo proyecto
        </button>
      </div>

      <input
        type="text"
        placeholder="Buscar por nombre..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        className="mb-4 p-2 border rounded w-full"
      />

      {proyectosFiltrados.length === 0 ? (
        <p className="text-gray-500">No se encontraron proyectos.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {proyectosFiltrados.map((proyecto) => (
            <ProyectoCard
              key={proyecto.idproyecto}
              proyecto={proyecto}
              onVerMas={() => navigate(`/docente/mis-proyectos/proyecto/${proyecto.idproyecto}`)}
              onEditar={usuario.idRol === 2 ? handleEditar : null}
            />
          ))}
        </div>
      )}

      {mostrarModal && (
        <Modal
          titulo={modoCreacion ? 'Crear nuevo proyecto' : 'Editar proyecto'}
          onClose={() => {
            setMostrarModal(false);
            setProyectoEditando(null);
          }}
        >
          <ProyectoForm
            usuario={usuario}
            defaultValues={
                proyectoEditando
                  ? {
                      ...proyectoEditando,
                      idInstitucion: String(proyectoEditando.idinstitucion),
                      fechaInicio: proyectoEditando.fechainicio?.split('T')[0] || '',
                      fechaFin: proyectoEditando.fechafin?.split('T')[0] || ''
                    }
                  : {}
              }
            onCancel={() => {
              setMostrarModal(false);
              setProyectoEditando(null);
            }}
            onSubmit={modoCreacion ? handleCrearProyecto : handleActualizarProyecto}
          />
        </Modal>
      )}
    </div>
  );
}
