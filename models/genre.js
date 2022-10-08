const mongoose = require('mongoose');
const Joi = require('joi');  // upper case because returns a class

//compile the schema into a model
const genreSchema = new mongoose.Schema( {
    name: { 
        type: String, 
        required: true,
        minLength: 5,
        maxlength: 50
    }
});

const Genre = mongoose.model('Genre', genreSchema);

/*const genres = [
    {id: 1, name: 'Drama' },
    {id: 2, name: 'Comedy' },
    {id: 3, name: 'Family' },
    {id: 4, name: 'Children' },
    {id: 5, name: 'Horror' },
];*/

function validateGenre(genre) {
    const schema = {
        name: Joi.string().min(5).max(50).required()
    };
    
    return Joi.validate(genre, schema); 
}

module.exports.genreSchema = genreSchema;
module.exports.Genre = Genre;
module.exports.validate = validateGenre;