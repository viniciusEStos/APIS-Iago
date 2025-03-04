const awsService = require('../Service/awsService.js');
const fs = require('fs');
const mime = require('mime-types');

class awsController {

    static async uploadImage(req, res) {
        try {
            console.log('Arquivo recebido:', req.file);

            if (!req.file) {
                return res.status(400).json({ error: 'Nenhum arquivo foi enviado ou o nome do campo está incorreto' });
            }

            const filePath = req.file.buffer;
            const fileName = req.file.originalname; 
            const bucketName = 'bucketmi74';

            const result = await awsService.uploadImage(filePath, fileName, bucketName);
            res.json({ message: 'File uploaded successfully!', result });

        } catch (error) {
            console.error('Erro no upload:', error);
            res.status(500).json({ error: 'Erro ao fazer upload da imagem' });
        }
    }

    static async downloadImage(req, res) {
        try {
          const { keyName } = req.params;
          const bucketName = 'bucketmi74';

          const file = await awsService.downloadFile(bucketName, keyName);
    
          const mimeType = mime.lookup(keyName) || 'application/octet-stream';

          res.setHeader('Content-Type', mimeType);
          res.setHeader('Content-Disposition', `attachment; filename=${keyName}`);
          res.send(file); 
        } catch (error) {
          console.error('Erro ao processar o download:', error);
 
          res.status(500).json({ error: 'Erro ao processar o download', message: error.message });
        }
      }

      static async getOne(req, res){
        const {keyName} = req.params;
        const result = await awsService.getOne(keyName);
        res.json(result);
    }

}

module.exports = awsController;