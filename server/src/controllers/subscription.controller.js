const catchAsync = require('../utils/catchAsync');
const prisma = require('../config/prisma');

/**
 * @desc    Get all active subscription plans for public
 * @route   GET /api/public/subscriptions/plans
 * @access  Public
 */
exports.getPublicPlans = catchAsync(async (req, res) => {
    const plans = await prisma.subscriptionPlan.findMany({
        where: { status: 'active' },
        orderBy: { price: 'asc' },
        select: {
            id: true,
            name: true,
            description: true,
            price: true,
            billing_cycle: true,
            course_access_type: true,
            max_courses: true
        }
    });

    res.status(200).json({
        success: true,
        data: plans
    });
});
