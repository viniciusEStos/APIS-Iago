const express = require('express');
const router = express.Router();
const awsController = require('../Controller/awsController');

const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/upload', upload.single('file'), awsController.uploadImage);
router.get('/download/:keyName', awsController.downloadImage);
router.get('/buscar/:keyName', awsController.getOne);
 
module.exports = router;