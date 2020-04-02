// Don't forget to use NPM to install Express and Mongoose.
'use strict';

const debug = require('debug')('giftr:App');
const sanitizeMongo = require('express-mongo-sanitize');
const express = require('express');
const validatePersonId = require('./middleware/validatePersonId.js');
const authorize = require('./middleware/auth.js');
require('./startup/database.js')(); //IIFE use of the require statement
const app = express();

//we will throw the authorization middleware onto all friend and gift routes
app.use(express.json()); //allow the app to use json() parser for the requests
app.use(sanitizeMongo()); //catchall to just sanitize all data for mongo 
app.use('/auth', require('./routes/auth.js')); //use the auth route to create and cerify users turn on when implemented

//add the person and the gift routes (gift routes need to validate the person id)
//they are both authorized routes that can onlhy be accessed if the user is logged in
app.use('/api/people', authorize, require('./routes/person.js'));
app.use('/api/people', authorize, require('./routes/gift.js'));

//register the error handler and the error logger (to be done)
app.use(require('./middleware/logErrors.js')); //log the errors before we pass it to the middle ware
app.use(require('./middleware/errorHandler.js'));


const port = process.env.PORT || 3030;
app.listen(port, () => debug(`Server listening on port: ${port}`));