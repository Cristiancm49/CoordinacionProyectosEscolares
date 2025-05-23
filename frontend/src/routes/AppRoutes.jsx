import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import ProtectedRoute from '../components/ProtectedRoute';
import PublicRoute from '../components/PublicRoute';
import EstudianteHome from '../pages/Estudiante/HomeEstudainte';
import DocenteHome from '../pages/Docente/DocenteHome';
import CoordinadorHome from '../pages/Coordinador/HomeCooordinador';
import PanelLayout from '../layouts/PanelLayout';
import EstudianteProyectos from '../pages/panel/std/EstudiantProyectos';
import MiPerfil from '../pages/panel/MiPerfil';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      {/* Público */}
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="/register"
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        }
      />

      {/* Protegidas por rol */}


      <Route element={<ProtectedRoute allowedRoles={[1]} />}>
        <Route path="/estudiante" element={<PanelLayout />}>
          <Route path="mis-proyectos" element={<EstudianteProyectos />} />
          <Route path='perfil' element={<MiPerfil />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute allowedRoles={[3]} />}>
        <Route path="/coordinador" element={<CoordinadorHome />} />
      </Route>
    </Routes>
  );
}
