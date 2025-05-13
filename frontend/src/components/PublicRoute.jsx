import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function PublicRoute({ children }) {
  const { usuario } = useAuth();

  if (!usuario) return children;

  // Redirigir al home según su rol
  switch (usuario.idRol) {
    case 1:
      return <Navigate to="/estudiante" />;
    case 2:
      return <Navigate to="/docente" />;
    case 3:
      return <Navigate to="/coordinador" />;
    default:
      return <Navigate to="/" />;
  }
}