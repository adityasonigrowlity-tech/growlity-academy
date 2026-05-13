import apiClient from '@/lib/api-client';
import { API_ENDPOINTS, STORAGE_KEYS } from '@/config/constants';

export const authService = {
  async login(credentials) {
    const response = await apiClient.post(API_ENDPOINTS.AUTH.LOGIN, credentials);
    const { data } = response.data; // Unpack the nested data from ApiResponse
    if (data && data.token) {
      localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, data.token);
      localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(data.user));
    }
    return response.data;
  },

  async signup(userData) {
    const response = await apiClient.post(API_ENDPOINTS.AUTH.SIGNUP, userData);
    const { data } = response.data; // Unpack the nested data from ApiResponse
    if (data && data.token) {
      localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, data.token);
      localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(data.user));
    }
    return response.data;
  },

  logout(redirectPath = '/login') {
    localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER_DATA);
    window.location.href = redirectPath;
  },

  getCurrentUser() {
    const user = localStorage.getItem(STORAGE_KEYS.USER_DATA);
    return user ? JSON.parse(user) : null;
  }
};
