const catchAsync = require('../utils/catchAsync');
const prisma = require('../config/prisma');

/**
 * @desc    Get All Public Categories
 * @route   GET /api/public/categories
 * @access  Public
 */
exports.getAllCategories = catchAsync(async (req, res) => {
    const categories = await prisma.category.findMany({
        orderBy: { name: 'asc' },
        select: {
            id: true,
            name: true,
            slug: true,
            parent_id: true
        }
    });

    res.status(200).json({
        success: true,
        data: categories
    });
});

/**
 * @desc    Get All Public Courses with filters
 * @route   GET /api/public/courses
 * @access  Public
 */
exports.getAllCourses = catchAsync(async (req, res) => {
    const { 
        page = 1, 
        limit = 12, 
        search = '', 
        category = '', 
        level = '',
        price = 'all',
        sort = 'relevance'
    } = req.query;

    const skip = (Number(page) - 1) * Number(limit);

    // Build where clause
    const where = {
        status: 'published',
        AND: [
            search ? {
                OR: [
                    { title: { contains: search, mode: 'insensitive' } },
                    { description: { contains: search, mode: 'insensitive' } }
                ]
            } : {},
            category ? { category: { slug: category } } : {},
            level ? { level: level } : {},
            price === 'free' ? { price: 0 } : price === 'paid' ? { price: { gt: 0 } } : {}
        ]
    };

    // Build orderBy
    let orderBy = { created_at: 'desc' };
    if (sort === 'price-low') orderBy = { price: 'asc' };
    else if (sort === 'price-high') orderBy = { price: 'desc' };
    else if (sort === 'rating') orderBy = { rating: 'desc' };
    else if (sort === 'popular') orderBy = { total_students: 'desc' };

    const [courses, total] = await Promise.all([
        prisma.course.findMany({
            where,
            include: {
                category: { select: { name: true, slug: true } },
                instructor: { select: { name: true, profile_image: true } }
            },
            skip: Number(skip),
            take: Number(limit),
            orderBy
        }),
        prisma.course.count({ where })
    ]);

    res.status(200).json({
        success: true,
        data: courses,
        pagination: {
            total,
            page: Number(page),
            limit: Number(limit),
            pages: Math.ceil(total / Number(limit))
        }
    });
});

/**
 * @desc    Get Single Course Details by Slug
 * @route   GET /api/public/courses/:slug
 * @access  Public
 */
exports.getCourseBySlug = catchAsync(async (req, res) => {
    const course = await prisma.course.findFirst({
        where: { slug: req.params.slug, status: 'published' },
        include: {
            category: true,
            instructor: {
                select: { name: true, profile_image: true, role: true }
            },
            sections: {
                include: { 
                    lessons: {
                        orderBy: { position: 'asc' }
                    } 
                },
                orderBy: { position: 'asc' }
            }
        }
    });

    if (!course) {
        return res.status(404).json({ success: false, message: 'Course not found' });
    }

    res.status(200).json({
        success: true,
        data: course
    });
});
