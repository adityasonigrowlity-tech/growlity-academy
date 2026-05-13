import apiClient from '@/lib/api-client';

/**
 * @desc Get all active subscription plans for public
 */
export const getPublicSubscriptionPlans = async () => {
  try {
    const response = await apiClient.get('/public/subscriptions/plans');
    return response.data;
  } catch (error) {
    console.error('Error fetching public subscription plans:', error);
    throw error;
  }
};

const subscriptionService = {
  getPublicSubscriptionPlans,
};

export default subscriptionService;
