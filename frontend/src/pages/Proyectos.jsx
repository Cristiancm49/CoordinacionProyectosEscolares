import React from 'react';

const proyectosMock = [
  {
    id: 1,
    titulo: "Proyecto de Ciencias Naturales",
    estado: "Activo",
    fechaInicio: "2025-01-15",
    institucion: "Institución Educativa A",
  },
  {
    id: 2,
    titulo: "Proyecto de Matemáticas Aplicadas",
    estado: "En Evaluación",
    fechaInicio: "2025-02-10",
    institucion: "Institución Educativa B",
  },
];

export default function Proyectos() {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Listado de Proyectos</h2>
      <table className="min-w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-indigo-700 text-white">
            <th className="border border-gray-300 px-4 py-2 text-left">Título</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Estado</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Fecha Inicio</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Institución</th>
          </tr>
        </thead>
        <tbody>
          {proyectosMock.map((proyecto) => (
            <tr key={proyecto.id} className="hover:bg-gray-100 cursor-pointer">
              <td className="border border-gray-300 px-4 py-2">{proyecto.titulo}</td>
              <td className="border border-gray-300 px-4 py-2">{proyecto.estado}</td>
              <td className="border border-gray-300 px-4 py-2">{proyecto.fechaInicio}</td>
              <td className="border border-gray-300 px-4 py-2">{proyecto.institucion}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
