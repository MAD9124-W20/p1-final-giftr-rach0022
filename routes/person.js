//routes/person
const router = require('express').Router();
const debug = require('debug')('giftr-PERSON ROUTER');
const validatePersonId = require('../middleware/validatePersonId.js');
const Person = require('../models/Person.js');
const sanitizeBody = require('../middleware/sanitizeBody.js');

//possibly add an is owner middleware


//gift ideas not populated
router.get('/', async (req, res, next) =>{

});


//gift ideas populated
router.get('/:id', validatePersonId, async (req, res, next) =>{

});

router.post('/', sanitizeBody, async(req, res, next) => {

});

router.put('/:id', sanitizeBody, validatePersonId, async (req, res, next) =>{

});

router.patch('/:id', sanitizeBody, validatePersonId, async (req, res, next) =>{

});


//only the owner can do this
//will have to go through all gifts and delete them as well, possibly before deleting
router.delete('/:id', validatePersonId, async (req, res, next) =>{
    try{
        const deleted_person = Person.findByIdAndDelete(req.personId);
        debug(deleted_person);
        res.status(202).send({data: deleted_person});
    } catch(err){
        next(err);
    }
});

module.exports = router;
