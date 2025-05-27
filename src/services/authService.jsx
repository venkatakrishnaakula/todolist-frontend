import api from './api';
import { API_ENDPOINTS } from '../utils/constants';

export const authService = {
  login: async (email, password) => {
    const response = await api.post(API_ENDPOINTS.AUTH.LOGIN, {
      email,
      password,
    });
    return response.data;
  },

  signup: async (name, email, password) => {
    const response = await api.post(API_ENDPOINTS.AUTH.SIGNUP, {
      name,
      email,
      password,
    });
    return response.data;
  },

  logout: async () => {
    await api.post(API_ENDPOINTS.AUTH.LOGOUT);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  verifyEmail: async (token) => {
    const response = await api.get(`${API_ENDPOINTS.AUTH.VERIFY_EMAIL}?token=${token}`);
    return response.data;
  },

  resendVerification: async (email) => {
    const response = await api.post(API_ENDPOINTS.AUTH.RESEND_VERIFICATION, {
      email,
    });
    return response.data;
  },
};
