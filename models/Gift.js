const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        minlength: 4,
        maxlength: 64
    },
    price: {
        type: Number, //integer of cents maybe use a setter
        min: 100,
        default: 1000
    },
    imageURL: {
        type: String,
        trim: true,
        minlength: 1024
    },
    store: {
        name: {
            type: String,
            trim: true,
            maxlength: 254
        },
        productURL: {
            type: String,
            trim: true,
            maxlength: 1024
        }
    }
},{
    timestamps: true
});

module.exports = mongoose.model('Gift', schema);