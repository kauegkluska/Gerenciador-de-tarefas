const ResourcesModel = require("../models/ResourcesModel");

/**
 * Controlador para gerenciar tipos de produto através de endpoints da API.
 * @class
 */
class ApiResourcesController {

    /**
     * Recupera todos os tipos de produto.
     * @param {express.Request} req O objeto de requisição do Express.
     * @param {express.Response} res O objeto de resposta do Express.
     * @returns {Promise<Object>} A resposta contendo todos os tipos de produto.
     */
    async apiGetAll(req, res) {
        try {
            const resources = await ResourcesModel.findAll();
            return res.send(resources);
        } catch (error) {
            return res.send(error);
        }
    }

    /**
     * Recupera um único tipo de produto pelo ID.
     * @param {express.Request} req O objeto de requisição do Express.
     * @param {express.Response} res O objeto de resposta do Express.
     * @param {Number} req.params.resourcesId Parâmetro passado pela rota do express
     * @returns {Promise<Object>} A resposta contendo o tipo de produto solicitado.
     */
    async apiGetOne(req, res) {
        try {
            const resources = await ResourcesModel.findOne(req.params.resourcesId);
            return res.send(resources);
        } catch (error) {
            return res.send(error);
        }
    }

    /**
     * Armazena um novo tipo de produto.
     * @param {express.Request} req O objeto de requisição do Express.
     * @param {express.Response} res O objeto de resposta do Express.
     * @returns {Promise<Object>} A resposta contendo o tipo de produto armazenado.
     */
    async apiStore(req, res) {
        try {
            const resources = new ResourcesModel();
            resources.nome = req.body.resources.nome;
            resources.descricao = req.body.resources.descricao;
    
            // Verifica se o Usuario_id está definido na sessão ou em outro lugar
            if (!req.session.usuarioId) {
                return res.status(400).send({ error: "Usuario_id não fornecido" });
            }
    
            // Atribui o Usuario_id se estiver presente na sessão
            resources.usuarioId = req.session.usuarioId;
    
            // Salva o recurso
            const result = await resources.save();
    
            // Retorna o recurso salvo
            return res.send(result);
        } catch (error) {
            return res.status(500).send({ error: "Erro ao salvar o recurso", details: error });
        }
    }
    
    

    /**
     * Atualiza um tipo de produto existente.
     * @param {express.Request} req O objeto de requisição do Express.
     * @param {express.Response} res O objeto de resposta do Express.
     * @param {Number} req.params.resourcesId Parâmetro passado pela rota do express
     * @returns {Promise<Object>} A resposta contendo o tipo de produto atualizado.
     */
    async apiUpdate(req, res) {
        try {
            const resources = await ResourcesModel.findOne(req.params.resourcesId);
            resources.nome = req.body.resources.nome;
            resources.descricao = req.body.resources.descricao;
            const result = await resources.update();
            return res.send(result);
        } catch (error) {
            return res.send(error);
        }
    }

    /**
     * Exclui um tipo de produto.
     * @param {express.Request} req O objeto de requisição do Express.
     * @param {express.Response} res O objeto de resposta do Express.
     * @param {Number} req.params.resourcesId Parâmetro passado pela rota do express
     * @returns {Promise<Object>} A resposta indicando o status da exclusão.
     */
    async apiDestroy(req, res) {
        try {
            const resources = await ResourcesModel.findOne(req.params.resourcesId);
            const result = await resources.delete();
            return res.send(result);
        } catch (error) {
            return res.send(error);
        }
    }
}

module.exports = new ApiResourcesController();