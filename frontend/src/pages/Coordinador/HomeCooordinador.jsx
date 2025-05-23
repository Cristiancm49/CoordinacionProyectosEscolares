import React, { useContext } from 'react'; // ✅ importa useContext
import { useAuth } from '../../context/AuthContext';


function HomeCooordinador() {
    const { logout } = useAuth();
  return (
    <div>
        <button className='p-5 bg-red-400' onClick={logout}>Cerrar sesión</button>

    </div>
    
  )
}

export default HomeCooordinador