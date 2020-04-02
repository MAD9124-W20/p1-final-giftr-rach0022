//routes/person
const router = require('express').Router();
const debug = require('debug')('giftr-PERSON ROUTER');
const validatePersonId = require('../middleware/validatePersonId.js');
const Person = require('../models/Person.js');
const sanitizeBody = require('../middleware/sanitizeBody.js');
// const ForbiddenException = require('../exceptions/Forbidden.js');
const isPersonOwnedOrShared = require('../middleware/isPersonOwnedOrShared.js');
const isOwnedByUser = require('../middleware/isOwnedByUser.js');

//possibly add an is owner middleware
router.use('/:personId', validatePersonId);

//gift ideas not populated
router.get('/', async (req, res, next) =>{
    const ownedPeople = await Person.find({owner: req.user._id}); //find all people owned by the user
    const sharedPeople = await Person.find({sharedWith: req.user._id}); //find all people shared with the user
    let data = [...ownedPeople, ...sharedPeople]; //spread both arrays together and send it back to the user
    res.status(200).send({data}); //send a status code of 200 for ok
});


//gift ideas populated
//is always on happy path now becuase of all the validation middleware
//only if the user is authroized, validated id and checked if the user owns it will
//it reach this code to findbyId
router.get('/:personId', isPersonOwnedOrShared, async (req, res, next) =>{
    // try{
    const person = await Person.findById(req.personId).populate('gifts');
    debug(req.personId, person);
        //if the user owns the person or the person is shared with the user
        // if(person.owner == req.user._id || person.sharedWith.findIndex(id => id == req.user._id) != -1){
    res.status(200).send({data: person})
    //     } else {
    //         throw new ForbiddenException('', 'You do not own/ share this person');
    //     }
        
    // }catch(err){
    //     next(err);
    // }
});

//create a new gift, use the info from the sanitized body but also use the info
//about the owner from the authorize middleware
router.post('/', sanitizeBody, async(req, res, next) => {
    req.sanitizedBody.owner = req.user._id; //add the user id onto the sanitized body 
    let newPerson = new Person(req.sanitizedBody);
    await newPerson.save();

    res.status(201).send({data: newPerson});
});

//NOT WORKING, WILL NUKE THE PROPERTIES OF THE PERSON
router.put('/:personId', isPersonOwnedOrShared, sanitizeBody, async (req, res, next) =>{
    //how to check if the person owns the document being updated
    //put the owner on the sanitized body from the auth token
    req.sanitizedBody.owner = req.user._id;
    debug(req.sanitizedBody, req.personId);
    const person = await Person.findByIdAndUpdate(
        req.personId,
        req.sanitizedBody,
        {
            new: true,
            runValidators: true,
            overwrite: true,
            useFindAndModify: false //taken from mongo docs
        },
        (err, data) => {
            debug(err, data);
            res.status(200).send({data})
        }
    )
});

router.patch('/:personId', isPersonOwnedOrShared, sanitizeBody, async (req, res, next) =>{
    const person = await Person.findByIdAndUpdate(
        req.personId,
        req.sanitizedBody,
        {
            new: true,
            runValidators: true,
            useFindAndModify: false //taken from mongo docs
        },
        (err, data) => {
            debug(err, data);
            if(err) next(err); //if an error occurs send it to error handler
            res.status(200).send({data})
        }
    )
});


//only the owner can do this
//will have to go through all gifts and delete them as well, possibly before deleting
router.delete('/:personId', isOwnedByUser, async (req, res, next) =>{
    try{
        const deleted_person = await Person.findByIdAndDelete(req.personId);
        debug(deleted_person);
        res.status(202).send({data: deleted_person});
    } catch(err){
        next(err);
    }
});

module.exports = router;
