const express = require('express');
const routes = express.Router();

const estudiantesController = require('../controllers/estudiantesController');

routes.gert('/getEstudiantes', estudiantesController.getEstudiantes);
routes.get('/getEstudiante/:id', estudiantesController.getEstudianteById);
routes.post('/createEstudiante', estudiantesController.createEstudiante);
routes.put('/updateEstudiante/:id', estudiantesController.updateEstudiante);