import React from 'react';

export default function Hero() {
  return (
    <section
      className="bg-secondary text-white py-32 px-6 md:px-20 text-center"
      aria-label="Hero section"
      data-aos="fade-up"
    >
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 drop-shadow-lg leading-tight">
          Plataforma de Gestión de <br className="hidden md:block" /> Proyectos Escolares
        </h1>

        <p className="text-xl md:text-2xl max-w-3xl mx-auto font-light mb-8 drop-shadow-md">
          Registra, controla y visualiza los avances de tus proyectos de investigación escolar de manera simple y segura.
        </p>

        <p className="max-w-xl mx-auto text-accent italic text-lg md:text-xl tracking-wide">
          ¡Empieza hoy y potencia la investigación en tu institución!
        </p>
      </div>
    </section>
  );
}
