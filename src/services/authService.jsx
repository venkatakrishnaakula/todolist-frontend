import api from './api';
import { API_ENDPOINTS } from '../utils/constants';

export const authService = {
  login: async (email, password) => {
    const response = await api.post(API_ENDPOINTS.AUTH.LOGIN, {
      email,
      password,
    });
    // Expecting response.data to have token, refreshToken, user
    return response.data;
  },

  signup: async (firstName, lastName, email, password, username) => {
    const response = await api.post(API_ENDPOINTS.AUTH.SIGNUP, {
      username,
      firstName,
      lastName,
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
