//routes/gifts
const router = require('express').Router();
const debug = require('debug')('giftr-GIFT ROUTER');
const validateGiftId = require('../middleware/validateGiftId.js');
const validatePersonId = require('../middleware/validatePersonId.js');
const Gift = require('../models/Gift.js');
const Person = require('../models/Person.js');
const sanitizeBody = require('../middleware/sanitizeBody.js');
const isPersonOwnedOrShared = require('../middleware/isOwnedOrShared.js');

//i will throw validate person id on the entire gift router
//connected from /api/people/:id/gifts
router.use('/:personId', validatePersonId);
router.use('/:personId', isPersonOwnedOrShared)
router.use('/:personId/gifts/:giftId', validateGiftId); //make sure the gift id is validated

//create a new gift
//becuase this is run after the person id is validated, the body is sanitized and we
//have checked if the user owns the gift or not we can just code the happy path
router.post('/:personId/gifts', sanitizeBody, async (req, res, next) =>{
    let newGift = new Gift(req.sanitizedBody);
    await newGift.save();
    await addGiftToPerson(req, newGift);
    res.status(201).send({data: newGift}); //send a status code of 201 to say created
});

//update a gift with new values
//because the personId is verified, the giftId is verified, the user is authorized
//and the request is sanitized we have allthe validation done so now we can just code the happy path
//of update the gift
router.patch('/:personId/gifts/:giftId', sanitizeBody, async (req, res, next) =>{
    // res.status(200).send({data: req.params});
    debug(req.giftId);
    const updatedGift = await Gift.findByIdAndUpdate(
        req.giftId, 
        req.sanitizedBody,
        {
            new: true,
            runValidators: true,
            useFindAndModify: false
        }
    );
    res.status(200).send({data: updatedGift});
});

//delete a gift from the database
router.delete('/:personId/gifts/:giftId', async(req, res, next)=>{
    try{
        const deleted_gift = await Gift.findByIdAndRemove(req.giftId);
        debug(deleted_gift);
        res.status(202).send({data: deleted_gift});
    } catch(err){
        next(err);
    }
});

//helper function to add the created /patched gift to the personId supplied after all validation checks
//takes in one parameter of the req (req.user, req.personId, req.giftId)
async function addGiftToPerson(request, gift){
    //because the ids are validated at this point I can just code the happy path (find the person, add the data save the person)
    let friend = await Person.findById(request.personId);
    //when the index of the gift id is -1 it means we  do not have this gift in the array
    debug(friend.gifts.indexOf(gift._id));
    if(friend.gifts.indexOf(gift._id) == -1){
        friend.gifts.push(gift._id);
        await friend.save();
    }
}

module.exports = router;