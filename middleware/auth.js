//middleware/auth
const JWT = require('jsonwebtoken');
const config = require('config');
const JWTPrivateKey = config.get('JWT').secretkey; //REALLY NEED TO CHANGE THIS LATER
const UnauthorizedException = require('../exceptions/Unauthorized.js');

const parseToken = function(headerValue){
    if(headerValue){
        const [type, token] = headerValue.split(' '); //get the type of hopefully Bearer
        if(type === 'Bearer' && typeof token != undefined){
            return token;
        } else {
            return undefined
        }
    }
}

//now that we have the middle ware to authorize
//we can use this in all the routes needed for all student and course routes
module.exports  = (req, res, next) =>{
    //get the JWT from the request header
    const token = parseToken(req.header('Authorization'));

    //now we try and validate the jsonwebtoken
    try{
        //if we dont have a token send an error
        //using the new Unauthorized exceptions made
        if(!token) throw new UnauthorizedException('Missing Bearer Token');
        const payload = JWT.verify(token, JWTPrivateKey);
        req.user = payload;
        console.log(payload);
        next();
    } catch (err) {
        //if the JWT does not validate properly
        next(err); //hand it off to the error handler
    }
}