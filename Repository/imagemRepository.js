const db = require('../banco.js');
const Imagem = require('../Model/imagem.js');

class ImagemRepository {
    static async findAll() {
        const query = 'SELECT * FROM IMAGEM';
        const [rows] = await db.promise().query(query);
        return rows.map(row => new Imagem(row.id, row.titulo, row.descricao, row.data_criacao));
    }

    static async create(titulo, descricao) {
        const query = 'INSERT INTO IMAGEM (titulo, descricao) VALUES (?, ?)';
        const [result] = await db.promise().query(query, [titulo, descricao]);
        return new Imagem(result.insertId, titulo, descricao, new Date());
    }

    static async update(id, titulo, descricao) {
        const query = 'UPDATE IMAGEM SET titulo = ?, descricao = ? WHERE id = ?';
        await db.promise().query(query, [titulo, descricao, id]);
    }

    static async delete(id) {
        const query = 'DELETE FROM IMAGEM WHERE id = ?';
        await db.promise().query(query, [id]);
    }
}

module.exports = ImagemRepository;