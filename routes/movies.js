const {Movie, validate} = require('../models/movie');
const {Genre} = require('../models/genre');
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

/* jshint ignore:start */
router.get('/', async (req, res) => {
    const movies = await Movie.find().sort('title');
    res.send(movies);
});

router.get('/:id', async (req, res) => {
    const movie = await Movie.findById(req.params.id);
    
    if (!movie) return res.status(404).send('No movie found.');
    res.send(`movie title: ${movie.name}`);
});

router.post('/', auth, async (req, res) => {
    const { error } = validate(req.body); // equivalent to only returning result.error
    if (error) { return res.status(400).send(error.details[0].message); }

    const genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.status(400).send('Invalid genre');

    const movie = new Movie( { 
        title: req.body.title,
        genre: {  // we only want to embed these 2 properties
            _id: genre._id,
            name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate 
    });

    await movie.save();
    res.send(movie);
});

router.put('/:id', auth, async (req, res) => {
    const { error } = validate(req.body); // equivalent to only returning result.error
    if (error) { return res.status(400).send(error.details[0].message); }

    const genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.status(400).send('Invalid genre');

    const movie = await Movie.findByIdAndUpdate(req.params.id, { 
        title: req.body.title,
        genre: {
            _id: genre._id,
            name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate 
    }, {
        new: true
    });

    if (!movie) return res.status(404).send('No movie found.');

    res.send(movie);
});

router.delete('/:id', auth, async (req, res) => {
    const movie = await Movie.findByIdAndRemove(req.params.id);
    
    if (!movie) return res.status(404).send('No movie found.');

    res.send(movie);
});

/* jshint ignore:end */

module.exports = router;