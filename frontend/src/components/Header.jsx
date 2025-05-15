import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow">
      <div className="container mx-auto flex justify-between items-center p-4">
        <Link to="/" className="text-2xl font-bold text-indigo-700">
          ProyectoEscolar
        </Link>

        {/* Menú escritorio */}
        <nav className="hidden md:flex space-x-6 text-gray-700 font-medium">
          <Link to="/" className="hover:text-indigo-600">Inicio</Link>
          <Link to="/proyectos" className="hover:text-indigo-600">Proyectos</Link>
          <Link to="/usuarios" className="hover:text-indigo-600">Usuarios</Link>
          <Link to="/contacto" className="hover:text-indigo-600">Contacto</Link>
        </nav>

        {/* Botón hamburguesa móvil */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden focus:outline-none"
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Menú móvil */}
      {menuOpen && (
        <nav className="md:hidden bg-white shadow-md">
          <Link to="/" className="block px-4 py-2 hover:bg-indigo-50" onClick={() => setMenuOpen(false)}>Inicio</Link>
          <Link to="/proyectos" className="block px-4 py-2 hover:bg-indigo-50" onClick={() => setMenuOpen(false)}>Proyectos</Link>
          <Link to="/usuarios" className="block px-4 py-2 hover:bg-indigo-50" onClick={() => setMenuOpen(false)}>Usuarios</Link>
          <Link to="/contacto" className="block px-4 py-2 hover:bg-indigo-50" onClick={() => setMenuOpen(false)}>Contacto</Link>
        </nav>
      )}
    </header>
  );
}
