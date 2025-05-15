import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="text-center py-20">
      <h1 className="text-6xl font-bold mb-6">404</h1>
      <p className="text-xl mb-4">Página no encontrada</p>
      <Link to="/" className="text-indigo-700 hover:underline">
        Volver al inicio
      </Link>
    </div>
  );
}
