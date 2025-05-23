import React from 'react';

const features = [
  {
    title: 'Gestión de Usuarios',
    description: 'Crear, editar y administrar cuentas para estudiantes, docentes y coordinadores.',
    icon: (
      <svg
        className="w-12 h-12 mx-auto text-indigo-600 group-hover:text-indigo-800 transition-colors"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 14a4 4 0 1 1-8 0 4 4 0 0 1 8 0zM12 14v7" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 21h12" />
      </svg>
    ),
  },
  {
    title: 'Registro de Proyectos',
    description: 'Agregar proyectos con título, objetivos, cronograma, presupuesto, equipo e institución.',
    icon: (
      <svg
        className="w-12 h-12 mx-auto text-indigo-600 group-hover:text-indigo-800 transition-colors"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3M3 11h18M5 19h14a2 2 0 0 0 2-2v-5H3v5a2 2 0 0 0 2 2z" />
      </svg>
    ),
  },
  {
    title: 'Seguimiento de Avances',
    description: 'Registrar hitos con fechas, documentos y fotos para seguimiento detallado.',
    icon: (
      <svg
        className="w-12 h-12 mx-auto text-indigo-600 group-hover:text-indigo-800 transition-colors"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-4H5l7-7 7 7h-4v4z" />
      </svg>
    ),
  },
  {
    title: 'Reportes PDF',
    description: 'Generar reportes completos y exportables para evaluación y seguimiento.',
    icon: (
      <svg
        className="w-12 h-12 mx-auto text-indigo-600 group-hover:text-indigo-800 transition-colors"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 17h10M7 7h6M7 12h10m-7-5v10" />
      </svg>
    ),
  },
];

export default function Features() {
  return (
    <section className="py-20 px-6 md:px-20 bg-gray-100">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">¿Qué puedes hacer en la plataforma?</h2>
        <p className="text-gray-600 mt-3 text-lg">Explora las funcionalidades clave diseñadas para apoyar tus proyectos escolares.</p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map(({ title, description, icon }, idx) => (
          <div
            key={idx}
            className="group bg-white p-6 rounded-2xl border border-gray-200 shadow-md hover:shadow-2xl hover:scale-[1.02] transition-transform duration-300 text-center"
            data-aos="fade-up"
            data-aos-delay={idx * 100}
          >
            <div className="mb-4">{icon}</div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800 group-hover:text-indigo-800 transition-colors">{title}</h3>
            <p className="text-gray-600 text-sm">{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
