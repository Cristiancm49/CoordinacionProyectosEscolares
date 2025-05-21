import React from 'react';
import Hero from '../components/Hero';
import Features from '../components/Features';
import logo from '../assets/logofooter.png';
import { LogIn, UserPlus } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 text-gray-800 font-sans">
      
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-800 to-indigo-900 text-white shadow-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-wide">Coordinación de Proyectos Escolares</h1>
          <div className="space-x-3 flex items-center">
            <a
              href="/login"
              className="inline-flex items-center bg-white text-blue-800 px-4 py-2 rounded-lg font-semibold text-sm hover:bg-blue-100 transition duration-200 shadow-sm"
            >
              <LogIn className="w-4 h-4 mr-2" />
              Iniciar Sesión
            </a>
            <a
              href="/register"
              className="inline-flex items-center bg-yellow-400 text-black px-4 py-2 rounded-lg font-semibold text-sm hover:bg-yellow-300 transition duration-200 shadow-sm"
            >
              <UserPlus className="w-4 h-4 mr-2" />
              Registrarse
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <Hero />

      {/* Features */}
      <section className="py-20 bg-white">
        <Features />
      </section>

      {/* Footer */}
      <footer className="bg-teal-900 text-white pt-16 pb-10 px-6 md:px-20 mt-10 rounded-t-3xl shadow-inner">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          
          {/* Logo */}
          <div className="flex justify-center md:justify-start">
            <img src={logo} alt="Logo Universidad de la Amazonia" className="h-20 object-contain drop-shadow-md" />
          </div>

          {/* Contacto */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-yellow-400">INFORMACIÓN DE CONTACTO</h3>
            <p className="text-sm">Avenida José Eustasio Rivera No. 26 - 33</p>
            <p className="text-sm">Florencia, Caquetá - Colombia</p>
            <p className="text-sm"><strong>Código postal:</strong> 180001</p>
            <p className="text-sm">
              <strong>Correo:</strong>
              <a href="mailto:contacto@uniamazonia.edu.co" className="underline ml-1 hover:text-yellow-300">
                contacto@uniamazonia.edu.co
              </a>
            </p>
            <p className="text-sm"><strong>Teléfono:</strong> +57 (8) 630 3000</p>
          </div>

          {/* Horario */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-yellow-400">HORARIO</h3>
            <p className="text-sm">Lunes a viernes 7:30 a.m. - 5:30 p.m.</p>
            <p className="text-sm">Sábados 8:00 a.m. - 12:00 m.</p>
          </div>
        </div>

        <div className="mt-10 text-center text-sm text-teal-300">
          © {new Date().getFullYear()} Universidad de la Amazonia. Todos los derechos reservados.
        </div>
      </footer>
    </div>
  );
};

export default Home;
