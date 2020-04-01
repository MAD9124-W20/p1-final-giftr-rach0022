//routes/gifts
const router = require('express').Router();
const debug = require('debug')('giftr-GIFT ROUTER');
const validateGiftId = require('../middleware/validateGiftId.js');
const Gift = require('../models/Gift.js');
const sanitizeBody = require('../middleware/sanitizeBody.js');

//i will throw validate person id on the entire gift router
//connected from /api/people/:id/gifts

//create a new gift
router.post('/', sanitizeBody, async (req, res, next) =>{

});

//update a gift with new values
router.patch('/:giftId', sanitizeBody, validateGiftId, async (req, res, next) =>{

});

//delete a gift from the database
router.delete('/:giftId', validateGiftId, async(req, res, next)=>{
    try{
        const deleted_gift = await Gift.findByIdAndRemove(req.giftId);
        debug(deleted_gift);
        res.status.send({data: deleted_gift});
    } catch(err){
        next(err);
    }
});