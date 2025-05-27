import { useState, useEffect } from 'react';

export default function FormularioUsuario({ defaultValues = {}, onSubmit, onCancel }) {
  const [roles, setRoles] = useState([]);
  const [form, setForm] = useState({
    nombre: '',
    apellidos: '',
    email: '',
    contrasena: '',
    idRol: ''
  });

  useEffect(() => {
    // Cargar roles desde API
    const cargarRoles = async () => {
      try {
        const res = await fetch('http://localhost:4000/api/roles/getRoles');
        const data = await res.json();
        setRoles(data);
      } catch (err) {
        console.error('Error cargando roles:', err);
      }
    };
    cargarRoles();
  }, []);

  useEffect(() => {
    if (defaultValues && Object.keys(defaultValues).length > 0) {
      setForm({
        nombre: defaultValues.nombre || '',
        apellidos: defaultValues.apellidos || '',
        email: defaultValues.email || '',
        contrasena: '',
        idRol: defaultValues.idrol || defaultValues.idRol || ''
      });
    }
  }, [defaultValues]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        type="text"
        name="nombre"
        value={form.nombre}
        onChange={handleChange}
        placeholder="Nombre"
        className="w-full border rounded p-2"
        required
      />
      <input
        type="text"
        name="apellidos"
        value={form.apellidos}
        onChange={handleChange}
        placeholder="Apellidos"
        className="w-full border rounded p-2"
        required
      />
      <input
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Correo"
        className="w-full border rounded p-2"
        required
      />
      <input
        type="password"
        name="contrasena"
        value={form.contrasena}
        onChange={handleChange}
        placeholder="Contraseña"
        className="w-full border rounded p-2"
        required={!defaultValues?.idusuario}
      />
      <select
        name="idRol"
        value={form.idRol}
        onChange={handleChange}
        className="w-full border rounded p-2"
        required
      >
        <option value="">Selecciona un rol</option>
        {roles.map((rol) => (
          <option key={rol.idrol} value={rol.idrol}>{rol.nombre}</option>
        ))}
      </select>

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          {defaultValues?.idusuario ? 'Actualizar' : 'Crear'}
        </button>
      </div>
    </form>
  );
}
