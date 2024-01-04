//  loads .env file contents to process.env by defaults
require('dotenv').config()

// 2. import express
const express = require('express')

// import cors
const cors = require('cors');
const router = require('./Router/routes');
const { default: mongoose } = require('mongoose');

//import middleware
const appMiddleware = require('./Middlewares/appMiddleware') 

// create application using express
const serverApp = express();

// use cors
serverApp.use(cors());
serverApp.use(express.json());
serverApp.use(appMiddleware)
// mongo db connecrtion
require('./DB/connection')

// defining port
const PORT = 5000 || process.env.PORT

serverApp.listen(PORT,(req,res)=>{
    console.log('listening on port :'+PORT);
})


// http get resolvings to http://localhost:5000
serverApp.get('/',(req,res)=>{
    res.send('<h1>Hui</h1>')
})
serverApp.post('/',(req,res)=>{
    res.send('<h1>Hui</h1>')
})

serverApp.use('/',router)
serverApp.use('/uploads',express.static('./uploads'))

// import router
require('./Router/routes')