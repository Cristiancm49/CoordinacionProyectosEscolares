import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ allowedRoles }) {
  const { usuario } = useAuth();

  if (!usuario) return <Navigate to="/login" />;
  if (!allowedRoles.includes(usuario.idRol)) return <Navigate to="/" />;

  return <Outlet />;
}
