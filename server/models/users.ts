import mongoose from "mongoose";

const Schema = mongoose.Schema

const UsersSchema = new Schema({
    name: {
        type: String,
        required: true
    }
})

export const Users = mongoose.model('Users', UsersSchema)
