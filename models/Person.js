const mongoose = require('mongoose');
const User = require('../models/User.js');
const Gift = require('../models/Gift.js');

const schema = new mongoose.Schema({
    name: {
        type: String, 
        trim: true,
        required: true, 
        maxlength: 254
    },
    birthdate: {
        type: Date, 
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true,
        // default: this //CHANGE THIS
    },
    sharedWith: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    gifts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Gift'
    }],
    imageURL: {
        type: String,
        trim: true,
        maxlength: 1024
    }
},{
    timestamps: true
});

// schema.pre(['find', 'findByIdAndUpdate'], async function(next){
//     //first get the document using the this.getQuery() from mongoose docs
//     data = await this.model.findOne(this.getQuery());
//     if(data.owner == )
//     next();
// })

module.exports = mongoose.model('Person', schema);