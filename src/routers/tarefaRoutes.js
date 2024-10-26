import express from 'express'
import TarefasController from '../controllers/tarefasController.js';
import AuthMiddleware from '../middlewares/jwtEncode.js';

const tarefaRouter = express.Router();

const userController = new TarefasController();


tarefaRouter.get('/', AuthMiddleware.verifyToken, (req, res) => userController.getAllTarefas(req, res));
tarefaRouter.get('/:id', AuthMiddleware.verifyToken, (req, res) => userController.getTarefasById(req, res));
tarefaRouter.post('/', AuthMiddleware.verifyToken, (req, res) => userController.createTarefas(req, res));
tarefaRouter.put('/:id', AuthMiddleware.verifyToken, (req, res) => userController.updateTarefas(req, res));
tarefaRouter.delete('/:id', AuthMiddleware.verifyToken, (req, res) => userController.deleteTarefas(req, res));

export default tarefaRouter;