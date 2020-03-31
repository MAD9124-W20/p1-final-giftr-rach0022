//first require all modules necessary
const router = require('express').Router();
const User = require('../models/User.js'); //grab the user model
const sanitizeBody = require('../middleware/sanitizeBody.js'); //grab the sanitization middleware to nuke the bodys of all request
const authorize = require('../middleware/auth.js'); //added authorization middleware using error handler and custome exceptions
const UnauthenticatedException = require('../exceptions/Unauthenticated.js')

//create a post route that will taken in a user email, password, etc
//from the request body we will verify if the email is unique and then create the user
router.post('/users', sanitizeBody, async(req, res, next) =>{
    //we sanitize the body using our middleware and strip off any unnecessary/ malicious data
    new User(req.sanitizedBody)
        .save() //save them to the database
        .then(newUser => res.status(201).send({data: newUser})) //send the info back to the user with the status code of created
        .catch(next) //send the error to our error handler in the next function
});

//now to actually 'log in' the user by getting the meail and password from the request body
//and then send back the Bearer Authorization token if it succeeds which will be used
//to verify the user is the user on all subsequent routes
router.post('/tokens', sanitizeBody, async(req, res, next) =>{
    //user object destucturing to get the email and the password
    const {email, password} = req.sanitizedBody;
    try{
        const user = await User.authenticate(email, password);
        if(!user) throw new UnauthenticatedException('Incorrect email or password');
        res.status(202).send({data: {token: user.generateAuthToken()}}) //send back the status code of acceptted
    } catch(err){
        next(err);
    }
});

//get the jwt from the request header, validate the jwt and then send back the user data
//that already has its sensitive info redacted in the user model
//using the authorize middleware as this is a password protected route
router.get('/users/me', authorize, async(req, res, next) =>{
    try{
        let user = await User.findById(req.user._id); //get the user id from the request appeded by the authorization middleware
        res.status(200).send({data: user}); //send back the user info
    } catch(err){
        next(err);
    }
});

module.exports = router;