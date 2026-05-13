const express = require('express');
const router = express.Router();
const { 
    getAllCategories, 
    getAllCourses, 
    getCourseBySlug 
} = require('../controllers/course.controller');

// Public Category routes
router.get('/categories', getAllCategories);

// Public Course routes
router.get('/', getAllCourses);
router.get('/:slug', getCourseBySlug);

module.exports = router;
