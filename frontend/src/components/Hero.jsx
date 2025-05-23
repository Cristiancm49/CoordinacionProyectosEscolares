import React from 'react';

export default function Hero() {
  return (
    <section
      className="bg-gray-50 text-blue-900 py-32 px-6 md:px-20 text-center transition-all duration-500 ease-in-out"
      aria-label="Hero section"
      data-aos="fade-up"
    >
      <div className="max-w-4xl mx-auto transition-transform duration-300 hover:scale-[1.01]">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
          Plataforma de Gestión de <br className="hidden md:block" /> Proyectos Escolares
        </h1>

        <p className="text-xl md:text-2xl max-w-3xl mx-auto font-light mb-8">
          Registra, controla y visualiza los avances de tus proyectos de investigación escolar de manera simple y segura.
        </p>

        <p className="max-w-xl mx-auto text-blue-700 italic text-lg md:text-xl tracking-wide">
          ¡Empieza hoy y potencia la investigación en tu institución!
        </p>
      </div>
    </section>
  );
}
