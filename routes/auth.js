//first require all modules necessary
const router = require('express').Router();
// const debug = require('debug')('giftr:authorization-router');
const logger = require('../startup/logger.js');
const User = require('../models/User.js'); //grab the user model
const sanitizeBody = require('../middleware/sanitizeBody.js'); //grab the sanitization middleware to nuke the bodys of all request
const authorize = require('../middleware/auth.js'); //added authorization middleware using error handler and custome exceptions
const UnauthenticatedException = require('../exceptions/Unauthenticated.js')

//create a post route that will taken in a user email, password, etc
//from the request body we will verify if the email is unique and then create the user
router.post('/users', sanitizeBody, async(req, res, next) =>{
    //we sanitize the body using our middleware and strip off any unnecessary/ malicious data
    new User(req.sanitizedBody)
        .save() //save them to the database getting the password encrypted
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
        const user = await User.findById(req.user._id); //get the user id from the request appeded by the authorization middleware
        res.status(200).send({data: user}); //send back the user info
    } catch(err){
        next(err);
    }
});

//now to create the Update password PATCH route for the /auth/users/me that is an authorized route
//that will sanitize all incoming request body (hint middleware) that will confirm the
//user is who they say they are and then update the password (encyption will take place
//in the user model in the pre save method)
router.patch('/users/me', sanitizeBody, authorize, async(req, res, next) =>{
    try{
        //coding happy path first (user is logged in use only new password)
        const {password} = req.sanitizedBody;
        const user = User.find(req.user._id);
        console.log(user);

        user.password = password;
        user.save().then((err, data)=> {
            console.log('user is saved');
        });
        //now that we have the user just update the password and save
        res.status(200).send({data: user});
        

        // const patchedUser = await User.findByIdAndUpdate( //because we already found the user in the authentication we just need to update
        //     req.user._id,
        //     {"password":newPassword}, //get the new password from the sanitized body
        //     {
        //         new: true,
        //         runValidators: true,
        //         useFindAndModify: false //taken from mongoDocs
        //     },
        //     (err, data) =>{
        //         // next(err);
        //         if(err) next(err);
        //         debug(err, data); //for now find out what to do
        //         //save the user and encrypt the password
        //         // data.save();
        //         res.status(200).send({data}) //send the status code of okay and the updated info for now
        //     });
        //because i want the middleware triggered by save (encrypting the password)
        //i want to use a different approach inspired by here: https://mongoosejs.com/docs/2.7.x/docs/updating-documents.html

        //authenticate the user with their original password/ email to be sure
        // const user = await User.authenticate(email, password);
        // if(!user) throw new UnauthenticatedException();

        //now locate the actual document, modify the password and save it
        // const patchedUser = User.findById(req.user._id, (err, data) =>{
        //     if(err) next(err);
        //     //make sure the currently logged in user is the same as the user currently logged in
        //     if(data.id != req.user._id) throw new UnauthenticatedException('Wrong user logged in');
        //     data.password = newPassword;
        //     debug(data.password, newPassword);
        //     data.save();
        //     debug(data.password, newPassword);
        //     res.status(200).send({data}) //send the status code of 200 to say ok
        // });
    } catch(err){
        next(err);
    }
});

module.exports = router;