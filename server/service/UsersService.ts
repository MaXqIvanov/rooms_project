import { Users } from "../models/users";

class UsersService {
    constructor() { 
    }

    async getUsers(id: string){
        return await Users.find()
    }
}
module.exports = new UsersService();