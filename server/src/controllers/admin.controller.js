const catchAsync = require('../utils/catchAsync');
const prisma = require('../config/prisma');

/**
 * @desc    Get Admin Dashboard Stats
 * @route   GET /api/admin/stats
 * @access  Private/Admin
 */
exports.getDashboardStats = catchAsync(async (req, res) => {
    // 1. Total Courses
    const totalCourses = await prisma.course.count();

    // 2. Active Students (Users with role 'student')
    const activeStudents = await prisma.user.count({
        where: { role: 'student', status: 'active' }
    });

    // 3. Total Revenue (Sum of successful payments)
    const revenueData = await prisma.payment.aggregate({
        where: { status: 'success' },
        _sum: { amount: true }
    });
    const totalRevenue = Number(revenueData._sum.amount || 0);

    // 4. Course Enrollments
    const totalEnrollments = await prisma.enrollment.count();

    // Calculate trends (Dummy trends for now as we don't have historical snapshotting yet, 
    // but in a real app we'd compare with last month)
    const stats = [
        { 
            title: 'Total Courses', 
            value: totalCourses.toString(), 
            icon: 'BookOpen', 
            color: 'blue', 
            trend: 'up', 
            trendValue: '+2%' 
        },
        { 
            title: 'Active Students', 
            value: activeStudents.toLocaleString(), 
            icon: 'Users', 
            color: 'purple', 
            trend: 'up', 
            trendValue: '+5%' 
        },
        { 
            title: 'Monthly Revenue', 
            value: `$${totalRevenue.toLocaleString()}`, 
            icon: 'DollarSign', 
            color: 'green', 
            trend: 'up', 
            trendValue: '+12%' 
        },
        { 
            title: 'Course Enrolments', 
            value: totalEnrollments.toLocaleString(), 
            icon: 'PlayCircle', 
            color: 'orange', 
            trend: 'up', 
            trendValue: '+8%' 
        },
    ];

    res.status(200).json({
        success: true,
        data: stats
    });
});

/**
 * @desc    Get Recent Enrollments
 * @route   GET /api/admin/recent-enrollments
 * @access  Private/Admin
 */
exports.getRecentEnrollments = catchAsync(async (req, res) => {
    const enrollments = await prisma.enrollment.findMany({
        take: 5,
        orderBy: { enrolled_at: 'desc' },
        include: {
            user: {
                select: { name: true, profile_image: true }
            },
            course: {
                select: { title: true }
            }
        }
    });

    const formattedEnrollments = enrollments.map(en => ({
        id: en.id,
        studentName: en.user.name,
        courseTitle: en.course.title,
        enrolledAt: en.enrolled_at,
        image: en.user.profile_image
    }));

    res.status(200).json({
        success: true,
        data: formattedEnrollments
    });
});

/**
 * @desc    Get All Courses for Admin
 * @route   GET /api/admin/courses
 * @access  Private/Admin
 */
exports.getAllCourses = catchAsync(async (req, res) => {
    const { page = 1, limit = 10, search = '', category = '', status = '' } = req.query;
    const skip = (page - 1) * limit;

    const where = {
        AND: [
            search ? {
                OR: [
                    { title: { contains: search, mode: 'insensitive' } },
                    { description: { contains: search, mode: 'insensitive' } }
                ]
            } : {},
            category ? { category: { name: category } } : {},
            status ? { status: status } : {}
        ]
    };

    const [courses, total] = await Promise.all([
        prisma.course.findMany({
            where,
            include: {
                category: { select: { name: true } },
                instructor: { select: { name: true } }
            },
            skip: Number(skip),
            take: Number(limit),
            orderBy: { created_at: 'desc' }
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
            pages: Math.ceil(total / limit)
        }
    });
});

/**
 * @desc    Get Single Course Details
 * @route   GET /api/admin/courses/:id
 * @access  Private/Admin
 */
exports.getCourseById = catchAsync(async (req, res) => {
    const course = await prisma.course.findUnique({
        where: { id: req.params.id },
        include: {
            category: true,
            sections: {
                include: { lessons: true }
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

/**
 * @desc    Create New Course
 * @route   POST /api/admin/courses
 * @access  Private/Admin
 */
exports.createCourse = catchAsync(async (req, res) => {
    const { title, description, price, category_id, level, instructor_id, thumbnail_url } = req.body;

    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    const course = await prisma.course.create({
        data: {
            title,
            slug,
            description,
            price,
            category_id,
            level,
            instructor_id,
            thumbnail_url,
            status: 'draft'
        }
    });

    res.status(201).json({
        success: true,
        data: course
    });
});

/**
 * @desc    Update Course
 * @route   PUT /api/admin/courses/:id
 * @access  Private/Admin
 */
exports.updateCourse = catchAsync(async (req, res) => {
    const { title, description, price, category_id, level, instructor_id, thumbnail_url, status } = req.body;

    const updateData = {
        title,
        description,
        price,
        category_id,
        level,
        instructor_id,
        thumbnail_url,
        status
    };

    if (title) {
        updateData.slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    }

    const course = await prisma.course.update({
        where: { id: req.params.id },
        data: updateData
    });

    res.status(200).json({
        success: true,
        data: course
    });
});

/**
 * @desc    Delete Course (Soft or Hard depending on requirement, here Hard for simplicity or Archive)
 * @route   DELETE /api/admin/courses/:id
 * @access  Private/Admin
 */
exports.deleteCourse = catchAsync(async (req, res) => {
    // Check if course has enrollments
    const enrollmentsCount = await prisma.enrollment.count({
        where: { course_id: req.params.id }
    });

    if (enrollmentsCount > 0) {
        // Archive instead of delete if there are students
        await prisma.course.update({
            where: { id: req.params.id },
            data: { status: 'archived' }
        });
        return res.status(200).json({
            success: true,
            message: 'Course has enrollments, archived instead of deleted'
        });
    }

    await prisma.course.delete({
        where: { id: req.params.id }
    });

    res.status(200).json({
        success: true,
        message: 'Course deleted successfully'
    });
});

/**
 * @desc    Update Course Status (Visibility)
 * @route   PATCH /api/admin/courses/:id/status
 * @access  Private/Admin
 */
exports.updateCourseStatus = catchAsync(async (req, res) => {
    const { status } = req.body;

    const course = await prisma.course.update({
        where: { id: req.params.id },
        data: { status }
    });

    res.status(200).json({
        success: true,
        data: course
    });
});

/**
 * @desc    Get All Categories
 * @route   GET /api/admin/categories
 * @access  Private/Admin
 */
exports.getAllCategories = catchAsync(async (req, res) => {
    const categories = await prisma.category.findMany({
        orderBy: { name: 'asc' }
    });

    res.status(200).json({
        success: true,
        data: categories
    });
});

/**
 * @desc    Create New Category
 * @route   POST /api/admin/categories
 * @access  Private/Admin
 */
exports.createCategory = catchAsync(async (req, res) => {
    const { name, parent_id } = req.body;

    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    const category = await prisma.category.create({
        data: {
            name,
            slug,
            parent_id: parent_id || null
        }
    });

    res.status(201).json({
        success: true,
        data: category
    });
});

/**
 * @desc    Update Category
 * @route   PUT /api/admin/categories/:id
 * @access  Private/Admin
 */
exports.updateCategory = catchAsync(async (req, res) => {
    const { name, parent_id } = req.body;
    const { id } = req.params;

    const updateData = {};
    if (name) {
        updateData.name = name;
        updateData.slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    }
    if (parent_id !== undefined) {
        // Handle cases where parent_id is an empty string ("") which Prisma cannot convert to UUID
        updateData.parent_id = parent_id || null;
    }

    const category = await prisma.category.update({
        where: { id },
        data: updateData
    });

    res.status(200).json({
        success: true,
        data: category
    });
});

/**
 * @desc    Delete Category
 * @route   DELETE /api/admin/categories/:id
 * @access  Private/Admin
 */
exports.deleteCategory = catchAsync(async (req, res) => {
    const { id } = req.params;

    // Check if category has courses
    const coursesCount = await prisma.course.count({
        where: { category_id: id }
    });

    if (coursesCount > 0) {
        return res.status(400).json({
            success: false,
            message: 'Cannot delete category with associated courses. Please reassign courses first.'
        });
    }

    await prisma.category.delete({
        where: { id }
    });

    res.status(200).json({
        success: true,
        message: 'Category deleted successfully'
    });
});


/**
 * @desc    Get All Students
 * @route   GET /api/admin/students
 * @access  Private/Admin
 */
exports.getAllStudents = catchAsync(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const search = req.query.search || '';
    const role = req.query.role || 'student'; // Default to student but support any role
    console.log(`[Admin] Fetching Users - Role: ${role}, Page: ${page}, Search: ${search}`);

    const where = {
        role,
        OR: [
            { name: { contains: search, mode: 'insensitive' } },
            { email: { contains: search, mode: 'insensitive' } }
        ]
    };

    const students = await prisma.user.findMany({
        where,
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            profile_image: true,
            status: true,
            created_at: true,
            _count: {
                select: { 
                    enrollments: true,
                    courses_taught: true
                }
            }
        },
        orderBy: { created_at: 'desc' },
        skip,
        take: limit
    });

    const total = await prisma.user.count({ where });

    res.status(200).json({
        success: true,
        data: students,
        pagination: {
            page,
            limit,
            total,
            pages: Math.ceil(total / limit)
        }
    });
});

/**
 * @desc    Get Student Stats
 * @route   GET /api/admin/students/stats
 * @access  Private/Admin
 */
exports.getStudentStats = catchAsync(async (req, res) => {
    const role = req.query.role || 'student';

    const totalStudents = await prisma.user.count({ 
        where: { role } 
    });

    const activeStudents = await prisma.user.count({
        where: { 
            role,
            ...(role === 'student' 
                ? { enrollments: { some: {} } } 
                : { status: 'active' })
        }
    });

    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const newStudentsToday = await prisma.user.count({
        where: {
            role,
            created_at: { gte: todayStart }
        }
    });

    res.status(200).json({
        success: true,
        data: {
            totalStudents,
            activeStudents,
            newStudentsToday
        }
    });
});

/**
 * @desc    Get All Subscription Plans
 * @route   GET /api/admin/subscriptions/plans
 * @access  Private/Admin
 */
exports.getAllSubscriptionPlans = catchAsync(async (req, res) => {
    const plans = await prisma.subscriptionPlan.findMany({
        orderBy: { created_at: 'desc' },
        include: {
            _count: {
                select: { user_subscriptions: true }
            }
        }
    });

    res.status(200).json({
        success: true,
        data: plans
    });
});

/**
 * @desc    Create New Subscription Plan
 * @route   POST /api/admin/subscriptions/plans
 * @access  Private/Admin
 */
exports.createSubscriptionPlan = catchAsync(async (req, res) => {
    const { name, description, price, billing_cycle, course_access_type, max_courses, status } = req.body;

    const plan = await prisma.subscriptionPlan.create({
        data: {
            name,
            description,
            price,
            billing_cycle,
            course_access_type,
            max_courses: max_courses ? parseInt(max_courses) : null,
            status: status || 'active'
        }
    });

    res.status(201).json({
        success: true,
        data: plan
    });
});

/**
 * @desc    Update Subscription Plan
 * @route   PUT /api/admin/subscriptions/plans/:id
 * @access  Private/Admin
 */
exports.updateSubscriptionPlan = catchAsync(async (req, res) => {
    const { id } = req.params;
    const { name, description, price, billing_cycle, course_access_type, max_courses, status } = req.body;

    const plan = await prisma.subscriptionPlan.update({
        where: { id },
        data: {
            name,
            description,
            price,
            billing_cycle,
            course_access_type,
            max_courses: max_courses ? parseInt(max_courses) : null,
            status
        }
    });

    res.status(200).json({
        success: true,
        data: plan
    });
});

/**
 * @desc    Delete Subscription Plan
 * @route   DELETE /api/admin/subscriptions/plans/:id
 * @access  Private/Admin
 */
exports.deleteSubscriptionPlan = catchAsync(async (req, res) => {
    const { id } = req.params;

    // Check for active subscriptions before deleting
    const activeSubCount = await prisma.userSubscription.count({
        where: { plan_id: id, status: 'active' }
    });

    if (activeSubCount > 0) {
        return res.status(400).json({
            success: false,
            message: 'Cannot delete plan with active subscribers. Please de-activate the plan instead.'
        });
    }

    await prisma.subscriptionPlan.delete({
        where: { id }
    });

    res.status(200).json({
        success: true,
        message: 'Subscription plan deleted successfully'
    });
});

/**
 * @desc    Get All User Subscriptions
 * @route   GET /api/admin/subscriptions/users
 * @access  Private/Admin
 */
exports.getAllUserSubscriptions = catchAsync(async (req, res) => {
    const { status, search } = req.query;

    const where = {
        AND: [
            status ? { status } : {},
            search ? {
                user: {
                    OR: [
                        { name: { contains: search, mode: 'insensitive' } },
                        { email: { contains: search, mode: 'insensitive' } }
                    ]
                }
            } : {}
        ]
    };

    const subscriptions = await prisma.userSubscription.findMany({
        where,
        include: {
            user: {
                select: { name: true, email: true, profile_image: true }
            },
            plan: {
                select: { name: true, price: true }
            }
        },
        orderBy: { created_at: 'desc' }
    });

    res.status(200).json({
        success: true,
        data: subscriptions
    });
});
