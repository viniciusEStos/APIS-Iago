const express = require('express');
const router = express.Router();
const awsController = require('../Controller/awsController');

const multer = require('multer');

// Configuração do armazenamento temporário
const storage = multer.memoryStorage(); // Mantém o arquivo na memória em vez de salvá-lo no disco
const upload = multer({ storage });

router.post('/upload', upload.single('file'), awsController.uploadImage);
router.post('/download', awsController.downloadImage);
router.get('/buscar/:keyName', awsController.getOne);
 
module.exports = router;