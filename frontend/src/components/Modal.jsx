// src/components/Modal.jsx
export default function Modal({ titulo, onClose, children, ancho = 'max-w-lg' }) {
    return (
      <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
        <div className={`bg-white p-6 rounded-lg shadow-lg w-full ${ancho} relative`}>
          <button
            onClick={onClose}
            className="absolute top-2 right-3 text-gray-500 hover:text-red-600 text-xl"
          >
            ×
          </button>
          {titulo && <h2 className="text-xl font-bold text-blue-800 mb-4">{titulo}</h2>}
          {children}
        </div>
      </div>
    );
  }
  