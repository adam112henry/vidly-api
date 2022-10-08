const {Rental, validate} = require('../models/rental');
const {Customer} = require('../models/customer');
const {Movie} = require('../models/movie');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Fawn = require('fawn');  // 2-phase commits
const auth = require('../middleware/auth');

Fawn.init(mongoose);

/* jshint ignore:start */
router.get('/', async (req, res) => {
    const rentals = await Rental.find().sort('-dateRented');
    res.send(rentals);
});

router.post('/', auth, async (req, res) => {
    const { error } = validate(req.body); // equivalent to only returning result.error
    if (error) { return res.status(400).send(error.details[0].message); }

    const customer = await Customer.findById(req.body.customerId);
    if (!customer) return res.status(400).send('Invalid customer');

    const movie = await Movie.findById(req.body.movieId);
    if (!movie) return res.status(400).send('Invalid movie');

    if (movie.numberInStock === 0) return res.status(400).send('No movie in stock');

    let rental = new Rental( { 
        customer: {
            _id: customer._id,
            name: customer.name,
            phone: customer.phone
        },
        movie: {
            _id: movie._id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate
        }
    });
    
    // !! need to use a NPM package that simulates a transaction in mongoose

    //rental = await rental.save();
    //movie.numberInStock--;
    //movie.save();

    try {
        new Fawn.Task()
            .save('rentals', rental)
            .update('movies', { _id: movie._id }, {
                $inc: { numberInStock: -1 }
            })
            .run();

        res.send(rental);
    }
    catch(ex) {
        res.status(500).send('Failure');
    }
});

/* jshint ignore:end */

module.exports = router;