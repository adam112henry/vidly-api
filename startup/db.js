const winston = require('winston');
const mongoose = require('mongoose');
const config = require('config');

module.exports = function() {
    const db = config.get('db');

    mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true } )
        .then(() => winston.info(`Connected to ${db}...`));
    // removed the catch to let the global error handler deal with it

    
    //.then(() => console.log('Connected to MongoDB...')) 
    //.catch(err => console.error('Could not connect to MongoDB...', err));
};
