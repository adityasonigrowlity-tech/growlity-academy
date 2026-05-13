import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * @desc Get all public categories
 */
export const getPublicCategories = async () => {
  try {
    const response = await apiClient.get('/public/courses/categories');
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

/**
 * @desc Get all public courses with filters
 */
export const getPublicCourses = async (params) => {
  try {
    const response = await apiClient.get('/public/courses', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching courses:', error);
    throw error;
  }
};

/**
 * @desc Get single course details by slug
 */
export const getPublicCourseBySlug = async (slug) => {
  try {
    const response = await apiClient.get(`/public/courses/${slug}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching course details:', error);
    throw error;
  }
};

const courseService = {
  getPublicCategories,
  getPublicCourses,
  getPublicCourseBySlug,
};

export default courseService;
