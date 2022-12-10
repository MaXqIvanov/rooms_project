import { Users } from "../models/users";
class UsersController {

    async getUsers(req: any, res: any) {
        try {
            const user = await Users.find()
            console.log(user)

            return res.json(user)
        } catch (error) {       
           return res.status(400).json({message: error})
        }

    }
    async createUser(req: any, res: any){
        try {
            
        } catch (error) {
            return res.status(400).json({message: error})
        }
    }

}
module.exports = new UsersController();
