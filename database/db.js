const express = require('express');
const mongoose = require('mongoose');

const DBConfig = require('../config/config').mlabdb.uri;


// Conncet to Mongo
mongoose.connect(DBConfig)
  .then(() => {
    console.log('MongoDB Connected...');
  }).catch((err) => {
    console.log(err);
  });
