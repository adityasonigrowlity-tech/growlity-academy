const prisma = require('../config/prisma');
const catchAsync = require('../utils/catchAsync');
const ApiResponse = require('../utils/ApiResponse');
const { generateToken } = require('../utils/jwt');
const { hashPassword, comparePassword } = require('../utils/password');

/**
 * @desc    Register a new user
 * @route   POST /api/auth/signup
 * @access  Public
 */
const signup = catchAsync(async (req, res) => {
    const { name, email, password, role } = req.body;

    // 0. Security check: Prevent admin registration
    if (role === 'admin') {
        return res.status(403).json({ success: false, message: 'Admin registration is not allowed' });
    }

    // 1. Check if user already exists
    const existingUser = await prisma.user.findUnique({
        where: { email }
    });

    if (existingUser) {
        return res.status(400).json({ success: false, message: 'User already exists with this email' });
    }

    // 2. Hash password using utility
    const password_hash = await hashPassword(password);

    // 3. Create user
    const user = await prisma.user.create({
        data: {
            name,
            email,
            password_hash,
            role: role || 'student',
            status: 'active'
        },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            created_at: true
        }
    });

    // 4. Generate token
    const token = generateToken(user.id);

    // 5. Send response using ApiResponse helper
    return ApiResponse.success(res, { user, token }, 'Registration successful', 201);
});

/**
 * @desc    Login user
 * @route   POST /api/auth/login
 * @access  Public
 */
const login = catchAsync(async (req, res) => {
    const { email, password, role } = req.body;

    // 1. Find user
    const user = await prisma.user.findUnique({
        where: { email }
    });

    if (!user) {
        return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    if (role && user.role !== role) {
        return res.status(401).json({ 
            success: false, 
            message: `User is not registered as a ${role.replace('_', ' ')}` 
        });
    }

    // 2. Check password using utility
    const isMatch = await comparePassword(password, user.password_hash);
    if (!isMatch) {
        return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // 3. Check status
    if (user.status !== 'active') {
        return res.status(403).json({ success: false, message: `Account is ${user.status}` });
    }

    // 4. Generate token
    const token = generateToken(user.id);

    // 5. Omit password from output
    const { password_hash, ...userWithoutPassword } = user;

    return ApiResponse.success(res, { user: userWithoutPassword, token }, 'Login successful');
});

/**
 * @desc    Get current logged in user
 * @route   GET /api/auth/me
 * @access  Private
 */
const getMe = catchAsync(async (req, res) => {
    // req.user is populated by 'protect' middleware
    return ApiResponse.success(res, req.user);
});

/**
 * @desc    Initial Admin Setup (Only works if no admins exist)
 * @route   POST /api/auth/initial-setup
 * @access  Public
 */
const initialSetup = catchAsync(async (req, res) => {
    const { name, email, password } = req.body;

    // 1. Check if ANY admin already exists
    const adminExists = await prisma.user.findFirst({
        where: { role: 'admin' }
    });

    if (adminExists) {
        return res.status(403).json({ success: false, message: 'Initial setup already completed' });
    }

    // 2. Hash password
    const password_hash = await hashPassword(password);

    // 3. Create root admin
    const admin = await prisma.user.create({
        data: {
            name,
            email,
            password_hash,
            role: 'admin',
            status: 'active',
            is_email_verified: true
        },
        select: { id: true, name: true, email: true, role: true }
    });

    return ApiResponse.success(res, { admin }, 'Root Admin created successfully', 201);
});

module.exports = {
    signup,
    login,
    getMe,
    initialSetup
};
