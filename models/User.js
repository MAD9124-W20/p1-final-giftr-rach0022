//43quire all the modules needed
// const debug = require('debug')('giftr:user-model')
const config = require('config');
const bcrypt = require('bcrypt');
// const saltRounds = 14;
const mongoose = require('mongoose');
const validator = require('validator'); //checks if the email is the right format currently
const uniqueValidator = require('mongoose-unique-validator'); //checks if the email is unique
const JWT = require('jsonwebtoken');
const JWTConfig = config.get('JWT');
const JWTPrivateKey = JWTConfig.secretkey;

//create the schema definition : testing password articforce42
const schema = new mongoose.Schema({
    firstName: {
        type: String,
        trim: true,
        maxlength: 64,
        required: true
    },
    lastName: {
        type: String,
        trim: true,
        maxlength: 64,
        required: true
    },
    email: {
        type: String,
        trim: true,
        maxlength: 512,
        required: true,
        unique: true,
        set: value => value.toLowerCase(),
        validate: {
            validator: value => validator.isEmail(value),
            message: props => `${props.value} is not a valid email address.`
        }
    },
    password: {
        type: String,
        trim: true,
        maxlength: 70,
        required: true
    }
}, {
    //make mongoose use unix time, taken form mongoose docs
    timestamps: true //{
        //currentTime: () => Math.floor(Date.now() / 1000)
    // }
});

//create a method on the user to generate the Authorization token
schema.methods.generateAuthToken = function(){
    console.log(JWTConfig);

    return JWT.sign({_id: this.id}, JWTPrivateKey); //change this later to not using a variable
};

//create a method on the user to authenticate them 
//this is a static method that we can use without actually creating an instance of the user model
schema.statics.authenticate = async function(email, password){
    //first check if the email is right
    const user = await this.findOne({email}); //using json shorthand of email: email
    
    //now create a hashedpassword, which if the user was found its the user.password otherwise
    //we will use a dummy password that has a similar length for comparison checks
    //as to allow no users to figure out if their password is right or not by time taken checking the password
    const hashedPassword = user ? user.password : `$2b$${JWTConfig.saltRounds}$invalidusernameaaaaaaaaa4R36Y7Uaaaaaaaaaaaaaaaaaaaaaa`;
    // debug(password, user.password);
    const passwordsDidMatch = await bcrypt.compare(password, hashedPassword); //now use the bcrypt compare function to check the supplied password vs the hashed
    return passwordsDidMatch ? user : null; //now return the user or null if the passwordsdid match
};

//fucntion to encrypt the password when a newUser is saved into the database
schema.pre(['save'], async function(next) {

    //if the password is not modified, go to the next function and do not encrypt it again
    if(!this.isModified('password')){
        return next();
    }

    //encrypting the password if it is modified and then calling the next function in the stack
    this.password = await bcrypt.hash(this.password, JWTConfig.saltRounds);
    next();
});

//function that handles what user data is returned when they are converted into a JSON
//object to be sent as a response from the server. we need to redact the passsword, versioning, 
//user _id and return the rest
schema.methods.toJSON = function(){
    const user = this.toObject(); //taken from the mongoose docs and Robert

    delete user.password;
    delete user.__v;
    delete user._id;
    return user;
}

schema.plugin(uniqueValidator, {
    message: props =>
        props.path === 'email'
            ? `The email address '${props.value}' is already registered`
            : `The ${props.path} must be unique '${props.value}' is already in use`
});
module.exports = mongoose.model('User', schema);