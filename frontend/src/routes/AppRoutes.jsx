import {Routes, Route} from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Home from '../pages/Home';
import Login from '../pages/Login';
import ProtectedRoute from '../components/ProtectedRoute';
import PublicRoute from '../components/PublicRoute';

export default function AppRoutes() {
    const { usuario } = useAuth();

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route 
            path="/login" 
            element={
                <PublicRoute>
                    <Login />
                </PublicRoute>
            } />
        </Routes>
    );
}
