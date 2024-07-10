const express = require('express');
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetch = require('../middleware/fetch');
const { OAuth2Client } = require('google-auth-library');
require('dotenv').config();

const JWT_SECRET = process.env.REACT_APP_JWT_SECRET;

// Initialize OAuth2Client
const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
const client = new OAuth2Client(clientId);

router.post('/sign-up', [
    body('firstName', 'Enter a valid first name').isLength({ min: 3 }),
    body('lastName', 'Enter a valid last name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be at least 8 characters').isLength({ min: 8 }),
], async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ error: "Sorry, a user with this email already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: secPass,
            email: req.body.email,
        });
        await user.save();

        const payload = {
            user: {
                id: user.id
            }
        };

        const authtoken = jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
        success = true;
        res.json({ success, authtoken });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

router.post('/sign-in', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists(),
], async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Email does not exist. Please sign up." });
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(400).json({ success, error: "Incorrect password. Please try again." });
        }

        const data = {
            user: {
                id: user.id
            }
        };
        const authtoken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({ success, authtoken });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

router.post('/googlelogin', async (req, res) => {
    const { idToken } = req.body;

    try {
        const response = await client.verifyIdToken({
            idToken,
            audience: clientId,
        });

        const { email_verified, given_name, family_name, email } = response.payload;

        if (email_verified) {
            let user = await User.findOne({ email });

            if (user) {
                const authtoken = jwt.sign({ user: { id: user.id } }, JWT_SECRET, {
                    expiresIn: '7d',
                });
                return res.json({
                    success: true,
                    authtoken,
                });
            } else {
                let password = email + JWT_SECRET;
                user = new User({
                    firstName: given_name,
                    lastName: family_name,
                    email: email,
                    password: password,
                });

                const data = await user.save();
                const authtoken = jwt.sign({ user: { id: data.id } }, JWT_SECRET, {
                    expiresIn: '7d',
                });
                return res.json({
                    success: true,
                    authtoken,
                });
            }
        } else {
            return res.status(400).json({
                success: false,
                error: 'Google login failed. Email not verified.',
            });
        }
    } catch (error) {
        console.log('ERROR GOOGLE LOGIN', error);
        return res.status(400).json({
            success: false,
            error: 'Google login failed. Try again.',
        });
    }
});

module.exports = router;
