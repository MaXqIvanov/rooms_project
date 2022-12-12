import { Rooms } from "../models/rooms";
import {Request, Response} from 'express'
const IntervalsService  = require('../service/IntervalsService');

class RoomController {

    async getRooms(req: Request, res: Response) {
        try {
            const rooms = await Rooms.find()
            console.log(rooms)

            return res.json(rooms)
        } catch (error) {       
           return res.status(400).json({message: error})
        }

    }
    async getOneRoom(req: Request, res: Response){
        try {
            const id = req.params.id
            if(IntervalsService.time[id] === undefined){
                await IntervalsService.intervalsServiceFunction(id)
            }
            const room = await Rooms.findById({ _id: id })
            const {time, user} = await IntervalsService.getCurrentRoomTime(id)
            console.log(time)
            return res.json({time, user, room})
        } catch (error) {
            return res.status(400).json({message: error})
        }
    }
    async createRooms(req: Request, res: Response){
        try {
            const {name, title, users} = req.body
            const new_room = await Rooms.create({
                name,
                title,
                users,
            })
            let time = 0
            await IntervalsService.intervalsServiceFunction(new_room._id)
            return res.json(new_room)
        } catch (error) {
            return res.status(400).json({message: error})
        }
    }
    async updateRooms(req: Request, res: Response){
        try {
            const {users} = req.body
            const id = req.params.id
            console.log(id)
            console.log(users)
            const current_room:{_id: object, users: string[]} | null = await Rooms.findOne(
                {
                    where: {_id: id},
                },
              
            )
            if(current_room){
                console.log('work')
                const new_users = [...current_room.users, users]
                const room = await Rooms.findOneAndUpdate({
                    _id: id
                },{
                    users: new_users
                })
                console.log("this is room")
                console.log(room)
                return res.json(room)
            }
            return res.status(200).json('Найти комнату не получилось')
        } catch (error) {
            return res.status(400).json({message: error})
        }
    }
    
    async deleteRoom(req: Request, res: Response){

        try {
            const id = req.params.id
            const room = await Rooms.findByIdAndRemove({
                _id: id
            })
            console.log(id)
            var mine:any = {};
            let dddd;
            await IntervalsService.clearIntervalServiceFunction(id)
            return res.status(200).json(room)
        } catch (error) {
            return res.status(400).json({message: error})
        }
    }

}
module.exports = new RoomController();
