const express = require('express');
const ImagemController = require('../Controller/imagemController.js');
const router = express.Router();

router.get('/', ImagemController.getAll);
router.post('/', ImagemController.create);
router.put('/:id', ImagemController.update);
router.delete('/:id', ImagemController.delete);

module.exports = router;