const jwt = require('jsonwebtoken');
require('dotenv').config();

// Generates a JWT
function generateToken(user) {
    const payload = {
        // Include relevant user information in the payload
        id: user._id,
        username: user.username,
        created: user.created,
    };

    return jwt.sign(payload, process.env.JWT_SECRET);
}

// Verifies a JWT
function verifyToken(token) {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        return null; // Token is invalid or expired
    }
}

module.exports = { generateToken, verifyToken };
