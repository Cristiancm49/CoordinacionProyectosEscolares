import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn, UserPlus } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useAuth } from '../context/AuthContext';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { usuario } = useAuth();
  const navigate = useNavigate();
  const [fotoPreview, setFotoPreview] = useState(null);

  useEffect(() => {
    if (usuario?.id) {
      setFotoPreview(`http://localhost:4000/api/foto-perfil/${usuario.id}`);
    }
  }, [usuario]);
  
  useEffect(() => {
    AOS.init({ duration: 700, easing: 'ease-in-out', once: true });
  }, []);
  const irAlPanel = () => {
    switch (usuario?.idRol) {
      case 1:
        navigate('/estudiante');
        break;
      case 2:
        navigate('/docente');
        break;
      case 3:
        navigate('/coordinador');
        break;
      default:
        navigate('/');
    }
  };

  return (
    <header className="bg-blue-900 text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-5">
        <Link
          to="/"
          className="text-xl sm:text-2xl md:text-3xl font-bold tracking-wide transition-transform duration-300 hover:scale-105 drop-shadow-sm"
          data-aos="fade-down"
        >
          PGPE
        </Link>

        <div className="hidden md:flex items-center space-x-4">
        {usuario ? (
  <div className="flex items-center space-x-4">
    <button
      onClick={irAlPanel}
      className="bg-yellow-400 text-blue-900 px-4 py-2 rounded-xl font-semibold text-sm hover:bg-yellow-300 transition"
    >
      Ir al panel
    </button>

    <span className="text-white font-medium text-base">
      {usuario.nombre}
    </span>

    <img
      src={fotoPreview}
      alt="Perfil"
      className="w-12 h-12 rounded-full border-2 border-white shadow"
    />
  </div>
          ) : (
            <>
              <Link
                to="/login"
                className="inline-flex items-center bg-white text-blue-800 px-4 py-2 rounded-xl text-sm font-semibold hover:bg-blue-100 transition transform hover:scale-[1.05] shadow-sm"
              >
                <LogIn className="w-4 h-4 mr-2" />
                Iniciar Sesión
              </Link>
              <Link
                to="/register"
                className="inline-flex items-center bg-yellow-400 text-blue-900 px-4 py-2 rounded-xl text-sm font-semibold hover:bg-yellow-300 transition transform hover:scale-[1.05] shadow-sm"
              >
                <UserPlus className="w-4 h-4 mr-2" />
                Registrarse
              </Link>
            </>
          )}
        </div>

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

      {/* menú en móviles (opcional) */}
      {menuOpen && !usuario && (
        <nav className="md:hidden bg-blue-900 text-white px-6 py-4 space-y-3 font-semibold">
          <Link
            to="/login"
            className="block hover:text-yellow-300 transition transform hover:scale-[1.05]"
            onClick={() => setMenuOpen(false)}
          >
            Iniciar Sesión
          </Link>
          <Link
            to="/register"
            className="block hover:text-yellow-300 transition transform hover:scale-[1.05]"
            onClick={() => setMenuOpen(false)}
          >
            Registrarse
          </Link>
        </nav>
      )}
    </header>
  );
}
