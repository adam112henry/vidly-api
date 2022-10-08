const mongoose = require('mongoose');
const Joi = require('joi');  // upper case because returns a class

//compile the schema into a model
const Rental = mongoose.model('Rental', new mongoose.Schema( {
    customer: {
        type: new mongoose.Schema({
            name: {type: String, required: true},
            isGold: {type: Boolean},
            phone: {type: String}
        }),
        required: true
    },
    movie: {
        type: new mongoose.Schema({
            title: {type: String, required: true},
            dailyRentalRate: {type: Number, required: true}
        }),
        required: true
    },
    rentalFee: {
        type: Number,
        min: 0
    },
    dateReturned: {
        type: Date
    },
    dateRented: {
        type: Date,
        required: true,
        default: Date.now
    }
}));

function validateRental(rental) {
    const schema = {  // data the client sends us
        customerId: Joi.objectId().required(),
        movieId: Joi.objectId().required()
    };
    
    return Joi.validate(rental, schema); 
}

module.exports.Rental = Rental;
module.exports.validate = validateRental;
