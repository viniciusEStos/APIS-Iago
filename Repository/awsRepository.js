const AWS = require('aws-sdk');
const fs = require('fs');
const db = require('../banco.js'); // Conexão com o banco
const { v4: uuidv4 } = require('uuid');

// Configuração do AWS S3
AWS.config.update({
    region: 'us-west-1',
    accessKeyId: 'AKIA5RRHCKYZ3ZDRWAA6',
    secretAccessKey: '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'
});

const s3 = new AWS.S3(); // Instancia o serviço S3

class awsRepository {

    static async uploadFile(filePath, bucketName, userId) {
        const fileContent = fs.readFileSync(filePath);
        const keyName = uuidv4(); // Gera um nome único para o arquivo

        const params = {
            Bucket: bucketName,
            Key: keyName,
            Body: fileContent
        };

        try {
            // Faz o upload para o S3
            const s3Response = await s3.upload(params).promise();

            // Cria o registro no banco de dados após o upload
            const fileUrl = s3Response.Location; // A URL do arquivo no S3
            await this.saveFileDataInDB(filePath, fileUrl, userId); // Passa o userId para o banco de dados

            return s3Response; // Retorna a resposta do upload do S3
        } catch (error) {
            throw new Error('Erro ao fazer o upload do arquivo no S3: ' + error.message);
        }
    }

    // Método para salvar dados do arquivo no MySQL com user_id
    static async saveFileDataInDB(fileName, fileUrl, userId) {
        return new Promise((resolve, reject) => {
            const query = `INSERT INTO files (file_name, s3_url, user_id) VALUES (?, ?, ?)`;

            // Insere dados no banco de dados com o user_id
            db.query(query, [fileName, fileUrl, userId], (err, results) => {
                if (err) {
                    return reject('Erro ao inserir no banco de dados: ' + err.message);
                }
                resolve(results);
            });
        });
    }

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

    // Método para gerar URL assinada para acessar o arquivo
    static async findOne(keyName) {
        try {
            const params = {
                Bucket: "bucketmi74",
                Key: keyName,
                Expires: 60 * 5
            };
            const url = await s3.getSignedUrlPromise('getObject', params);
            return { url };
        } catch (error) {
            throw new Error('Erro ao acessar o arquivo no S3: ' + error.message);
        }
    }
}

module.exports = awsRepository;
