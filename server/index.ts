import { Request, Response } from "express";
import * as path from "path";
require('dotenv').config()
const cors = require('cors')
const express = require('express');
const app = express();
const router = require('./routes')
const mongoose = require('mongoose');
const db = `mongodb+srv://Web_Liter:${process.env.MONGO_DB_PASS}@cluster0.eyxtsmd.mongodb.net/?retryWrites=true&w=majority`
const port = 5006;
const server = require('http').createServer(app)
const IntervalsService  = require('./service/IntervalsService');
export const io = require('socket.io')(server, { cors: {origin: "*"}})
app.use(express.static(path.resolve('../client/build')));
app.use(cors())
app.use(express.json({limit: '100mb'}))
app.use(express.urlencoded());
app.use('/api', router)
app.get('*', (req: Request, res: Response) => {
    res.sendFile(path.resolve("../") + "/client/build/index.html");
});

const setup = ()=>{
    try {
        mongoose.connect(db).then((res: Response)=> console.log('Connect is success'))
        .catch((e:object)=> console.log(e))
        server.listen(port, () => {
            console.log('We are live on ' + port);
        });        
    } catch (error) {
        console.log(error)
    }
}

setup()