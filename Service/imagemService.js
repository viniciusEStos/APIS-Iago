const ImagemRepository = require('../Repository/imagemRepository.js');

class ImagemService {
    static async getAll() {
        return await ImagemRepository.findAll();
    }

    static async create(titulo, descricao) {
        return await ImagemRepository.create(titulo, descricao);
    }

    static async update(id, titulo, descricao) {
        return await ImagemRepository.update(id, titulo, descricao);
    }

    static async delete(id) {
        return await ImagemRepository.delete(id);
    }
}

module.exports = ImagemService;