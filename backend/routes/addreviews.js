const express=require('express');
const router= express.Router();
const reviews = require('../models/Review');
const fetch= require('../middleware/fetch')
const {body, validationResult} = require('express-validator')

router.get('/fetchreviews', fetch, async (req, res) =>{
    
    try{
        const review= await reviews.find({user: req.user.id})
        res.json(review)
    }
    catch(error){
        res.status(400).send('error')
    }
} )

router.post('/addreview', fetch, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    ], async (req, res) => {
        try {
            const { title, author, review } = req.body;

            // If there are errors, return Bad request and the errors
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

