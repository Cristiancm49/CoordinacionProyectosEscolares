// src/components/BotonLogout.jsx
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function BotonLogout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleClick = () => {
    logout();
    navigate('/login');
  };

  return (
    <button
      onClick={handleClick}
      className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
    >
      Cerrar sesión
    </button>
  );
}