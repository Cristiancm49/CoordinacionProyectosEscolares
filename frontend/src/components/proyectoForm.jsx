import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

export default function ProyectoForm({ onSubmit, onCancel, defaultValues = {}, usuario }) {
  const [instituciones, setInstituciones] = useState([]);
  const [estados, setEstados] = useState([]);

  const [form, setForm] = useState({
    nombre: '',
    descripcion: '',
    objetivos: '',
    cronograma: '',
    observaciones: '',
    fechaInicio: '',
    fechaFin: '',
    idInstitucion: '',
    idEstadoProyecto: ''
  });

  useEffect(() => {
    // Cargar instituciones
    fetch('http://localhost:4000/api/instituciones/getInstituciones')
      .then((res) => res.json())
      .then((data) => setInstituciones(data))
      .catch((err) => console.error('Error cargando instituciones:', err));

    // Cargar estados
    fetch('http://localhost:4000/api/estadoProy/getEstadosProy')
      .then((res) => res.json())
      .then((data) => setEstados(data))
      .catch((err) => console.error('Error cargando estados:', err));
  }, []);

  useEffect(() => {
    if (defaultValues && Object.keys(defaultValues).length > 0) {
      setForm({
        nombre: defaultValues.nombre || '',
        descripcion: defaultValues.descripcion || '',
        objetivos: defaultValues.objetivos || '',
        cronograma: defaultValues.cronograma || '',
        observaciones: defaultValues.observaciones || '',
        fechaInicio: defaultValues.fechaInicio || defaultValues.fechainicio?.split('T')[0] || '',
        fechaFin: defaultValues.fechaFin || defaultValues.fechafin?.split('T')[0] || '',
        idInstitucion: String(defaultValues.idInstitucion || defaultValues.idinstitucion || ''),
        idEstadoProyecto: String(defaultValues.idEstadoProyecto || defaultValues.idestadoproyecto || '')
      });
    }
  }, [defaultValues]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const idInst = parseInt(form.idInstitucion, 10);
    const idEstado = parseInt(form.idEstadoProyecto, 10);

    if (isNaN(idInst) || isNaN(idEstado)) {
      return Swal.fire({
        icon: 'warning',
        title: 'Campos requeridos',
        text: 'Debes seleccionar una institución y un estado válidos.'
      });
    }

    const payload = {
      ...form,
      idInstitucion: idInst,
      idEstadoProyecto: idEstado,
      idUsuarioCreador: usuario.id
    };

    await onSubmit(payload);
  };

  const esEdicion = defaultValues?.idproyecto || defaultValues?.idProyecto;

  return (
    <form className="space-y-3" onSubmit={handleSubmit}>
      <input
        type="text"
        name="nombre"
        value={form.nombre}
        onChange={handleChange}
        placeholder="Nombre del proyecto"
        className="w-full p-2 border rounded"
        required
      />
      <textarea
        name="descripcion"
        value={form.descripcion}
        onChange={handleChange}
        placeholder="Descripción"
        className="w-full p-2 border rounded"
        required
      ></textarea>
      <textarea
        name="objetivos"
        value={form.objetivos}
        onChange={handleChange}
        placeholder="Objetivos"
        className="w-full p-2 border rounded"
        required
      ></textarea>
      <textarea
        name="cronograma"
        value={form.cronograma}
        onChange={handleChange}
        placeholder="Cronograma"
        className="w-full p-2 border rounded"
        required
      ></textarea>
      <textarea
        name="observaciones"
        value={form.observaciones}
        onChange={handleChange}
        placeholder="Observaciones (opcional)"
        className="w-full p-2 border rounded"
      ></textarea>

      <select
        name="idInstitucion"
        value={form.idInstitucion}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      >
        <option value="">Selecciona una institución</option>
        {instituciones.map((inst) => (
          <option key={inst.idinstitucion} value={String(inst.idinstitucion)}>
            {inst.nombre}
          </option>
        ))}
      </select>

      <select
        name="idEstadoProyecto"
        value={form.idEstadoProyecto}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      >
        <option value="">Selecciona un estado del proyecto</option>
        {estados.map((estado) => (
          <option key={estado.idestadoproyecto} value={String(estado.idestadoproyecto)}>
            {estado.nombre}
          </option>
        ))}
      </select>

      <div className="flex gap-4">
        <input
          type="date"
          name="fechaInicio"
          value={form.fechaInicio}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="date"
          name="fechaFin"
          value={form.fechaFin}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <button type="button" onClick={onCancel} className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400">
          Cancelar
        </button>
        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
          {esEdicion ? 'Editar' : 'Crear'}
        </button>
      </div>
    </form>
  );
}
