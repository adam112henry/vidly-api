/* jshint ignore:start */

// NOTE: this is not being used in favor of express-async-erros

// is like a factory function
module.exports = function (handler) {
    return async (req, res, next) => {
        try {
            await handler(req, res);
        }
        catch(ex) {
            // this will pass control to the error middleware function registered in index.js
            next(ex); 
        }    
    }
}

/* jshint ignore:end */
