const jwt = require('jsonwebtoken');

/**
 * @desc    Generate a JWT token
 * @param   {string} id - User ID
 * @returns {string} - JWT Token
 */
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE || '30d',
    });
};

/**
 * @desc    Verify a JWT token
 * @param   {string} token - JWT Token
 * @returns {Object} - Decoded payload
 */
const verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = { generateToken, verifyToken };
