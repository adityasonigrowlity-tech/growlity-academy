const { body, validationResult } = require('express-validator');

/**
 * @desc    Rules for user signup
 */
const signupValidator = [
    body('name').notEmpty().withMessage('Name is required').trim(),
    body('email').isEmail().withMessage('Please include a valid email').normalizeEmail(),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('role').optional().isIn(['student', 'instructor', 'admin', 'corporate_hr']).withMessage('Invalid role')
];

/**
 * @desc    Rules for user login
 */
const loginValidator = [
    body('email').isEmail().withMessage('Please include a valid email').normalizeEmail(),
    body('password').notEmpty().withMessage('Password is required')
];

/**
 * @desc    Middleware to check for validation errors
 */
const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ 
            success: false, 
            errors: errors.array().map(err => ({ field: err.path, message: err.msg })) 
        });
    }
    next();
};

module.exports = { signupValidator, loginValidator, validate };
