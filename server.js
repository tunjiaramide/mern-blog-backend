const http = require('http');
const app = require('./src/app');
const mongoose = require('mongoose')
const PORT = 5000;
const express = require('express');

const server = http.createServer(app)
require('dotenv').config()

mongoose.connect(process.env.DATABASE_URL, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true
    })
    .then(() => console.log('Database connected'))
    .catch((err) => console.log('error in database' + err))

server.listen(PORT, () => {
    console.log('Server is running on port 5000')
})