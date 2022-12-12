import { Users } from "../models/users";
import {Request, Response} from 'express'
class UsersController {

    async getUsers(req: Request, res: Response) {
        try {
            const user = await Users.find()
            console.log(user)

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
