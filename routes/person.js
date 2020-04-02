//routes/person
const router = require('express').Router();
const debug = require('debug')('giftr-PERSON ROUTER');
const validatePersonId = require('../middleware/validatePersonId.js');
const Person = require('../models/Person.js');
const sanitizeBody = require('../middleware/sanitizeBody.js');
const ForbiddenException = require('../exceptions/Forbidden.js');

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
router.get('/:personId', async (req, res, next) =>{
    try{
        const person = await Person.findById(personId).populate('gifts');
        if(person._id == req.user._id){
            res.status(200).send({data: person})
        } else {
            throw new ForbiddenException('', 'You do not own this person');
        }
        
    }catch(err){
        next(err);
    }
});

//create a new gift, use the info from the sanitized body but also use the info
//about the owner from the authorize middleware
router.post('/', sanitizeBody, async(req, res, next) => {
    req.sanitizedBody.owner = req.user._id; //add the user id onto the sanitized body 
    let newPerson = new Person(req.sanitizedBody);
    await newPerson.save();

    res.status(201).send({data: newPerson});
});

router.put('/:personId', sanitizeBody, async (req, res, next) =>{

});

router.patch('/:personId', sanitizeBody, async (req, res, next) =>{

});


//only the owner can do this
//will have to go through all gifts and delete them as well, possibly before deleting
router.delete('/:personId', async (req, res, next) =>{
    try{
        const deleted_person = Person.findByIdAndDelete(req.personId);
        debug(deleted_person);
        res.status(202).send({data: deleted_person});
    } catch(err){
        next(err);
    }
});

module.exports = router;
