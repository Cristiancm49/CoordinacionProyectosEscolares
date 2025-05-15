import React from 'react';

const usuariosMock = [
  { id: 1, nombre: "Juan Pérez", rol: "Estudiante" },
  { id: 2, nombre: "Ana Gómez", rol: "Docente" },
  { id: 3, nombre: "Carlos Martínez", rol: "Coordinador" },
];

export default function Usuarios() {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Gestión de Usuarios</h2>
      <table className="min-w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-indigo-700 text-white">
            <th className="border border-gray-300 px-4 py-2 text-left">Nombre</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Rol</th>
          </tr>
        </thead>
        <tbody>
          {usuariosMock.map((usuario) => (
            <tr key={usuario.id} className="hover:bg-gray-100 cursor-pointer">
              <td className="border border-gray-300 px-4 py-2">{usuario.nombre}</td>
              <td className="border border-gray-300 px-4 py-2">{usuario.rol}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
