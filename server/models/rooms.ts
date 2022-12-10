import mongoose from "mongoose";

const Schema = mongoose.Schema

const RoomsSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    users: {
        type: Array,
        default: [], 
    },
    current_user: {
        type: Number,
        default: 0
    },
})

export const Rooms = mongoose.model('Rooms', RoomsSchema)
