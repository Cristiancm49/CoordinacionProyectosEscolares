import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

import AppRoutes from './routes/AppRoutes';
import './App.css';

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      mirror: false,
    });
  }, []);

  return <AppRoutes />;
}

export default App;
