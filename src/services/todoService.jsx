import api from './api';
import { API_ENDPOINTS } from '../utils/constants';

export const todoService = {
  getTodos: async () => {
    const response = await api.get(API_ENDPOINTS.TODOS.BASE);
    return response.data;
  },

  createTodo: async (todoData) => {
    const response = await api.post(API_ENDPOINTS.TODOS.BASE, todoData);
    return response.data;
  },

  updateTodo: async (id, todoData) => {
    const response = await api.put(API_ENDPOINTS.TODOS.BY_ID(id), todoData);
    return response.data;
  },

  deleteTodo: async (id) => {
    const response = await api.delete(API_ENDPOINTS.TODOS.BY_ID(id));
    return response.data;
  },

  toggleTodo: async (id) => {
    const response = await api.patch(`${API_ENDPOINTS.TODOS.BY_ID(id)}/toggle`);
    return response.data;
  },
};
