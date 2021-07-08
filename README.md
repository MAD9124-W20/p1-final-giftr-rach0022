## - Important Links:
- AWS link: EC2Co-EcsEl-1AH0Z1LDB9VES-797724042.us-east-1.elb.amazonaws.com
- Demo Link: https://giftr.mad9124.rocks

### Bugs: 
- [x] Whenever I send a request from a website all the data I send is null
- [x] PUT person will verify correctly but delete all required properties for some reason, did not work in assignment 3 try and get working code from robert || started working after i deleted the callback function
- [x] DISABLED PATCH Gift route becuase i do not understand how to update subdocuments
- [x] PATCH user route not working without user giving email and password to reauthenticate || await user.save().then() is not a function WHAT?? || jeez.. forgot await
- [x] AWS is not working from postman but when testing with cURL commands like below it works. Need to ask Robert:  || DONT USE DOCKER NPM COMMAND i might have messed it up
- [x] i do not get unauthorized when trying to delete a person i do not own i believe || nope it was working I was just using the wrong id so it always came up as did not exist because it did not exist
````zsh
curl -H "Content-Type: application/json" --data-ascii "@req.json" "EC2Co-EcsEl-1AH0Z1LDB9VES-797724042.us-east-1.elb.amazonaws.com/auth/users"
````
- req.json can contain whatever request I need at the time, need to find out how to add authorization headers in cURL to test if i keep having issues

### Changes to Make For the Final:
- [x] make gifts a sub document, ask robert to go over what changes i need to make
    - change [x] PUT [x] PATCH [x] DELETE gift routes || ASK Robert about my patch method
    - change [x] get/:id person route to not populate gifts, as it will already be populated
    - change [x] validate gift id middleware to now take reference to the fact gifts are sub documents
- [ ] update the validate id function to use mongoose.Types.ObjectId.isValid(id)
- [x] use winston for logging 
- [x] use NODE_ENV to set enviroment variables
- [x] use configuration settings based on MAD9124 Week 11 Production testing
- [x] Generate a JWT key using node genKey.js
- [x] start compressing the payloads by using the npm package compression
- [x] update all my security middleware as per the week 11 guidelines
- [x] look into helmet to see if it worth using
- [ ] change PATCH auth route to change password only checking if the user is logged in and then change the password (do not make them give the old password and email to relog in)

### Questions for Robert:
- [ ] Should I be removing the owner property out of PATCH?
- [ ] Should I be changing the password if and only if I am supplied the correct email and original password as well
- [ ] Should i be using as much middleware as I am (checking if the data is owned or shared, etc)
- [ ] Check how i should check two indivudal paramter ids
- [ ] How Do i set the default owner of a person to the user that is currently logged in

### Next Steps Logically:
- [x] go through the testing with postman module on the mad9124 website
- [ ] add an expiry to the JSONWebTokens (about an hour/ day) to require the user to log in
- [x] make sure you test all happy/ failure paths for the program (user logged in vs not, wrong user logged in, wrong person id, wrong gift id, expired authorization token)
- [x] remove any debug statements with sensitive user data
- [x] make a checklist of the requirements and see if its fufilled

### Person Router:
- [x] Implemented
- [x] GET all people (owned by user)
- [x] GET single person (owned by user)
- [x] POST create a person
- [x] PUT replace a person
- [x] PATCH update a person (except for his owner )
- [x] DELETE a single person, owned by the user
- [x] users should only be able to see their own people (check the authorize middleware userid, vs the gift person owner id, possibly use a map function to trim them all out)
- [x] create middleware to check if a person is owned by a user or is a person is owned/shared by a user

### Gift Router:
- [x] Implemented
- [x] POST create a gift || make it so that the gift is automatically added to the person id from the link
- [x] PATCH update a gift || for some reason the gift id will be validated by the validate person id middleware
- [x] DELETE a gift 
- [x] users should only be able to see and act on gifts associated to their people

## Auth Router:
- [x] Implemented
- [x] POST register user
- [x] GET currently logged in user
- [x] PATCH update password
- [x] POST login user (generate token)

### NPM Packages Needed:
- [x] brcypt
- [x] debug
- [x] express
- [x] express-mongo-sanitize
- [x] jsonwebtoken
- [x] mongoose
- [x] nodemon
- [x] xss
- [x] validator (for email address formats and what not)
- [x] mongoose-unique-validator (for checking if emails are unique or just use coundDocuments)
- [x] compression
- [x] cors
- [x] helmet
- [x] winston
- [x] config
 
### (DROPPED) To Do Logically Next:
- [x] Add any custom error Events necessary and the Express Error Handler Middleware to reduce the amount of code in routers. https://mad9124-w20.github.io/modules/week10/#express-error-handler-middleware
- [x] Add in the User model and router module (to test user model)
- [x] Add in the person and the gift models
- [x] Add in middleware to validate the person and gift id (so people cant tamper with our database when we update the info)
- [x] Add the following in for the model to allow timestamp logging: 
````json
{
    timestamps: true
}
````
- [x] user setter functions when making the models to allow for more accurate data input (like make all email addressed lowercase and what not)
- [x] Add user authentication middleware and also the user routes to POST ( /auth/users create new user && /auth/tokens log in) and GET (get currently logged in user /auth/users/me)
- [x] add PATCH route (to change password /auth/users/me) || having difficulties, first get the happy path (user is logged in and supplies a new password) working first, then add in the check for the old password and also the email for the account || nevermind while coding the happy path i figured out how to make sure the usr is the same as the logged in user and make the user have to supply the email and password
- [ ] now to add the person model and a gift model to test out the person and gift routes
- [x] image url is not working for either paths, make sure it is capitilized right