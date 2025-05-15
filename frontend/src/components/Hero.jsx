import React from 'react';

export default function Hero() {
  return (
    <section className="bg-indigo-700 text-white py-20 px-6 md:px-32 flex flex-col items-center text-center">
      <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
        Plataforma de Gestión de Proyectos Escolares
      </h1>
      <p className="mb-8 text-lg md:text-xl max-w-3xl">
        Registra, controla y visualiza los avances de tus proyectos en una plataforma fácil y segura.
      </p>
      <button className="bg-white text-indigo-700 font-bold px-8 py-3 rounded hover:bg-gray-100 transition">
        Comenzar Ahora
      </button>
    </section>
  );
}
