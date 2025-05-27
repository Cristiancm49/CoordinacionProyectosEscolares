import { useEffect, useState } from 'react';

export default function FormularioInstitucion({ onSubmit, onCancel, defaultValues = {} }) {
  const [form, setForm] = useState({
    nombre: '',
    direccion: '',
    telefono: '',
    email: '',
    ciudad: ''
  });

  useEffect(() => {
    if (defaultValues && Object.keys(defaultValues).length > 0) {
      setForm({
        nombre: defaultValues.nombre || '',
        direccion: defaultValues.direccion || '',
        telefono: defaultValues.telefono || '',
        email: defaultValues.email || defaultValues.email || '',
        ciudad: defaultValues.ciudad || ''
      });
    }
  }, [defaultValues]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} className="w-full p-2 border rounded" required />
      <input name="direccion" placeholder="Dirección" value={form.direccion} onChange={handleChange} className="w-full p-2 border rounded" required />
      <input name="telefono" placeholder="Teléfono" value={form.telefono} onChange={handleChange} className="w-full p-2 border rounded" required />
      <input name="email" placeholder="Correo" value={form.email} onChange={handleChange} className="w-full p-2 border rounded" required />
      <input name="ciudad" placeholder="Ciudad" value={form.ciudad} onChange={handleChange} className="w-full p-2 border rounded" required />
      <div className="flex justify-end gap-2">
        <button type="button" onClick={onCancel} className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded">Cancelar</button>
        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">{defaultValues?.idinstitucion ? 'Actualizar' : 'Crear'}</button>
      </div>
    </form>
  );
}
