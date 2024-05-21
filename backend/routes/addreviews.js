const express=require('express');
const router= express.Router();
const reviews = require('../models/Review');
const fetch= require('../middleware/fetch')
const {body, validationResult} = require('express-validator')

// function generateBookId() {
//     return reviews.title.length > 0 ? reviews[reviews.title.length - 1].id + 1 : 1;
//   }

// function generateBookId() {
//     return reviews.title.length > 0 ? reviews[reviews.title.length - 1].id + 1 : 1;
//   }

router.get('/fetchreviews', async (req, res) =>{
    
    try {
        const reviewed = await reviews.find().populate('user', 'firstName email'); 
        res.json(reviewed);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
} )


router.get('/fetchbookreviews', async (req, res) => {
    try {
        const { title } = req.query;

        if (!title) {
            return res.status(400).send('Book title is required');
        }

        const bookReviews = await reviews.find({ title }).populate('user', 'firstName lastName email');

        res.json(bookReviews);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Error fetching book reviews');
    }
});


router.post('/addreview', fetch, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    ], async (req, res) => {
        try {

            const { title, author, review } = req.body;

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(500).json({ errors: errors.array() });
            }
           
            const reviewed = new reviews({
                title, author, review, user: req.user.id
             })
             const savedReview = await reviewed.save()
             res.json(savedReview)

        } catch (error) {
            console.error(error.message);
            res.status(400).send("Internal Server Error");
        }
    })

module.exports = router;

