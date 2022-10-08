const {User} = require('../models/user');
const express = require('express');
const router = express.Router();
const _ = require('lodash');
const bcrypt = require('bcrypt');
const Joi = require('joi');

/* jshint ignore:start */

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) { return res.status(400).send(error.details[0].message); }

    let user = await User.findOne({ email: req.body.email });

    if (!user) return res.status(400).send('Invalid email or password.')            
 
    const isValidPassword = await bcrypt.compare(req.body.password, user.password);
    if (!isValidPassword) return res.status(400).send('Invalid email or password.');

    const token = user.generateAuthToken();
    res.send(token);
});

function validate(user) {
    const schema = {
        password: Joi.string().required(),
        email: Joi.string().required().email()
    };
    
    return Joi.validate(user, schema); 
}


/* jshint ignore:end */

module.exports = router;