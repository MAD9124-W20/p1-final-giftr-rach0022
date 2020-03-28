### To Do Logically Next:
- [ ] Add any custom error Events necessary and the Express Error Handler Middleware to reduce the amount of code in routers. https://mad9124-w20.github.io/modules/week10/#express-error-handler-middleware
- [ ] Add in the User, Friend and Gift Models Needed for all database information
- [ ] Add the following in for the model to allow timestamp logging: 
````json
{
    timestamps: true
}
````
- [ ] user setter functions when making the models to allow for more accurate data input (like make all email addressed lowercase and what not)
- [ ] Add user authentication middleware and also the user routes to POST ( /auth/users create new user && /auth/tokens log in) and PATCH (to change password /auth/users/me) and GET (get currently logged in user /auth/users/me)

### NPM Packages Needed:

- [x] brcypt
- [x] debug
- [x] express
- [x] express-mongo-sanitize
- [x] jsonwebtoken
- [x] mongoose
- [x] nodemon
- [x] xss
- [ ] validator (for email address formats and what not)
- [ ] mongoose-unique-validator (for checking if emails are unique or just use coundDocuments)