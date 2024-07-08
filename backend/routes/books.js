const express = require('express');
const router = express.Router();
const Book = require('../models/Review');

// Endpoint to fetch book titles from MongoDB
router.get('/titles', async (req, res) => {
    try {
        const uniqueBooks = await Book.aggregate([
            {
                $group: {
                    _id: {
                        title: { $toLower: "$title" },
                        author: { $toLower: "$author" }
                    },
                    title: { $first: "$title" },
                    author: { $first: "$author" }
                }
            }
        ]);

        res.json(uniqueBooks.map(book => ({ title: book.title, author: book.author })));
    } catch (error) {
        console.error('Error fetching unique books:', error);
        res.status(500).send('Server error');
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