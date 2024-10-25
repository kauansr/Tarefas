import UserService from "../services/userService.js";


const userService = new UserService();

class UserController {
    constructor() {
    }

    async login(req, res) {
        const fields = req.body;
        try{
            const result = await userService.login(fields);
            res.status(200).json(result)
        } catch (error){
            console.log('Erro', error.message);
            res.status(400).json({error: error.message})
        }
      }

    async getUsers(req, res) {
        const userid = req.user.id;
        try{
            const users = await userService.getAllUsers(userid);
            res.status(200).json(users)
        } catch (error){
            console.log('Erro', error.message);
            res.status(400).json({error: error.message})
        }
    }

    async getUserById(req, res) {
        const {id} = req.params;
        try{
            const user = await userService.getUserById(id);
            res.status(200).json(user);
        } catch (error) {
            console.log('Erro', error.message);
            res.status(400).json({error: error.message})
        }
    }

    async createUser(req, res) {
        const fields = req.body
        try {
            const newUser = await userService.insertUsers(fields);
            res.status(201).json(newUser);
          } catch (error) {
            console.error('Erro:', error.message);
            res.status(400).json({ error: error.message });
          }
    }

    async updateUser(req, res) {
        const { id } = req.params;
        const fields = req.body;

        try{
            const user = await userService.updateUserById(id, fields);
            res.status(200).json(user);
        } catch (error) {
            console.log('Erro', error.message);
            res.status(400).json({error: error.message})
        }
    }

    async deleteUser(req, res) {
        const { id } = req.params;
        try{
            const result = await userService.deleteUserById(id);
            res.status(200).json(result);
        } catch (error) {
            console.log('Erro', error.message);
            res.status(400).json({error: error.message})
        }
    }
}

export default UserController;
