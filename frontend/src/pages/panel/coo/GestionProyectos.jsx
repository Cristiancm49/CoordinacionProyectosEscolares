import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import ProyectoCard from '../../../components/ProyectCard';
import Modal from '../../../components/Modal';
import ProyectoForm from '../../../components/proyectoForm';
import CrearProyectoModal from '../../../components/CrearProyectoModal'; // 👈 asegúrate de importar esto
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';

export default function GestionProyectosCoordinador() {
  const { usuario } = useAuth();
  const navigate = useNavigate();
  const [proyectos, setProyectos] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mostrarCrear, setMostrarCrear] = useState(false);
  const [editando, setEditando] = useState(null);

  const cargarProyectos = async () => {
    try {
      const res = await fetch('http://localhost:4000/api/proyectos/getProyectos');
      const data = await res.json();
      setProyectos(data);
    } catch (err) {
      console.error('Error al cargar proyectos:', err);
    }
  };

  useEffect(() => {
    cargarProyectos();
  }, []);

  const handleActualizar = async (payload) => {
    const res = await fetch(`http://localhost:4000/api/proyectos/updateProyecto/${editando.idproyecto}`, {
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
            idProyecto: editando.idproyecto,
            idEstadoProyecto: parseInt(payload.idEstadoProyecto)
          })
        });
      }

      Swal.fire('Actualizado', 'Proyecto actualizado correctamente', 'success');
      setMostrarModal(false);
      setEditando(null);
      await cargarProyectos();
    } else {
      Swal.fire('Error', 'No se pudo actualizar el proyecto', 'error');
    }
  };

  const handleEliminarProyecto = async (id) => {
    const confirm = await Swal.fire({
      title: '¿Eliminar proyecto?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    });

    if (!confirm.isConfirmed) return;

    const res = await fetch(`http://localhost:4000/api/proyectos/deleteProyecto/${id}`, {
      method: 'DELETE'
    });

    if (res.ok) {
      Swal.fire('Eliminado', 'Proyecto eliminado correctamente.', 'success');
      await cargarProyectos();
    } else {
      Swal.fire('Error', 'No se pudo eliminar el proyecto.', 'error');
    }
  };

  const proyectosFiltrados = proyectos.filter((p) =>
    (p.nombre || p.nombre_proyecto || '').toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="p-6 max-w-screen-xl mx-auto">
      <h2 className="text-2xl font-bold text-blue-800 mb-4">Gestión de Proyectos</h2>

      <div className="flex justify-between mb-4 flex-wrap gap-4">
        <input
          type="text"
          placeholder="Buscar por nombre..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="p-2 border rounded w-full md:w-1/2"
        />

        <button
          onClick={() => setMostrarCrear(true)}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow"
        >
          Crear nuevo proyecto
        </button>
      </div>

      {proyectosFiltrados.length === 0 ? (
        <p className="text-gray-500">No se encontraron proyectos.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {proyectosFiltrados.map((proyecto) => (
            <ProyectoCard
              key={proyecto.idproyecto}
              proyecto={proyecto}
              usuario={usuario}
              onVerMas={() => navigate(`/coordinador/mis-proyectos/proyecto/${proyecto.idproyecto}`)}
              onEditar={(p) => {
                setEditando(p);
                setMostrarModal(true);
              }}
              onEliminar={handleEliminarProyecto}
            />
          ))}
        </div>
      )}

      {/* Modal editar */}
      {mostrarModal && editando && (
        <Modal
          titulo="Editar Proyecto"
          onClose={() => {
            setMostrarModal(false);
            setEditando(null);
          }}
        >
          <ProyectoForm
            usuario={usuario}
            defaultValues={{
              ...editando,
              idInstitucion: String(editando.idinstitucion),
              fechaInicio: editando.fechainicio?.split('T')[0],
              fechaFin: editando.fechafin?.split('T')[0]
            }}
            onSubmit={handleActualizar}
            onCancel={() => {
              setMostrarModal(false);
              setEditando(null);
            }}
          />
        </Modal>
      )}

      {/* Modal crear */}
      {mostrarCrear && (
        <Modal
          titulo="Crear nuevo proyecto"
          onClose={() => setMostrarCrear(false)}
        >
          <CrearProyectoModal
            onClose={() => setMostrarCrear(false)}
            onSuccess={async () => {
              await cargarProyectos(); // 🔁 se actualiza lista
              setMostrarCrear(false); // ✅ se cierra el modal después de actualizar
            }}
          />
        </Modal>
      )}
    </div>
  );
}
