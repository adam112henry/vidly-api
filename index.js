const winston = require('winston');
const express = require('express');
const app = express();

require('./startup/logging')();
require('./startup/routes')(app);  // register middleware functions
require('./startup/db')();         // initialize the database
require('./startup/config')();       // essential configurations
require('./startup/validation')();
require('./startup/prod')(app);

//const p = Promise.reject(new Error('Something failed'));
//p.then(() => console.log('Done'));

app.get('/', (req, res) => {
    res.send('Nothing to see, this is an API');
});

const port = process.env.PORT || 3001;
const server = app.listen(port, () => winston.info(`Listening on port ${port}...`));

module.exports = server;

//app.listen(port, () => console.log(`Listening on port ${port}...`));