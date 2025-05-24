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
  const [proyectoEditando, setProyectoEditando] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:4000/api/proyectos/getProyectoExtendido/${id}`)
      .then((res) => res.json())
      .then((data) => setProyecto(data))
      .catch(console.error);

    fetch(`http://localhost:4000/api/archivos/proyecto/${id}`)
      .then((res) => res.ok ? res.json() : [])
      .then((data) => setArchivos(data))
      .catch(console.error);

    if (usuario?.idRol === 2) {
      fetch('http://localhost:4000/api/estudiantes/getEstudiantes')
        .then((res) => res.json())
        .then((data) => setEstudiantes(data))
        .catch(console.error);

      fetch(`http://localhost:4000/api/proyectos/estudiantes/${id}`)
        .then((res) => res.json())
        .then((data) => setAsignados(data))
        .catch(console.error);
    }
  }, [id, usuario]);

  const handleArchivoChange = (e) => {
    setArchivosSeleccionados(Array.from(e.target.files));
  };

  const handleUpload = async () => {
    const formData = new FormData();
    archivosSeleccionados.forEach((archivo) => formData.append('archivos', archivo));
    formData.append('idProyecto', id);

    const res = await fetch('http://localhost:4000/api/archivos/upload', {
      method: 'POST',
      body: formData
    });

    if (res.ok) {
      Swal.fire('Subido', 'Archivos subidos exitosamente', 'success');
      setArchivosSeleccionados([]);
      document.getElementById('inputArchivo').value = '';
      const nuevos = await res.json();
      setArchivos((prev) => [...prev, ...(nuevos.archivos || [])]);
    } else {
      Swal.fire('Error', 'No se pudo subir el archivo', 'error');
    }
  };

  const toggleSeleccion = (id) => {
    setSeleccionados((prev) =>
      prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]
    );
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
      const nuevosAsignados = await fetch(`http://localhost:4000/api/proyectos/estudiantes/${id}`);
      setAsignados(await nuevosAsignados.json());
    } else {
      Swal.fire('Error', 'No se pudo asignar los estudiantes', 'error');
    }
  };

  const handleActualizarProyecto = async (payload) => {
    try {
      const res = await fetch(`http://localhost:4000/api/proyectos/updateProyecto/${proyecto.idproyecto}`, {
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
              idProyecto: proyecto.idproyecto,
              idEstadoProyecto: parseInt(payload.idEstadoProyecto)
            })
          });
        }

        Swal.fire('Actualizado', 'Proyecto editado correctamente', 'success');
        setMostrarModal(false);
        const updated = await fetch(`http://localhost:4000/api/proyectos/getProyectoExtendido/${id}`);
        const data = await updated.json();
        setProyecto(data);
      } else {
        Swal.fire('Error', 'No se pudo editar el proyecto', 'error');
      }
    } catch (err) {
      console.error('Error editando proyecto:', err);
      Swal.fire('Error', 'Error de servidor', 'error');
    }
  };

  const estudiantesFiltrados = estudiantes.filter(
    (e) =>
      !asignados.some((a) => a.idusuario === e.idusuario) &&
      `${e.nombre} ${e.apellidos}`.toLowerCase().includes(busqueda.toLowerCase())
  );

  if (!proyecto) return <p className="p-4">Cargando...</p>;

  return (
    <div className="space-y-6">
      {/* Info del proyecto */}
      <div className="bg-white p-6 rounded-xl shadow space-y-2">
        <h2 className="text-3xl font-bold text-blue-800">{proyecto.nombre}</h2>
        <p className="text-gray-700">{proyecto.descripcion}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div><strong>Objetivos:</strong> {proyecto.objetivos}</div>
          <div><strong>Cronograma:</strong> {proyecto.cronograma}</div>
          <div><strong>Observaciones:</strong> {proyecto.observaciones}</div>
          <div><strong>Fechas:</strong> {new Date(proyecto.fechainicio).toLocaleDateString()} → {new Date(proyecto.fechafin).toLocaleDateString()}</div>
          <div><strong>Creación:</strong> {new Date(proyecto.fechacreacion).toLocaleDateString()}</div>
          <div><strong>Institución:</strong> {proyecto.nombre_institucion}</div>
          <div><strong>Creador:</strong> {proyecto.creador}</div>
          <div>
            <strong>Estado:</strong>{' '}
            <span className="inline-block bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full font-semibold">
              {proyecto.estado_actual}
            </span>
          </div>
        </div>

        {/* Botones PDF y Editar */}
        <div className="flex flex-wrap justify-end gap-4 mt-4">
          <a
            href={`http://localhost:4000/api/reportes/getReporte/${proyecto.idproyecto}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Ver reporte PDF
          </a>

          {usuario?.idRol === 2 && (
            <button
              onClick={() => {
                setProyectoEditando(proyecto);
                setMostrarModal(true);
              }}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
            >
              Editar proyecto
            </button>
          )}
        </div>
      </div>

      {/* Subida de archivos */}
      <div className="bg-white p-6 rounded-xl shadow space-y-4">
        <h3 className="text-lg font-semibold">Agregar nuevo reporte</h3>
        <input
          id="inputArchivo"
          type="file"
          multiple
          onChange={handleArchivoChange}
          className="border rounded p-2 w-full"
        />
        {archivosSeleccionados.length > 0 && (
          <ul className="text-sm text-gray-700 list-disc pl-5 mt-2">
            {archivosSeleccionados.map((a, i) => (
              <li key={i}>{a.name}</li>
            ))}
          </ul>
        )}
        <button
          onClick={handleUpload}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Subir archivos
        </button>
      </div>

      {/* Lista de aportes */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="text-lg font-semibold mb-4">Aportes del proyecto</h3>
        {archivos.length === 0 ? (
          <p className="text-sm text-gray-500">No hay archivos subidos.</p>
        ) : (
          <ul className="space-y-2">
            {archivos.map((a) => (
              <li key={a.id} className="flex justify-between items-center border-b pb-2">
                <div>
                  <p className="font-medium text-gray-800">{a.nombre}</p>
                  <p className="text-xs text-gray-500">
                    {a.fechaSubida ? new Date(a.fechaSubida).toLocaleDateString() : 'Fecha desconocida'}
                  </p>
                </div>
                <a
                  href={`http://localhost:4000/api/archivos/${a.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline text-sm"
                >
                  Descargar
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Lista estudiantes ya asignados */}
      {usuario?.idRol === 2 && (
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-lg font-bold mb-2">Estudiantes ya asignados</h3>
          {asignados.length === 0 ? (
            <p className="text-sm text-gray-500">Ningún estudiante asignado aún.</p>
          ) : (
            <ul className="list-disc pl-6 space-y-1">
              {asignados.map((e) => (
                <li key={e.idusuario} className="text-sm">{e.nombre} {e.apellidos}</li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* Asignar estudiantes */}
      {usuario?.idRol === 2 && (
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
            Asignar seleccionados.
          </button>
        </div>
      )}

      {/* Modal edición */}
      {mostrarModal && proyectoEditando && (
        <Modal titulo="Editar proyecto" onClose={() => setMostrarModal(false)}>
          <ProyectoForm
            usuario={usuario}
            defaultValues={{
              ...proyectoEditando,
              idInstitucion: String(proyectoEditando.idinstitucion),
              fechaInicio: proyectoEditando.fechainicio?.split('T')[0],
              fechaFin: proyectoEditando.fechafin?.split('T')[0]
            }}
            onCancel={() => {
              setMostrarModal(false);
              setProyectoEditando(null);
            }}
            onSubmit={handleActualizarProyecto}
          />
        </Modal>
      )}
    </div>
  );
}
