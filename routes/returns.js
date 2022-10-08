const {Rental} = require('../models/rental');
const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();

/* jshint ignore:start */

router.post('/', auth, async (req, res) => {
    if (!req.body.customerId) return res.status(400).send('customerId not found');
    if (!req.body.movieId) return res.status(400).send('movieId not found');

    const rental = await Rental.findOne({
        'customer._id': req.body.customerId,
        'customer._id': req.body.customerId,
    });
    if (!rental) return res.status(404).send('Rental not found');
    if (rental.dateReturned) return res.status(400).send('Return already processed');

    return res.status(200).send();
});

module.exports = router;

/* jshint ignore:end */
