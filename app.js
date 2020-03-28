// Don't forget to use NPM to install Express and Mongoose.
'use strict';

const debug = require('debug')('giftr');
const sanitizeMongo = require('express-mongo-sanitize');
const express = require('express');
require('./startup/database.js')(); //IIFE use of the require statement
const app = express();

//we will throw the authorization middleware onto all friend and gift routes
app.use(express.json()); //allow the app to use json() parser for the requests
app.use(sanitizeMongo()); //catchall to just sanitize all data for mongo 
// app.use('/auth', require('./routes/auth.js')); //use the auth route to create and cerify users turn on when implemented

const port = process.env.PORT || 3030;
app.listen(port, () => debug(`Server listening on port: ${port}`));