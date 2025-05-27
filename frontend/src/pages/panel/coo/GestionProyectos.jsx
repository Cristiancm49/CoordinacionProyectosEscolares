import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import ProyectoCard from '../../../components/ProyectCard';
import Modal from '../../../components/Modal';
import ProyectoForm from '../../../components/proyectoForm';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';

export default function GestionProyectosCoordinador() {
  const { usuario } = useAuth();
  const navigate = useNavigate();
  const [proyectos, setProyectos] = useState([]);
  const [instituciones, setInstituciones] = useState([]);
  const [creadores, setCreadores] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [filtroInstitucion, setFiltroInstitucion] = useState('');
  const [filtroCreador, setFiltroCreador] = useState('');
  const [mostrarModal, setMostrarModal] = useState(false);
  const [editando, setEditando] = useState(null);

  const cargarProyectos = async () => {
    const res = await fetch('http://localhost:4000/api/proyectos/getProyectos');
    const data = await res.json();
    setProyectos(data);

    // Extraer instituciones únicas
    const insts = [...new Set(data.map(p => ({
      id: p.idinstitucion,
      nombre: p.nombre_institucion
    })))];
    setInstituciones(insts);

    // Extraer creadores únicos
    const cread = [...new Set(data.map(p => ({
      id: p.idusuariocreador,
      nombre: p.creador
    })))];
    setCreadores(cread);
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

  const handleEliminar = async (id) => {
    const confirm = await Swal.fire({
      title: '¿Eliminar proyecto?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    });

    if (!confirm.isConfirmed) return;

    const res = await fetch(`http://localhost:4000/api/proyectos/deleteProyecto/${id}`, {
      method: 'DELETE'
    });

    if (res.ok) {
      Swal.fire('Eliminado', 'Proyecto eliminado correctamente', 'success');
      await cargarProyectos();
    } else {
      Swal.fire('Error', 'No se pudo eliminar el proyecto', 'error');
    }
  };

  const filtrados = proyectos.filter((p) => {
    const coincideNombre = (p.nombre || p.nombre_proyecto || '').toLowerCase().includes(busqueda.toLowerCase());
    const coincideInst = filtroInstitucion ? p.idinstitucion === parseInt(filtroInstitucion) : true;
    const coincideCreador = filtroCreador ? p.idusuariocreador === parseInt(filtroCreador) : true;
    return coincideNombre && coincideInst && coincideCreador;
  });

  return (
    <div className="p-6 max-w-screen-xl mx-auto">
      <h2 className="text-2xl font-bold text-blue-800 mb-4">Gestión de Proyectos</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <input
          type="text"
          placeholder="Buscar por nombre..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="p-2 border rounded w-full"
        />

        <select
          value={filtroInstitucion}
          onChange={(e) => setFiltroInstitucion(e.target.value)}
          className="p-2 border rounded w-full"
        >
          <option value="">Todas las instituciones</option>
          {instituciones.map((i) => (
            <option key={i.id} value={i.id}>{i.nombre}</option>
          ))}
        </select>

        <select
          value={filtroCreador}
          onChange={(e) => setFiltroCreador(e.target.value)}
          className="p-2 border rounded w-full"
        >
          <option value="">Todos los docentes</option>
          {creadores.map((c) => (
            <option key={c.id} value={c.id}>{c.nombre}</option>
          ))}
        </select>
      </div>

      {filtrados.length === 0 ? (
        <p className="text-gray-500">No se encontraron proyectos.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filtrados.map((proyecto) => (
            <ProyectoCard
              key={proyecto.idproyecto}
              proyecto={proyecto}
              usuario={usuario}
              onVerMas={() => navigate(`/coordinador/mis-proyectos/proyecto/${proyecto.idproyecto}`)}
              onEditar={(p) => {
                setEditando(p);
                setMostrarModal(true);
              }}
              onEliminar={handleEliminar}
            />
          ))}
        </div>
      )}

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
    </div>
  );
}
