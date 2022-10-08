const validateObjectId = require('../middleware/validateObjectId');
const express = require('express');
const router = express.Router();
const {Genre, validate} = require('../models/genre');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

/* jshint ignore:start */

router.get('/', async (req, res) => {
    //throw new Error('could not get genres');

    const genres = await Genre.find().sort('name');
    res.send(genres);    
});

router.get('/:id', validateObjectId, async (req, res) => {
    const genre = await Genre.findById(req.params.id);
    
    if (!genre) return res.status(404).send('No genre found.');
    res.send(`genre name: ${genre.name}`);
});

// route then (optional) middleware function then route handler function
router.post('/', auth, async (req, res) => {
    const { error } = validate(req.body); // equivalent to only returning result.error
    if (error) { return res.status(400).send(error.details[0].message); }

    const genre = new Genre({ name: req.body.name });
    await genre.save();
    res.send(genre);
});

router.put('/:id', auth, async (req, res) => {
    const { error } = validate(req.body); // equivalent to only returning result.error
    if (error) { return res.status(400).send(error.details[0].message); }

    const genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name }, {
        new: true
    });

    if (!genre) return res.status(404).send('No genre found.');

    res.send(genre);
});

router.delete('/:id', [auth, admin], async (req, res) => {
    const genre = await Genre.findByIdAndRemove(req.params.id);
    
    if (!genre) return res.status(404).send('No genre found.');

    res.send(genre);
});

/* jshint ignore:end */

module.exports = router;