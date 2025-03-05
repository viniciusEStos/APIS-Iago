const db = require('../banco.js');
const Usuario = require('../Model/usuario.js');

class UsuarioRepository {
    static async findAll() {
        const query = 'SELECT * FROM USUARIO';
        const [rows] = await db.promise().query(query);
        return rows.map(row => new Usuario(row.id, row.nome, row.data_criacao));
    }

    static async create(nome) {
        const query = 'INSERT INTO USUARIO (nome) VALUES (?)';
        const [result] = await db.promise().query(query, [nome]);
        return new Usuario(result.insertId, nome, new Date());
    }

    static async update(id, nome) {
        const query = 'UPDATE USUARIO SET nome = ? WHERE id = ?';
        await db.promise().query(query, [nome, id]);
    }

    static async delete(id) {
        const query = 'DELETE FROM USUARIO WHERE id = ?';
        await db.promise().query(query, [id]);
    }
}

module.exports = UsuarioRepository;