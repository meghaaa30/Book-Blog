const express = require('express');
const router = express.Router();
const Book = require('../models/Review');

router.get('/titles', async (req, res) => {
    try {
        const titles = await Book.find().select('title author');
        res.json(titles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/version', async (req, res) => {
    try {
        const latestBook = await Book.findOne().sort({ date: -1 });
        res.json({ version: latestBook ? latestBook.date.getTime() : 0 });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


module.exports = router;
