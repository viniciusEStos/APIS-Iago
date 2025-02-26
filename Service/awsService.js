const awsRepository = require('../Repository/awsRepository.js');
const AWS = require('aws-sdk');
const s3 = new AWS.S3();

class awsService{

    static async uploadImage(filePath, fileName, bucketName) {
            const params = {
              Bucket: bucketName,
              Key: fileName, // Nome do arquivo no S3
              Body: filePath,
              ContentType: 'image/webp', // Defina o tipo correto
            };
        
            return s3.upload(params).promise();
    }

    static async downloadImage(params, file) {
        s3.getObject(params).createReadStream().pipe(file);
    }

    static async getOne(keyName){
        return await awsRepository.findOne(keyName);
    }
}

module.exports = awsService;
