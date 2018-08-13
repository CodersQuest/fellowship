const express = require('express');
const socket = require('socket.io');
const bodyParser = require('body-parser');
const db = require('../database/db');
const session = require('express-session');
const passport = require('passport');
const local = require('passport-local');


const app = express();
const port = process.env.PORT || 3000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const server = app.listen(port, () => {
  console.log(`listening on port ${port} you peasant!!!`)
});

// Socket.io setup
const io = socket(server);

io.on('connection', (socket) => {
  console.log('made socket connection');
});