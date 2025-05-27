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

  toggleTodo: async (todo) => {
    // Toggle the completed property and use updateTodo
    const response = await api.put(API_ENDPOINTS.TODOS.BY_ID(todo._id), {
      ...todo,
      completed: !todo.completed,
    });
    return response.data;
  },
};
