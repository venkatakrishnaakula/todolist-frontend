import React, { createContext, useState, useEffect } from 'react';
import { todoService } from '../services/todoService';
import { TODO_FILTERS } from '../utils/constants';

export const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState(TODO_FILTERS.ALL);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await todoService.getTodos();
      setTodos(data.todos || []);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to fetch todos');
    } finally {
      setLoading(false);
    }
  };

  const addTodo = async (todoData) => {
    try {
      setError(null);
      const data = await todoService.createTodo(todoData);
      setTodos(prev => [data.todo, ...prev]);
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to add todo';
      setError(message);
      return { success: false, message };
    }
  };

  const updateTodo = async (id, todoData) => {
    try {
      setError(null);
      const data = await todoService.updateTodo(id, todoData);
      setTodos(prev => prev.map(todo => 
        todo._id === id ? data.todo : todo
      ));
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to update todo';
      setError(message);
      return { success: false, message };
    }
  };

  const deleteTodo = async (id) => {
    try {
      setError(null);
      await todoService.deleteTodo(id);
      setTodos(prev => prev.filter(todo => todo._id !== id));
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to delete todo';
      setError(message);
      return { success: false, message };
    }
  };

  const toggleTodo = async (todo) => {
    try {
      setError(null);
      const data = await todoService.toggleTodo(todo);
      setTodos(prev => prev.map(t => 
        t._id === todo._id ? data.todo : t
      ));
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to toggle todo';
      setError(message);
      return { success: false, message };
    }
  };

  const filteredTodos = todos.filter(todo => {
    switch (filter) {
      case TODO_FILTERS.ACTIVE:
        return todo.status !== 'completed';
      case TODO_FILTERS.COMPLETED:
        return todo.status === 'completed';
      default:
        return true;
    }
  });

  const todoStats = {
    total: todos.length,
    completed: todos.filter(todo => todo.status === 'completed').length,
    active: todos.filter(todo => todo.status !== 'completed').length,
  };

  const value = {
    todos: filteredTodos,
    allTodos: todos,
    filter,
    setFilter,
    loading,
    error,
    todoStats,
    fetchTodos,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleTodo,
  };

  return (
    <TodoContext.Provider value={value}>
      {children}
    </TodoContext.Provider>
  );
};
