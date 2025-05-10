const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

const authRoutes = require('./routes/authRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');
const institucionesRoutes = require('./routes/institucionesRoutes');
const estadoProyRoutes = require('./routes/estadoProyRoutes');
const proyectoRoutes = require('./routes/proyectosRoutes');
const reporteRoutes = require('./routes/reporteRoutes');
const listEstudiantesProyRoutes = require('./routes/listEstudiantesProyRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/instituciones', institucionesRoutes);
app.use('/api/estadoProy', estadoProyRoutes);
app.use('/api/proyectos', proyectoRoutes);
app.use('/api/reportes', reporteRoutes);
app.use('/api/listEstudiantesProy', listEstudiantesProyRoutes);

app.get('/', (req, res) => {
    res.send('Gestión de Proyectos Escolares - Backend Activo');
  });

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
