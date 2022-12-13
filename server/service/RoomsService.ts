import { Rooms } from "../models/rooms";

class RoomsService {
    constructor() { 
    }

    async getAllRooms(id: string){
        return await Rooms.find()
    }
    async getOneRoom(id: string){
        return await Rooms.findById({ _id: id })
    }
    async createRoom({name, title, users}: {name: string, title: string, users: []}){
        return await Rooms.create({ name, title, users })
    }
    async updateRoom({id, body}: {id: string, body: object }){
        console.log(body)
        return await Rooms.findOneAndUpdate({
            _id: id
        },{
            ...body
        })
    }
    async deleteRoom(id: string){
        return await Rooms.findByIdAndRemove({ _id: id })
    }
}
module.exports = new RoomsService();