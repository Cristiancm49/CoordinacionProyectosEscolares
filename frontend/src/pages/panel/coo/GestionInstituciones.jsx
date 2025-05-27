import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import Modal from '../../../components/Modal';
import InstitucionCard from '../../../components/institucionCard';
import FormularioInstitucion from '../../../components/FormularioInstitucion';

export default function GestionInstituciones() {
  const [instituciones, setInstituciones] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [mostrarModal, setMostrarModal] = useState(false);
  const [editando, setEditando] = useState(null);

  const cargarInstituciones = async () => {
    try {
      const res = await fetch('http://localhost:4000/api/instituciones/getInstituciones');
      const data = await res.json();
      setInstituciones(data);
    } catch (error) {
      console.error('Error al cargar instituciones:', error);
      Swal.fire('Error', 'No se pudo cargar la lista de instituciones', 'error');
    }
  };

  useEffect(() => {
    cargarInstituciones();
  }, []);

  const filtradas = instituciones.filter((i) =>
    i.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  const handleEliminar = async (id) => {
    const confirm = await Swal.fire({
      title: '¿Eliminar institución?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    });

    if (!confirm.isConfirmed) return;

    try {
      const res = await fetch(`http://localhost:4000/api/instituciones/deleteInstitucion/${id}`, {
        method: 'DELETE'
      });

      if (res.ok) {
        await cargarInstituciones();
        Swal.fire('Eliminada', 'La institución ha sido eliminada correctamente', 'success');
      } else {
        throw new Error();
      }
    } catch (error) {
      console.error('Error al eliminar institución:', error);
      Swal.fire('Error', 'No se pudo eliminar la institución', 'error');
    }
  };

  const handleGuardar = async (payload) => {
    const url = editando
      ? `http://localhost:4000/api/instituciones/updateInstitucion/${editando.idinstitucion}`
      : 'http://localhost:4000/api/instituciones/createInstitucion';

    const method = editando ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        await cargarInstituciones();
        Swal.fire(
          editando ? 'Actualizada' : 'Creada',
          `La institución ha sido ${editando ? 'actualizada' : 'creada'} correctamente.`,
          'success'
        );
        setMostrarModal(false);
        setEditando(null);
      } else {
        throw new Error();
      }
    } catch (error) {
      console.error('Error al guardar institución:', error);
      Swal.fire('Error', 'No se pudo guardar la institución', 'error');
    }
  };

  return (
    <div className="p-6 max-w-screen-lg mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-blue-800">Gestión de Instituciones</h2>
        <button
          onClick={() => {
            setEditando(null);
            setMostrarModal(true);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Crear Institución
        </button>
      </div>

      <input
        type="text"
        placeholder="Buscar por nombre..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        className="mb-4 p-2 border rounded w-full"
      />

      <div className="grid gap-4 md:grid-cols-2">
        {filtradas.map((inst) => (
          <InstitucionCard
            key={inst.idinstitucion}
            institucion={inst}
            onEditar={() => {
              setEditando(inst);
              setMostrarModal(true);
            }}
            onEliminar={() => handleEliminar(inst.idinstitucion)}
          />
        ))}
      </div>

      {mostrarModal && (
        <Modal
          titulo={editando ? 'Editar Institución' : 'Crear nueva Institución'}
          onClose={() => {
            setMostrarModal(false);
            setEditando(null);
          }}
        >
          <FormularioInstitucion
            defaultValues={editando}
            onSubmit={handleGuardar}
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
