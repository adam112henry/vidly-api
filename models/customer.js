const mongoose = require('mongoose');
const Joi = require('joi');  // upper case because returns a class

//compile the schema into a model
const Customer = mongoose.model('Customer', new mongoose.Schema( {
    name: { 
        type: String, 
        required: true,
        minLength: 3,
        maxlength: 50
    },
    isGold: {
        type: Boolean,
        default: false
    },
    phone: {
        type: String,
        default: "xxx-xxx-xxxx"
    }
}));

function validateCustomer(customer) {
    const schema = {
        name: Joi.string().min(3).required(),
        phone: Joi.string(),
        isGold: Joi.boolean()
    };
    
    return Joi.validate(customer, schema); 
}

module.exports.Customer = Customer;
module.exports.validate = validateCustomer;
