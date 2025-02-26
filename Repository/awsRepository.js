const AWS = require('aws-sdk');
const fs = require('fs');
const db = require('../banco.js');


AWS.config.update({
    region: 'us-west-1',
    accessKeyId: 'AKIA5RRHCKYZ6W4OB6NB',
    secretAccessKey: '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'
});

const s3 = new AWS.S3();//vem depois por causa da config

const { v4: uuidv4 } = require('uuid');
class awsRepository{

    static uploadFile = (filePath, bucketName) => {
        const fileContent = fs.readFileSync(filePath);
        const keyName = uuidv4();
    
        const params = {
        Bucket: bucketName, 
        Key: keyName,       
        Body: fileContent  
        };

        return s3.upload(params).promise();
    };  

    static downloadFile(bucketName, keyName, downloadPath) {
        const params = {
            Bucket: bucketName,
            Key: keyName
        };

        const file = fs.createWriteStream(downloadPath);

        return new Promise((resolve, reject) => {
            s3.getObject(params).createReadStream()
                .pipe(file)
                .on('close', () => resolve(downloadPath))
                .on('error', (err) => reject(err));
        });
    }

    static async findOne(keyName) {
        try{
            const params = {
                Bucket: "bucketmi74",  // Certifique-se de que 'Bucket' está com 'B' maiúsculo.
                Key: keyName,          // Certifique-se de que 'Key' está com 'K' maiúsculo.
                Expires: 60 * 5        // Define a expiração do link assinado em 5 minutos (ou o tempo que preferir)
            };
            const url = await s3.getSignedUrlPromise('getObject', params);  // Usando o getSignedUrlPromise para uma abordagem assíncrona
            return {url};
        }
        catch(error){
            throw new Error(error)
        }
    }

}

module.exports = awsRepository;

