import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

export default function CrearProyectoModal({ onClose, onSuccess }) {
  const [instituciones, setInstituciones] = useState([]);
  const [docentes, setDocentes] = useState([]);
  const [filtroDocente, setFiltroDocente] = useState('');
  const [form, setForm] = useState({
    nombre: '',
    descripcion: '',
    objetivos: '',
    cronograma: '',
    observaciones: '',
    fechaInicio: '',
    fechaFin: '',
    idInstitucion: '',
    idUsuarioCreador: ''
  });

  useEffect(() => {
    fetch('http://localhost:4000/api/instituciones/getInstituciones')
      .then(res => res.json())
      .then(setInstituciones)
      .catch(console.error);
  
   
    fetch('http://localhost:4000/api/proyectos/getDocentes')
      .then(res => res.json())
      .then(setDocentes)
      .catch(console.error);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch('http://localhost:4000/api/proyectos/createProyecto', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });

    if (res.ok) {
      Swal.fire('Éxito', 'Proyecto creado correctamente', 'success');
      onSuccess();
    } else {
      Swal.fire('Error', 'No se pudo crear el proyecto', 'error');
    }
  };

  const docentesFiltrados = docentes.filter(d =>
    `${d.nombre} ${d.apellidos}`.toLowerCase().includes(filtroDocente.toLowerCase())
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-h-[80vh] overflow-y-auto p-2">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          name="nombre"
          type="text"
          placeholder="Nombre del proyecto"
          value={form.nombre}
          onChange={handleChange}
          required
          className="border p-2 rounded w-full"
        />
        <input
          name="descripcion"
          type="text"
          placeholder="Descripción"
          value={form.descripcion}
          onChange={handleChange}
          required
          className="border p-2 rounded w-full"
        />
        <input
          name="objetivos"
          type="text"
          placeholder="Objetivos"
          value={form.objetivos}
          onChange={handleChange}
          required
          className="border p-2 rounded w-full"
        />
        <input
          name="cronograma"
          type="text"
          placeholder="Cronograma"
          value={form.cronograma}
          onChange={handleChange}
          required
          className="border p-2 rounded w-full"
        />
        <input
          name="observaciones"
          type="text"
          placeholder="Observaciones"
          value={form.observaciones}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
        <input
          name="fechaInicio"
          type="date"
          value={form.fechaInicio}
          onChange={handleChange}
          required
          className="border p-2 rounded w-full"
        />
        <input
          name="fechaFin"
          type="date"
          value={form.fechaFin}
          onChange={handleChange}
          required
          className="border p-2 rounded w-full"
        />

        <select
          name="idInstitucion"
          value={form.idInstitucion}
          onChange={handleChange}
          required
          className="border p-2 rounded w-full"
        >
          <option value="">Seleccionar institución</option>
          {instituciones.map(i => (
            <option key={i.idinstitucion} value={i.idinstitucion}>{i.nombre}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block font-semibold mb-1">Seleccionar docente</label>
        <input
          type="text"
          placeholder="Buscar docente..."
          value={filtroDocente}
          onChange={e => setFiltroDocente(e.target.value)}
          className="border p-2 rounded w-full mb-2"
        />
        <div className="max-h-40 overflow-y-auto border p-2 rounded bg-gray-50">
          {docentesFiltrados.map(d => (
            <label key={d.idusuario} className="block text-sm mb-1">
              <input
                type="radio"
                name="idUsuarioCreador"
                value={d.idusuario}
                checked={form.idUsuarioCreador === String(d.idusuario)}
                onChange={handleChange}
                className="mr-2"
              />
              {d.nombre} {d.apellidos}
            </label>
          ))}
        </div>
      </div>

      <div className="flex justify-end gap-4 mt-4">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Crear proyecto
        </button>
      </div>
    </form>
  );
}
