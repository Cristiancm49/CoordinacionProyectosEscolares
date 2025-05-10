const express = require('express');
const routes = express.Router();

const estudiantesController = require('../controllers/estudiantesController');

routes.get('/getEstudiantes', estudiantesController.getEstudiantes);
routes.get('/getEstudiante/:id', estudiantesController.getEstudianteById);


module.exports = routes;