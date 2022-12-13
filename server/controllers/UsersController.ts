import {Request, Response} from 'express'
const UsersService  = require('../service/UsersService');

class UsersController {

    async getUsers(req: Request, res: Response) {
        try {
            const user = await UsersService.getUsers()
            return res.json(user)
        } catch (error) {       
           return res.status(400).json({message: error})
        }

    }
    async createUser(req: Request, res: Response){
        try {
            
        } catch (error) {
            return res.status(400).json({message: error})
        }
    }

}
module.exports = new UsersController();
