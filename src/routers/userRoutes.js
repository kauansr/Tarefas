import express from 'express'
import UserController from '../controllers/usersController.js';
import AuthMiddleware from '../middlewares/jwtEncode.js';

const userRouter = express.Router();

const userController = new UserController();


userRouter.get('/', AuthMiddleware.verifyToken, (req, res) => userController.getUsers(req, res));
userRouter.get('/:id',  AuthMiddleware.verifyToken, (req, res) => userController.getUserById(req, res));
userRouter.post('/', (req, res) => userController.createUser(req, res));
userRouter.put('/:id',  AuthMiddleware.verifyToken, (req, res) => userController.updateUser(req, res));
userRouter.delete('/:id',  AuthMiddleware.verifyToken, (req, res) => userController.deleteUser(req, res));

userRouter.post('/login', (req, res) => userController.login(req, res))

export default userRouter;