import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <p>© 2025 Plataforma Proyectos Escolares. Todos los derechos reservados.</p>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <a href="#" aria-label="Facebook" className="hover:text-indigo-400">FB</a>
          <a href="#" aria-label="Twitter" className="hover:text-indigo-400">TW</a>
          <a href="#" aria-label="LinkedIn" className="hover:text-indigo-400">LI</a>
        </div>
      </div>
    </footer>
  );
}
