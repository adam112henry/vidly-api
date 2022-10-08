const mongoose = require('mongoose');
const Joi = require('joi');  // upper case because returns a class
const {genreSchema} = require('./genre');

//compile the schema into a model
const Movie = mongoose.model('Movie', new mongoose.Schema( {
    title: { 
        type: String, 
        required: true,
        trim: true,
        minLength: 5,
        maxlength: 255
    },
    genre: {
        type: genreSchema,
        required: true
    },
    numberInStock: {
        type: Number,
        required: true,
        min: 0,
        default: 0
    },
    dailyRentalRate: {
        type: Number,
        required: true,
        min: 0,
        default: 0
    }
}));

function validateMovie(movie) {
    const schema = {  // data the client sends us
        title: Joi.string().min(5).max(255).required(),
        genreId: Joi.objectId().required(),  // note this is different than the mongoose schema (the persistent model)
        numberInStock: Joi.number().min(0).required(),
        dailyRentalRate: Joi.number().min(0).required()
    };
    
    return Joi.validate(movie, schema); 
}

module.exports.Movie = Movie;
module.exports.validate = validateMovie;
