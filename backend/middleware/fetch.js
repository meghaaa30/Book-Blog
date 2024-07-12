const jwt = require('jsonwebtoken');
require('dotenv').config();
const secret_key = process.env.REACT_APP_JWT_SECRET

// Middleware to verify JWT token
const fetch = (req, res, next) => {
    const authHeader = req.header('auth-token');
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(400).send({ error: "Please authenticate using a valid token" });
    }

    try {
        const data = jwt.verify(token, secret_key);
        const data = jwt.verify(token, secret_key);
        req.user = data.user;
        next();
    } catch (error) {
        return res.status(400).send({ error: "Please authenticate using a valid token" });
    }
}

module.exports = fetch;
