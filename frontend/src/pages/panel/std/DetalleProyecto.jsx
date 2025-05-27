import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useAuth } from '../../../context/AuthContext';
import ProyectoForm from '../../../components/proyectoForm';
import Modal from '../../../components/Modal';

export default function DetalleProyecto() {
  const { id } = useParams();
  const { usuario } = useAuth();
  const [proyecto, setProyecto] = useState(null);
  const [archivos, setArchivos] = useState([]);
  const [archivosSeleccionados, setArchivosSeleccionados] = useState([]);
  const [estudiantes, setEstudiantes] = useState([]);
  const [asignados, setAsignados] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [seleccionados, setSeleccionados] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);


  const [historial, setHistorial] = useState([]);
  const [mostrarHistorial, setMostrarHistorial] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:4000/api/proyectos/getProyectoExtendido/${id}`)
      .then((res) => res.json())
      .then(setProyecto)
      .catch(console.error);

    fetch(`http://localhost:4000/api/archivos/proyecto/${id}`)
      .then((res) => res.ok ? res.json() : [])
      .then(setArchivos)
      .catch(console.error);

    if (usuario?.idRol === 2 || usuario?.idRol === 3) {
      fetch('http://localhost:4000/api/estudiantes/getEstudiantes')
        .then(res => res.json())
        .then(setEstudiantes);

      fetch(`http://localhost:4000/api/proyectos/estudiantes/${id}`)
        .then(res => res.json())
        .then(setAsignados);
    }
  }, [id, usuario]);

  const handleArchivoChange = (e) => {
    setArchivosSeleccionados(Array.from(e.target.files));
  };

  const cargarHistorial = async () => {
    try {
      const res = await fetch(`http://localhost:4000/api/historial/${id}`);
      const data = await res.json();
      setHistorial(data);
      setMostrarHistorial(true);
    } catch (err) {
      console.error('Error al cargar historial:', err);
      Swal.fire('Error', 'No se pudo cargar el historial', 'error');
    }
  };
  

  const handleUpload = async () => {
    const formData = new FormData();
    archivosSeleccionados.forEach((archivo) => formData.append('archivos', archivo));
    formData.append('idProyecto', id);

    const res = await fetch('http://localhost:4000/api/archivos/upload', {
      method: 'POST',
      body: formData,
    });

    if (res.ok) {
      const data = await res.json();
      Swal.fire('Subido', 'Archivos subidos exitosamente', 'success');
      setArchivosSeleccionados([]);
      document.getElementById('inputArchivo').value = '';
      setArchivos(prev => [...prev, ...(data.archivos || [])]);
    } else {
      Swal.fire('Error', 'No se pudo subir el archivo', 'error');
    }
  };

  const eliminarArchivo = async (idArchivo) => {
    const confirm = await Swal.fire({
      title: '¿Eliminar archivo?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    });

    if (!confirm.isConfirmed) return;

    const res = await fetch(`http://localhost:4000/api/archivos/${idArchivo}`, {
      method: 'DELETE'
    });

    if (res.ok) {
      setArchivos((prev) => prev.filter((a) => a.id !== idArchivo));
      Swal.fire('Eliminado', 'Archivo eliminado correctamente', 'success');
    } else {
      Swal.fire('Error', 'No se pudo eliminar el archivo', 'error');
    }
  };

  const eliminarProyecto = async () => {
    const confirm = await Swal.fire({
      title: '¿Eliminar proyecto?',
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
      Swal.fire('Eliminado', 'Proyecto eliminado correctamente', 'success');
      window.history.back(); // Redirige al usuario a la página anterior
    } else {
      Swal.fire('Error', 'No se pudo eliminar el proyecto', 'error');
    }
  };

  const toggleSeleccion = (id) => {
    setSeleccionados(prev => prev.includes(id)
      ? prev.filter(e => e !== id)
      : [...prev, id]);
  };

  const asignarEstudiantes = async () => {
    if (seleccionados.length === 0) return;

    const res = await fetch(`http://localhost:4000/api/proyectos/estudiantes/${id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ estudiantes: seleccionados })
    });

    if (res.ok) {
      Swal.fire('Asignados', 'Estudiantes asignados correctamente', 'success');
      setSeleccionados([]);
      const nuevos = await fetch(`http://localhost:4000/api/proyectos/estudiantes/${id}`);
      setAsignados(await nuevos.json());
    } else {
      Swal.fire('Error', 'No se pudo asignar los estudiantes', 'error');
    }
  };

  const eliminarEstudiante = async (idUsuario) => {
    const confirm = await Swal.fire({
      title: '¿Eliminar estudiante?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    });

    if (!confirm.isConfirmed) return;

    const res = await fetch(`http://localhost:4000/api/proyectos/estudiantes/${id}/${idUsuario}`, {
      method: 'DELETE'
    });

    if (res.ok) {
      setAsignados(prev => prev.filter(e => e.idusuario !== idUsuario));
      Swal.fire('Eliminado', 'Estudiante eliminado', 'success');
    } else {
      Swal.fire('Error', 'No se pudo eliminar', 'error');
    }
  };

  const estudiantesFiltrados = estudiantes.filter(
    e =>
      !asignados.some(a => a.idusuario === e.idusuario) &&
      `${e.nombre} ${e.apellidos}`.toLowerCase().includes(busqueda.toLowerCase())
  );

  if (!proyecto) return <p className="p-4">Cargando proyecto...</p>;

  return (
    <div className="space-y-6">
      {/* Info general */}
      <div className="bg-white p-6 rounded-xl shadow space-y-2">
        <h2 className="text-3xl font-bold text-blue-800">{proyecto.nombre}</h2>
        <p className="text-gray-700">{proyecto.descripcion}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div><strong>Objetivos:</strong> <p>{proyecto.objetivos}</p></div>
          <div><strong>Cronograma:</strong> <p>{proyecto.cronograma}</p></div>
          <div><strong>Observaciones:</strong> <p>{proyecto.observaciones}</p></div>
          <div>
            <strong>Fechas:</strong>
            <p>{new Date(proyecto.fechainicio).toLocaleDateString()} - {new Date(proyecto.fechafin).toLocaleDateString()}</p>
          </div>
          <div><strong>Institución:</strong> <p>{proyecto.nombre_institucion}</p></div>
          <div><strong>Estado:</strong> <span className="text-blue-800">{proyecto.estado_actual}</span></div>
          <div><strong>Creador:</strong> <p>{proyecto.creador}</p></div>
        </div>

        <div className="flex gap-2 justify-end mt-4 flex-wrap">
          <a
            href={`http://localhost:4000/api/reportes/getReporte/${proyecto.idproyecto}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Ver reporte PDF
          </a>

          {(usuario?.idRol === 2 || usuario?.idRol === 3) && (
            <button
              className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
              onClick={() => setMostrarModal(true)}
            >
              Editar proyecto
            </button>
          )}

          {usuario?.idRol === 3 && (
            <>
              <button
                onClick={cargarHistorial}
                className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
              >
                Ver historial
              </button>
              <button
                onClick={eliminarProyecto}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Eliminar proyecto
              </button>
            </>
          )}
        </div>
      </div>

      {/* Archivos */}
      <div className="bg-white p-6 rounded-xl shadow space-y-4">
        <h3 className="text-lg font-semibold">Subir archivos</h3>
        <input id="inputArchivo" type="file" multiple onChange={handleArchivoChange} className="border rounded p-2 w-full" />
        <button onClick={handleUpload} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Subir
        </button>
        <ul className="mt-4 space-y-2">
          {archivos.map((a) => (
            <li key={a.id} className="text-sm text-gray-800 flex justify-between items-center border-b pb-2">
              <span>{a.nombre}</span>
              <div className="flex gap-2 text-xs">
                <span className="text-gray-500">{new Date(a.fechaSubida).toLocaleDateString()}</span>
                <button onClick={() => eliminarArchivo(a.id)} className="text-red-500 hover:underline">Eliminar</button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Estudiantes asignados */}
      {(usuario?.idRol === 2 || usuario?.idRol === 3) && (
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-lg font-bold mb-2">Estudiantes asignados</h3>
          <ul className="space-y-1">
            {asignados.map((e) => (
              <li key={e.idusuario} className="flex justify-between items-center text-sm">
                <span>{e.nombre} {e.apellidos}</span>
                <button onClick={() => eliminarEstudiante(e.idusuario)} className="text-red-500 text-xs hover:underline">
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Asignar estudiantes */}
      {(usuario?.idRol === 2 || usuario?.idRol === 3) && (
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-lg font-bold mb-2">Asignar estudiantes</h3>
          <input
            type="text"
            placeholder="Buscar estudiante"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="w-full p-2 border mb-3 rounded"
          />
          <div className="h-48 overflow-y-auto border p-2 rounded bg-gray-50">
            {estudiantesFiltrados.map((e) => (
              <label key={e.idusuario} className="block text-sm">
                <input
                  type="checkbox"
                  checked={seleccionados.includes(e.idusuario)}
                  onChange={() => toggleSeleccion(e.idusuario)}
                  className="mr-2"
                />
                {e.nombre} {e.apellidos}
              </label>
            ))}
          </div>
          <button
            onClick={asignarEstudiantes}
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Asignar seleccionados
          </button>
        </div>
      )}

{mostrarHistorial && (
  <Modal titulo="Historial de estados" onClose={() => setMostrarHistorial(false)}>
    <ul className="space-y-2 text-sm">
      {historial.map((h) => (
        <li key={h.idhistorialestado} className="border-b pb-2">
          <p><strong>Estado:</strong> {h.nombre_estado}</p>
          <p className="text-gray-600"><strong>Fecha:</strong> {new Date(h.fechacambio).toLocaleString()}</p>
        </li>
      ))}
    </ul>
  </Modal>
)}
      {mostrarModal && (
        <Modal titulo="Editar proyecto" onClose={() => setMostrarModal(false)}>
          <ProyectoForm
            usuario={usuario}
            defaultValues={proyecto}
            onCancel={() => setMostrarModal(false)}
            onSubmit={async (payload) => {
              const res = await fetch(`http://localhost:4000/api/proyectos/updateProyecto/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
              });
              if (res.ok) {
                Swal.fire('Actualizado', 'Proyecto editado exitosamente', 'success');
                setMostrarModal(false);
                const nueva = await fetch(`http://localhost:4000/api/proyectos/getProyectoExtendido/${id}`);
                setProyecto(await nueva.json());
              } else {
                Swal.fire('Error', 'No se pudo actualizar', 'error');
              }
            }}
          />
        </Modal>
      )}
      
    </div>
  );
}