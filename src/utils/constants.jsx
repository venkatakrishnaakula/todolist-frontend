export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const APP_NAME = import.meta.env.VITE_APP_NAME || 'Smart Todo List';

export const TODO_FILTERS = {
  ALL: 'all',
  ACTIVE: 'active',
  COMPLETED: 'completed'
};

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    SIGNUP: '/auth/register',
    LOGOUT: '/auth/logout',
    VERIFY_EMAIL: '/auth/verify-email',
    RESEND_VERIFICATION: '/auth/resend-verification'
  },
  TODOS: {
    BASE: '/todos',
    BY_ID: (id) => `/todos/${id}`
  }
};