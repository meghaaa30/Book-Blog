const express = require('express');
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const fetch = require('../middleware/fetch');

const JWT_SECRET = "megha is the bestest girlf"

router.post('/sign-up', [
    body('firstName', 'Enter a valid first name').isLength({ min: 3 }),
    body('lastName', 'Enter a valid last name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be at least 8 characters').isLength({ min: 8 }),
], async (req, res) => {
    let success = false;
    // If there are validation errors, return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        // Check whether the user with this email already exists
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ error: "Sorry, a user with this email already exists" });
        }

        // Hash the password using bcrypt
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        // Create a new user in the database
        user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: secPass,
            email: req.body.email,
        });
        await user.save();

        // Create a payload for the JWT token
        const payload = {
            user: {
                id: user.id
            }
        };

        // Generate a JWT token
        const authtoken = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
        success = true;
        // Send the token in the response
        res.json({ success, authtoken });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// ROUTE 2: Authenticate a User using: POST "/api/auth/login". No login required
router.post('/sign-in', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists(),
], async (req, res) => {
    let success = false;
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            success = false
            return res.status(400).json({ error: "Please try to login with correct credentials" });
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            success = false
            return res.status(400).json({ success, error: "Please try to login with correct credentials" });
        }

        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({ success, authtoken })

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});


router.post('/getUser', fetch, async (req, res) => {
    try {
        userid = req.user.id
        const users = await User.findById(userid).select('-password')
        res.json(users)
    }
    catch (error) {
        console.log(error.message)
        res.status(500).send("some error occured")
    }
})

module.exports = router