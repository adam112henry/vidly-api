const Joi = require('joi');  // upper case because returns a class

module.exports = function() {
    Joi.objectId = require('joi-objectid')(Joi);
};