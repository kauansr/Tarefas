import TarefasService from "../services/tarefasService.js";


const tarefasService = new TarefasService();

class TarefasController {
    constructor() {
    }

    async getAllTarefas(req, res) {
        const user_id = req.user.id;
        try{
            const users = await tarefasService.getAllTarefas(user_id);
            res.status(200).json(users)
        } catch (error){
            console.log('Erro', error.message);
            res.status(400).json({error: error.message})
        }
    }

    async getTarefasById(req, res) {
        const {id} = req.params;
        const user_id = req.user.id;
        try{
            const user = await tarefasService.getTarefaById(id, user_id);
            res.status(200).json(user);
        } catch (error) {
            console.log('Erro', error.message);
            res.status(400).json({error: error.message})
        }
    }

    async createTarefas(req, res) {
        const fields = req.body;
        const user_id = req.user.id;

        try {
            const newUser = await tarefasService.insertTarefas(fields, user_id);
            res.status(201).json(newUser);
          } catch (error) {
            console.error('Erro:', error.message);
            res.status(400).json({ error: error.message });
          }
    }

    async updateTarefas(req, res) {
        const { id } = req.params;
        const fields = req.body;
        const user_id = req.user.id;

        try{
            const user = await tarefasService.updateTarefasById(fields, id, user_id);
            res.status(200).json(user);
        } catch (error) {
            console.log('Erro', error.message);
            res.status(400).json({error: error.message})
        }
    }

    async deleteTarefas(req, res) {
        const { id } = req.params;
        const user_id = req.user.id;
        try{
            const result = await tarefasService.deleteTarefaById(id, user_id);
            res.status(200).json(result);
        } catch (error) {
            console.log('Erro', error.message);
            res.status(400).json({error: error.message})
        }
    }
}

export default TarefasController;
