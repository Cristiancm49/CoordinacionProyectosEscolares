const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();


app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
  res.send('Gestión de Proyectos Escolares - Backend Activo');
});


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
