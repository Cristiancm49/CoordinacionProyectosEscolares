import React, { useContext } from 'react'; // ✅ importa useContext
import { useAuth }  from '../../context/AuthContext';

function HomeEstudainte() {
    const { logout } = useAuth();
  return (
    <div>HomeEstudainte
        <button className='p-5 bg-red-400' onClick={logout}>Cerrar sesión</button>

    </div>
  )
}

export default HomeEstudainte