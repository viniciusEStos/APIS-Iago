const UsuarioRepository = require('../Repository/usuarioRepository.js');

class UsuarioService {
    static async getAll() {
        return await UsuarioRepository.findAll();
    }

    static async create(nome) {
        return await UsuarioRepository.create(nome);
    }

    static async update(id, nome) {
        return await UsuarioRepository.update(id, nome);
    }

    static async delete(id) {
        return await UsuarioRepository.delete(id);
    }
}

module.exports = UsuarioService;