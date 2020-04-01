### To Do Logically Next:
- [x] Add any custom error Events necessary and the Express Error Handler Middleware to reduce the amount of code in routers. https://mad9124-w20.github.io/modules/week10/#express-error-handler-middleware
- [x] Add in the User model and router module (to test user model)
- [x] Add in the person and the gift models
- [ ] Add in middleware to validate the person and gift id (so people cant tamper with our database when we update the info)
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