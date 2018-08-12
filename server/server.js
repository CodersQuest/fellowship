const express = require('express');
const socket = require('socket.io');
const bodyParser = require('body-parser');
const db = require('../database/db');
const session = require('express-session');
const passport = require('passport');
const local = require('passport-local');


const app = express();
const PORT = 3000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const server = app.listen(PORT, () => {
  console.log(`listening on port ${PORT} you peasant!!!`)
});

// Socket.io setup
const io = socket(app)

