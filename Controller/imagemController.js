const ImagemService = require('../Service/imagemService.js');

class ImagemController {
    static async getAll(req, res) {
        const imagens = await ImagemService.getAll();
        res.json(imagens);
    }

    static async create(req, res) {
        const { titulo, descricao } = req.body;
        const novaImagem = await ImagemService.create(titulo, descricao);
        res.status(201).json(novaImagem);
    }

    static async update(req, res) {
        const { id } = req.params;
        const { titulo, descricao } = req.body;
        await ImagemService.update(id, titulo, descricao);
        res.json({ id, titulo, descricao });
    }

    static async delete(req, res) {
        const { id } = req.params;
        await ImagemService.delete(id);
        res.json({ message: 'Imagem deletada com sucesso' });
    }
}

module.exports = ImagemController;