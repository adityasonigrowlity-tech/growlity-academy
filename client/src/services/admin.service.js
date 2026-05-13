import apiClient from '@/lib/api-client';

/**
 * @desc Get admin dashboard statistics
 */
export const getAdminStats = async () => {
  try {
    const response = await apiClient.get('/admin/stats');
    return response.data;
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    throw error;
  }
};

/**
 * @desc Get recent course enrollments
 */
export const getRecentEnrollments = async () => {
  try {
    const response = await apiClient.get('/admin/recent-enrollments');
    return response.data;
  } catch (error) {
    console.error('Error fetching recent enrollments:', error);
    throw error;
  }
};

/**
 * @desc Get all courses for admin
 */
export const getAdminCourses = async (params) => {
  try {
    const response = await apiClient.get('/admin/courses', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching admin courses:', error);
    throw error;
  }
};

/**
 * @desc Get single course details
 */
export const getAdminCourseById = async (id) => {
  try {
    const response = await apiClient.get(`/admin/courses/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching admin course:', error);
    throw error;
  }
};

/**
 * @desc Create new course
 */
export const createAdminCourse = async (courseData) => {
  try {
    const response = await apiClient.post('/admin/courses', courseData);
    return response.data;
  } catch (error) {
    console.error('Error creating admin course:', error);
    throw error;
  }
};

/**
 * @desc Update existing course
 */
export const updateAdminCourse = async (id, courseData) => {
  try {
    const response = await apiClient.put(`/admin/courses/${id}`, courseData);
    return response.data;
  } catch (error) {
    console.error('Error updating admin course:', error);
    throw error;
  }
};

/**
 * @desc Delete course
 */
export const deleteAdminCourse = async (id) => {
  try {
    const response = await apiClient.delete(`/admin/courses/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting admin course:', error);
    throw error;
  }
};

/**
 * @desc Update course status (visibility)
 */
export const updateAdminCourseStatus = async (id, status) => {
  try {
    const response = await apiClient.patch(`/admin/courses/${id}/status`, { status });
    return response.data;
  } catch (error) {
    console.error('Error updating admin course status:', error);
    throw error;
  }
};

/**
 * @desc Get all categories for admin
 */
export const getAdminCategories = async () => {
  try {
    const response = await apiClient.get('/admin/categories');
    return response.data;
  } catch (error) {
    console.error('Error fetching admin categories:', error);
    throw error;
  }
};

/**
 * @desc Create new category
 */
export const createAdminCategory = async (categoryData) => {
  try {
    const response = await apiClient.post('/admin/categories', categoryData);
    return response.data;
  } catch (error) {
    console.error('Error creating admin category:', error);
    throw error;
  }
};

/**
 * @desc Update existing category
 */
export const updateAdminCategory = async (id, categoryData) => {
  try {
    const response = await apiClient.put(`/admin/categories/${id}`, categoryData);
    return response.data;
  } catch (error) {
    console.error('Error updating admin category:', error);
    throw error;
  }
};

/**
 * @desc Delete category
 */
export const deleteAdminCategory = async (id) => {
  try {
    const response = await apiClient.delete(`/admin/categories/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting admin category:', error);
    throw error;
  }
};

/**
 * @desc Get all students for admin
 */
export const getAdminStudents = async (params) => {
  try {
    // params includes { role, page, limit, search }
    const response = await apiClient.get('/admin/students', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching admin students:', error);
    throw error;
  }
};

/**
 * @desc Get student statistics for admin
 */
export const getAdminStudentStats = async (role = 'student') => {
  try {
    const response = await apiClient.get('/admin/students/stats', { params: { role } });
    return response.data;
  } catch (error) {
    console.error('Error fetching admin student stats:', error);
    throw error;
  }
};

/**
 * @desc Get all subscription plans for admin
 */
export const getAdminSubscriptionPlans = async () => {
  try {
    const response = await apiClient.get('/admin/subscriptions/plans');
    return response.data;
  } catch (error) {
    console.error('Error fetching admin subscription plans:', error);
    throw error;
  }
};

/**
 * @desc Create new subscription plan
 */
export const createAdminSubscriptionPlan = async (planData) => {
  try {
    const response = await apiClient.post('/admin/subscriptions/plans', planData);
    return response.data;
  } catch (error) {
    console.error('Error creating admin subscription plan:', error);
    throw error;
  }
};

/**
 * @desc Update existing subscription plan
 */
export const updateAdminSubscriptionPlan = async (id, planData) => {
  try {
    const response = await apiClient.put(`/admin/subscriptions/plans/${id}`, planData);
    return response.data;
  } catch (error) {
    console.error('Error updating admin subscription plan:', error);
    throw error;
  }
};

/**
 * @desc Delete subscription plan
 */
export const deleteAdminSubscriptionPlan = async (id) => {
  try {
    const response = await apiClient.delete(`/admin/subscriptions/plans/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting admin subscription plan:', error);
    throw error;
  }
};

/**
 * @desc Get all user subscriptions for admin
 */
export const getAdminUserSubscriptions = async (params) => {
  try {
    const response = await apiClient.get('/admin/subscriptions/users', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching admin user subscriptions:', error);
    throw error;
  }
};

const adminService = {
  getAdminStats,
  getRecentEnrollments,
  getAdminCourses,
  getAdminCourseById,
  createAdminCourse,
  updateAdminCourse,
  deleteAdminCourse,
  updateAdminCourseStatus,
  getAdminCategories,
  createAdminCategory,
  updateAdminCategory,
  deleteAdminCategory,
  getAdminStudents,
  getAdminStudentStats,
  getAdminSubscriptionPlans,
  createAdminSubscriptionPlan,
  updateAdminSubscriptionPlan,
  deleteAdminSubscriptionPlan,
  getAdminUserSubscriptions,
};

export default adminService;
