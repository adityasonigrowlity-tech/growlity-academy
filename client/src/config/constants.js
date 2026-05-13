export const USER_ROLES = {
  STUDENT: 'student',
  INSTRUCTOR: 'instructor',
  ADMIN: 'admin',
  CORPORATE_HR: 'corporate_hr',
};

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    SIGNUP: '/auth/signup',
    LOGOUT: '/auth/logout',
    ME: '/auth/me',
  },
  COURSES: {
    LIST: '/courses',
    DETAIL: (id) => `/courses/${id}`,
  },
  USERS: {
    PROFILE: '/users/profile',
  },
};

export const STORAGE_KEYS = {
  AUTH_TOKEN: 'growlity_token',
  USER_DATA: 'growlity_user',
  THEME: 'growlity_theme',
};

export const APP_ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  DASHBOARD: {
    STUDENT: '/dashboard',
    INSTRUCTOR: '/instructor',
    BUSINESS: '/business',
    ADMIN: '/admin',
  },
};
