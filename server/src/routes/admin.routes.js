const express = require('express');
const router = express.Router();
const { 
    getDashboardStats, 
    getRecentEnrollments,
    getAllCourses, 
    getCourseById, 
    createCourse, 
    updateCourse, 
    deleteCourse,
    updateCourseStatus,
    getAllCategories,
    createCategory,
    updateCategory,
    deleteCategory,
    getAllStudents,
    getStudentStats,
    getAllSubscriptionPlans,
    createSubscriptionPlan,
    updateSubscriptionPlan,
    deleteSubscriptionPlan,
    getAllUserSubscriptions
} = require('../controllers/admin.controller');
const { protect, authorize } = require('../midlewares/auth.middleware');

// Protect all routes and restrict to admin
router.use(protect);
router.use(authorize('admin'));

// Subscription Management (MOVED UP)
router.get('/subscriptions/plans', getAllSubscriptionPlans);
router.post('/subscriptions/plans', createSubscriptionPlan);
router.put('/subscriptions/plans/:id', updateSubscriptionPlan);
router.delete('/subscriptions/plans/:id', deleteSubscriptionPlan);
router.get('/subscriptions/users', getAllUserSubscriptions);

// General Stats
router.get('/stats', getDashboardStats);
router.get('/recent-enrollments', getRecentEnrollments);

// Course Management
router.get('/courses', getAllCourses);
router.get('/courses/:id', getCourseById);
router.post('/courses', createCourse);
router.put('/courses/:id', updateCourse);
router.delete('/courses/:id', deleteCourse);
router.patch('/courses/:id/status', updateCourseStatus);

// Category Management
router.get('/categories', getAllCategories);
router.post('/categories', createCategory);
router.put('/categories/:id', updateCategory);
router.delete('/categories/:id', deleteCategory);

// Student Management
router.get('/students/stats', getStudentStats); // Move stats before general list
router.get('/students', getAllStudents);

router.get('/test', (req, res) => res.json({ success: true, message: 'Admin routes working' }));

module.exports = router;
