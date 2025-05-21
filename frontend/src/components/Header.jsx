import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-primary text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-5">
        <Link to="/" className="text-2xl font-bold tracking-wide">
          ProyectoEscolar
        </Link>

        <nav className="hidden md:flex space-x-8 font-semibold">
          <Link to="/" className="hover:text-accent transition">Inicio</Link>
          <Link to="/proyectos" className="hover:text-accent transition">Proyectos</Link>
          <Link to="/usuarios" className="hover:text-accent transition">Usuarios</Link>
          <Link to="/contacto" className="hover:text-accent transition">Contacto</Link>
        </nav>

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

      {menuOpen && (
        <nav className="md:hidden bg-primary text-white px-6 py-4 space-y-3 font-semibold">
          <Link to="/" className="block hover:text-accent" onClick={() => setMenuOpen(false)}>Inicio</Link>
          <Link to="/proyectos" className="block hover:text-accent" onClick={() => setMenuOpen(false)}>Proyectos</Link>
          <Link to="/usuarios" className="block hover:text-accent" onClick={() => setMenuOpen(false)}>Usuarios</Link>
          <Link to="/contacto" className="block hover:text-accent" onClick={() => setMenuOpen(false)}>Contacto</Link>
        </nav>
      )}
    </header>
  );
}
