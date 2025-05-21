import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-primary text-white py-10 px-6 md:px-20 mt-10 rounded-t-3xl shadow-inner">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="flex justify-center md:justify-start">
          <img src="/logofooter.png" alt="Logo Universidad de la Amazonia" className="h-20 object-contain drop-shadow-md" />
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4 text-accent">INFORMACIÓN DE CONTACTO</h3>
          <p className="text-sm">Avenida José Eustasio Rivera No. 26 - 33</p>
          <p className="text-sm">Florencia, Caquetá - Colombia</p>
          <p className="text-sm"><strong>Código postal:</strong> 180001</p>
          <p className="text-sm">
            <strong>Correo:</strong>{' '}
            <a href="mailto:contacto@uniamazonia.edu.co" className="underline hover:text-yellow-300">
              contacto@uniamazonia.edu.co
            </a>
          </p>
          <p className="text-sm"><strong>Teléfono:</strong> +57 (8) 630 3000</p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4 text-accent">HORARIO</h3>
          <p className="text-sm">Lunes a viernes 7:30 a.m. - 5:30 p.m.</p>
          <p className="text-sm">Sábados 8:00 a.m. - 12:00 m.</p>
        </div>
      </div>

      <div className="mt-10 text-center text-sm text-accent">
        © {new Date().getFullYear()} Universidad de la Amazonia. Todos los derechos reservados.
      </div>
    </footer>
  );
}
