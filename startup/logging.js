require('express-async-errors'); // this MUST be the first statement
const winston = require('winston');
require('winston-mongodb');

module.exports = function() {
    winston.configure( {
        transports: [
            //new winston.transports.File({ filename: 'logfile.log' }),
            new winston.transports.Console({ colorize: true, prettyPrint: true })//,
            //new winston.transports.MongoDB( { db: 'mongodb://localhost/vidly' })
        ]
    });
   
    process.on('uncaughtException', (ex) => {  // this only works with synchronous code
        console.log("WE GOT AN UNCAUGHT EXCEPTION!");
        winston.error(ex.message, ex);
        process.exit(1);
    });
    
    //winston.handleExceptions(
    //    new winston.transports.File({ filename: 'uncaughtExceptions.log' }));
    
    //winston.exceptions.handle(new winston.transports.File({ filename: 'uncaughtExceptions.log' }));
    
    process.on('unhandledRejection', (ex) => {  // handles unhandled Promise rejections
        console.log("WE GOT AN UNHANDLED REJECTION!");
        winston.error(ex.message, ex);
        process.exit(1);
        //throw ex;
    });

};