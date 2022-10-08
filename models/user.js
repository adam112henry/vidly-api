const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const config = require('config');

const userSchema  = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 1024
    },
    isAdmin: Boolean
});

userSchema.methods.generateAuthToken = function() {
    // cannot use arrow function because of the reference to 'this'
    // 'this' in an arrow function represents the calling function
    // here it will represent the user object
    // when you define a method on an object you should NOT use the arrow function
    const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, config.get('jwtPrivateKey'));
    return token;
};

//compile the schema into a model
const User = mongoose.model('User', userSchema);

function validateUser(user) {
    const schema = {  // data the client sends us
        name: Joi.string().required(),
        password: Joi.string().required(),
        email: Joi.string().required().email()
    };
    
    return Joi.validate(user, schema); 
}

module.exports.User = User;
module.exports.validate = validateUser;
