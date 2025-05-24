import { useParams } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import Swal from 'sweetalert2';
import { getProyectosAsignados } from '../../../api/estudianteApi';
import { useAuth } from '../../../context/AuthContext';

export default function DetalleProyecto() {
    const { id } = useParams();
    const { usuario } = useAuth();
    const [proyecto, setProyecto] = useState(null);
    const [infoExtendida, setInfoExtendida] = useState(null);
    const [archivos, setArchivos] = useState([]);
    const [archivosSeleccionados, setArchivosSeleccionados] = useState([]);


    const fetchArchivos = async () => {
        const res = await fetch(`http://localhost:4000/api/archivos/proyecto/${id}`);
        const data = await res.json();
        setArchivos(data);
    };

    useEffect(() => {
        const fetchProyecto = async () => {
            const res = await fetch(`http://localhost:4000/api/proyectos/getProyecto/${id}`);
            const data = await res.json();
            setProyecto(data);
        };



        const fetchExtendida = async () => {
            if (!usuario?.id) return;
            try {
                const proyectos = await getProyectosAsignados(usuario.id);
                const actual = proyectos.find(p => p.idproyecto === parseInt(id));
                setInfoExtendida(actual);
            } catch (error) {
                console.error('Error al obtener info extendida:', error);
            }
        };

        fetchProyecto();
        fetchArchivos();
        fetchExtendida();
    }, [id, usuario]);

    const handleArchivoChange = (e) => {
        setArchivosSeleccionados(Array.from(e.target.files));
    };

    const handleUpload = async () => {
        if (archivosSeleccionados.length === 0) return;

        const formData = new FormData();
        archivosSeleccionados.forEach((archivo) => {
            formData.append('archivos', archivo);
        });
        formData.append('idProyecto', id);

        try {
            const res = await fetch('http://localhost:4000/api/archivos/upload', {
                method: 'POST',
                body: formData
            });

            if (res.ok) {
                const data = await res.json();
                Swal.fire({
                    icon: 'success',
                    title: 'Archivos subidos',
                    text: 'Tus archivos se subieron correctamente.'
                });
                setArchivosSeleccionados([]);
                document.getElementById('inputArchivo').value = '';
                await fetchArchivos();
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error al subir',
                    text: 'No se pudo subir el archivo.'
                });
            }
        } catch (err) {
            console.error('Error al subir archivos:', err);
            Swal.fire({
                icon: 'error',
                title: 'Error de servidor',
                text: 'Ocurrió un problema al conectar con el servidor.'
            });
        }
    };

    const handleEliminarArchivo = async (idArchivo) => {
        const confirm = await Swal.fire({
            title: '¿Estás seguro?',
            text: 'Esta acción eliminará el archivo permanentemente.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        });

        if (!confirm.isConfirmed) return;

        try {
            const res = await fetch(`http://localhost:4000/api/archivos/${idArchivo}`, {
                method: 'DELETE'
            });

            if (res.ok) {
                Swal.fire({
                    icon: 'success',
                    title: 'Archivo eliminado',
                    text: 'El archivo ha sido eliminado correctamente.'
                });
                setArchivos((prev) => prev.filter((a) => (a._id || a.id) !== idArchivo));
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error al eliminar',
                    text: 'No se pudo eliminar el archivo.'
                });
            }
        } catch (err) {
            console.error('Error eliminando archivo:', err);
            Swal.fire({
                icon: 'error',
                title: 'Error del servidor',
                text: 'Ocurrió un error inesperado.'
            });
        }
    };

    if (!proyecto) return <p className="p-4">Cargando proyecto...</p>;

    return (
        <div className="space-y-6">
            {/* Info del proyecto */}
            <div className="bg-white p-6 rounded-xl shadow space-y-2">
                <h2 className="text-3xl font-bold text-blue-800">{proyecto.nombre}</h2>
                <p className="text-gray-700">{proyecto.descripcion}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                        <h4 className="font-semibold text-gray-800">Objetivos</h4>
                        <p className="text-gray-700">{proyecto.objetivos}</p>
                    </div>
                    <div>
                        <h4 className="font-semibold text-gray-800">Cronograma</h4>
                        <p className="text-gray-700 whitespace-pre-line">{proyecto.cronograma}</p>
                    </div>
                    <div>
                        <h4 className="font-semibold text-gray-800">Observaciones</h4>
                        <p className="text-gray-700">{proyecto.observaciones}</p>
                    </div>
                    <div>
                        <h4 className="font-semibold text-gray-800">Fechas</h4>
                        <p className="text-gray-700">
                            Inicio: {new Date(proyecto.fechainicio).toLocaleDateString()} <br />
                            Fin: {new Date(proyecto.fechafin).toLocaleDateString()}
                        </p>
                    </div>
                    <div>
                        <h4 className="font-semibold text-gray-800">Fecha de creación</h4>
                        <p className="text-gray-700">
                            {new Date(proyecto.fechacreacion).toLocaleDateString()}
                        </p>
                    </div>

                    {/* Info extendida */}
                    {infoExtendida && (
                        <>
                            <div>
                                <h4 className="font-semibold text-gray-800">Institución</h4>
                                <p className="text-gray-700">{infoExtendida.nombre_institucion}</p>
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-800">Creador</h4>
                                <p className="text-gray-700">{infoExtendida.creador}</p>
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-800">Estado actual</h4>
                                <span className="inline-block bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full font-semibold">
                                    {infoExtendida.estado_actual}
                                </span>
                            </div>
                        </>
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
                {proyecto?.idproyecto && (
                    <div className="bg-white p-6 rounded-xl shadow flex justify-end">
                        <a
                            href={`http://localhost:4000/api/reportes/getReporte/${proyecto.idproyecto}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                        >
                            Ver reporte PDF
                        </a>
                    </div>
                )}
            </div>

            {/* Lista de archivos */}
            <div className="bg-white p-6 rounded-xl shadow">
                <h3 className="text-lg font-semibold mb-4">Mis aportes</h3>
                {archivos.length === 0 ? (
                    <p className="text-sm text-gray-500">Aún no has subido documentos.</p>
                ) : (
                    <ul className="space-y-2">
                        {archivos.map((a) => (
                            <li key={a._id || a.id} className="flex justify-between items-center border-b pb-2">
                                <div>
                                    <p className="font-medium text-gray-800">{a.nombre || a.filename}</p>
                                    <p className="text-xs text-gray-500">
                                        {a.fechaSubida ? new Date(a.fechaSubida).toLocaleDateString() : 'Fecha desconocida'}
                                    </p>
                                </div>
                                <div className="flex gap-2">
                                    <a
                                        href={`http://localhost:4000/api/archivos/${a._id || a.id}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 hover:underline text-sm"
                                    >
                                        Descargar
                                    </a>
                                    <button
                                        onClick={() => handleEliminarArchivo(a._id || a.id)}
                                        className="text-red-500 hover:underline text-sm"
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
