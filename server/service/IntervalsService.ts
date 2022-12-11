import { io } from "..";
import { Rooms } from "../models/rooms";

class IntervalsService {
    
    intervals:any = {};
    time:any = {};
    current_user:any = {}
    constructor() { 
        this.intervals;
        this.time
        this.current_user
    }

    async intervalsServiceFunction(id: string){
        this.time[id] = 0
        this.current_user[id] = 0
        this.intervals[id] = setInterval(async ()=> {
            // console.log(id)
            if(this.time[id] === 120){
                this.time[id] = 0
                let rooms:any = await Rooms.findById(id)
                // console.log(rooms)
                if(rooms.users.length - 1 > rooms.current_user){
                    await Rooms.updateOne({
                        _id: id
                    }, {
                        current_user: rooms.current_user + 1
                    })
                    this.current_user[id] = rooms.current_user + 1
                }
                else{
                    await Rooms.updateOne({
                        _id: id
                    }, {
                        current_user: 0
                    })
                    this.current_user[id] = 0
                }
            }
            console.log(this.time[id])
            this.time[id]++;
        }, 1000), 
        console.log(this.intervals)
        return this.intervals ;
    }
    async clearIntervalServiceFunction(id: string){
        clearInterval(this.intervals[id])
        return this.intervals
    }
    async getCurrentRoomTime(id: string){
        return {time: this.time[id], user: this.current_user[id]} 
    }

   
}
// 639488f07edc1457bad8a320
// 639488f57edc1457bad8a322
module.exports = new IntervalsService();