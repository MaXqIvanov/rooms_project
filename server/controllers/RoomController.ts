import {Request, Response} from 'express'
const IntervalsService  = require('../service/IntervalsService');
const RoomsService  = require('../service/RoomsService');

class RoomController {

    async getRooms(req: Request, res: Response) {
        try {
            const rooms = await RoomsService.getAllRooms()
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
            const room = await RoomsService.getOneRoom(id)
            const {time, user} = await IntervalsService.getCurrentRoomTime(id)
            return res.json({time, user, room})
        } catch (error) {
            return res.status(400).json({message: error})
        }
    }
    async createRooms(req: Request, res: Response){
        try {
            const {name, title, users} = req.body
            const new_room = await RoomsService.createRoom({name, title, users})
            await IntervalsService.intervalsServiceFunction(new_room._id)
            return res.json(new_room)
        } catch (error) {
            return res.status(400).json({message: error})
        }
    }
    async updateRooms(req: Request, res: Response){
        try {
            const {...body} = req.body
            const id = req.params.id
            const current_room:{_id: string, users: string[]} | null = await RoomsService.getOneRoom(id)
            if(current_room){
                const room = await RoomsService.updateRoom({id, body})
                return res.json(room)
            }
            return res.status(404).json('Найти комнату не получилось')
        } catch (error) {
            return res.status(400).json({message: error})
        }
    }
    
    async deleteRoom(req: Request, res: Response){

        try {
            const id = req.params.id
            const room = await RoomsService.deleteRoom(id)
            await IntervalsService.clearIntervalServiceFunction(id)
            return res.status(200).json(room)
        } catch (error) {
            return res.status(400).json({message: error})
        }
    }

}
module.exports = new RoomController();
