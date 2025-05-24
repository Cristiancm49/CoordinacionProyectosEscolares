import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import ProtectedRoute from '../components/ProtectedRoute';
import PublicRoute from '../components/PublicRoute';

import CoordinadorHome from '../pages/Coordinador/HomeCooordinador';
import PanelLayout from '../layouts/PanelLayout';
import EstudianteProyectos from '../pages/panel/std/EstudiantProyectos';
import DetalleProyecto from '../pages/panel/std/DetalleProyecto';
import MiPerfil from '../pages/panel/MiPerfil';
import BienvenidaEstudiante from '../pages/panel/std/BienvenidaEstudiante';
import BienvenidaDocente from '../pages/panel/doce/BienvenidaDocente';
import DocenteProyectos from '../pages/panel/doce/Docenteproyectos';

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



      <Route element={<ProtectedRoute allowedRoles={[1]} />}>
        <Route path="/estudiante" element={<PanelLayout />}>
        <Route index element={<BienvenidaEstudiante />} />
          <Route path="mis-proyectos" element={<EstudianteProyectos />} />
          <Route path='perfil' element={<MiPerfil />} />
          <Route path="mis-proyectos/proyecto/:id" element={<DetalleProyecto />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute allowedRoles={[2]} />}>
        <Route path='/docente' element={<PanelLayout />}>
        <Route index element={<BienvenidaDocente />} />
        <Route path='perfil' element={<MiPerfil />} />
        <Route path="mis-proyectos" element={<DocenteProyectos />} />
        </Route>
      </Route>
    

      <Route element={<ProtectedRoute allowedRoles={[3]} />}>
        <Route path="/coordinador" element={<CoordinadorHome />} />
      </Route>
    </Routes>
  );
}
