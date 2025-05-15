import React from 'react';
import Hero from '../components/Hero';
import Features from '../components/Features'; // Corrección de ruta
import logo from '../assets/logofooter.png';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-700 to-blue-900 text-white py-6 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <h1 className="text-3xl font-extrabold">Coordinación de Proyectos Escolares</h1>
          <nav className="space-x-8">
            {/* Aquí puedes poner tus enlaces o botones */}
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-900 text-white py-20 text-center">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4">Impulsa la Ciencia Escolar</h2>
          <p className="text-lg md:text-xl mb-6">Apoyamos el seguimiento de proyectos de investigación escolar en todo el país.</p>
          {/* Puedes agregar botón o link aquí */}
        </div>
      </section>

      {/* Aquí integras Features */}
      <Features />

      {/* Footer */}
      <footer className="bg-teal-800 text-white py-10 px-6 md:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
        
        {/* Logo */}
        <div className="flex justify-center md:justify-start">
          <img src={logo} alt="Logo Universidad de la Amazonia" className="h-20 object-contain" />
        </div>
        
        {/* Información de contacto */}
        <div>
          <h3 className="font-bold text-lg mb-4">INFORMACIÓN DE CONTACTO</h3>
          <p>Avenida José Eustasio Rivera No. 26 - 33</p>
          <p>Florencia, Caquetá - Colombia</p>
          <p><strong>Código postal:</strong> 180001</p>
          <p>
            <strong>Correo Electrónico:</strong> 
            <a href="mailto:contacto@uniamazonia.edu.co" className="underline hover:text-yellow-400 ml-1">
              contacto@uniamazonia.edu.co
            </a>
          </p>
          <p><strong>Teléfono:</strong> +57 (8) 630 3000</p>
        </div>

        {/* Horario */}
        <div>
          <h3 className="font-bold text-lg mb-4">HORARIO</h3>
          <p>Lunes a viernes 7:30 a.m. - 5:30 p.m.</p>
          <p>Sábados 8:00 a.m. - 12:00 m.</p>
        </div>
      </div>
    </footer>

    </div>
  );
};

export default Home;
