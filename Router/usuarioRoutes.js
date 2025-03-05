const express = require('express');
const UsuarioController = require('../Controller/usuarioController.js');
const router = express.Router();

router.get('/', UsuarioController.getAll);
router.post('/', UsuarioController.create);
router.put('/:id', UsuarioController.update);
router.delete('/:id', UsuarioController.delete);

module.exports = router;