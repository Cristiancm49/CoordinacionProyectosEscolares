const express = require('express');
const routes = express.Router();

const proyectosController = require('../controllers/proyectoController');

routes.get('/getProyectos', proyectosController.getProyectos);
routes.get('/getProyecto/:id', proyectosController.getProyectoById);
routes.post('/createProyecto', proyectosController.createProyecto);
routes.put('/updateProyecto/:id', proyectosController.updateProyecto);
routes.get('/getProyectos/institucion/:id', proyectosController.getProyectosByInstitucion);
routes.get('/getProyectos/usuario/:id', proyectosController.getProyectosByUsuario);

module.exports = routes;
