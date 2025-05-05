const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioControllers');

router.get('/', usuarioController.getUsuarios);
router.get('/:id', usuarioController.getUsuarioById);
router.post('/', usuarioController.createUsuario);
router.put('/:id', usuarioController.updateUsuario);

module.exports = router;
