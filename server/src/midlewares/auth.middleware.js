const jwt = require('jsonwebtoken');
const catchAsync = require('../utils/catchAsync');
const prisma = require('../config/prisma');
const { verifyToken } = require('../utils/jwt');

/**
 * @desc    Protect routes - verify JWT token in header or cookie
 */
const protect = catchAsync(async (req, res, next) => {
    let token;

    // 1. Get token from Headers (Bearer token) or Cookies
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies?.growlity_token) {
        token = req.cookies.growlity_token;
    }

    if (!token) {
        return res.status(401).json({ success: false, message: 'Not authorized to access this route' });
    }

    try {
        // 2. Verify token
        const decoded = verifyToken(token);

        // 3. Check if user still exists in database
        const user = await prisma.user.findUnique({
            where: { id: decoded.id },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                status: true
            }
        });

        if (!user) {
            return res.status(401).json({ success: false, message: 'User no longer exists' });
        }

        if (user.status === 'suspended') {
            return res.status(403).json({ success: false, message: 'Your account is suspended' });
        }

        // 4. Attach user to request object
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ success: false, message: 'Invalid or expired token' });
    }
});

/**
 * @desc    Grant access to specific roles
 */
const authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: `User role ${req.user.role} is not authorized to access this route`
            });
        }
        next();
    };
};

module.exports = { protect, authorize };
