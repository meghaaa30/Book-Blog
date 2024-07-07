const express = require('express');
const router = express.Router();
const reviews = require('../models/Review');
const fetch = require('../middleware/fetch');
const { body, validationResult } = require('express-validator');

router.get('/fetchreviews', async (req, res) => {
    try {
        const reviewed = await reviews.find().sort({ date: -1 }).populate('user', 'firstName email');
        res.json(reviewed);
    } catch (error) {
        res.status(400).json({ error: 'Internal server error' });
    }
});

router.get('/fetchbookreviews', async (req, res) => {
    try {
        const { title } = req.query;

        if (!title) {
            return res.status(400).send('Book title is required');
        }

        const bookReviews = await reviews.find({ title }).populate('user', 'firstName lastName');

        res.json(bookReviews);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Error fetching book reviews');
    }
});

router.post('/addreview', fetch, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('author', 'Enter a valid author').isLength({ min: 3 }),
    body('review', 'Enter a valid review').isLength({ min: 3 }),
], async (req, res) => {
    try {
        const { title, author, review } = req.body;

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        };

        const newReview = new reviews({
            title,
            author,
            review,
            user: req.user.id,
        });

        const savedReview = await newReview.save();
        res.json(savedReview);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
