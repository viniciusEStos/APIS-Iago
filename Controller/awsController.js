const awsService = require('../Service/awsService.js');
const fs = require('fs');

class awsController {

    static async uploadImage(req, res) {
        try {
            console.log('Arquivo recebido:', req.file);

            if (!req.file) {
                return res.status(400).json({ error: 'Nenhum arquivo foi enviado ou o nome do campo está incorreto' });
            }

            const filePath = req.file.buffer; // Buffer do arquivo
            const fileName = req.file.originalname; // Nome do arquivo original
            const bucketName = 'bucketmi74';

            const result = await awsService.uploadImage(filePath, fileName, bucketName);
            res.json({ message: 'File uploaded successfully!', result });

        } catch (error) {
            console.error('Erro no upload:', error);
            res.status(500).json({ error: 'Erro ao fazer upload da imagem' });
        }
    }

    static async downloadImage(req, res) {
        const { filePath } = req.body;

        const result = await awsService.downloadImage(filePath, 'bucketmi74');
        const file = fs.createWriteStream(result);
      
        file.on('close', () => {
          console.log('Arquivo baixado com sucesso:', file);
          
        }); 
        const result1 = await awsService.getOne(keyName);
          res.json(result1);
      };

      static async getOne(req, res){
        const {keyName} = req.params;
        const result = await awsService.getOne(keyName);
        res.json(result);
    }

}

module.exports = awsController;