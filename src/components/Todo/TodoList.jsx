import React, { useEffect } from 'react';
import { useTodos } from '../../hooks/useTodos';
import TodoItem from './TodoItem';
import TodoFilter from './TodoFilter';
import LoadingSpinner from '../Common/LoadingSpinner';
import ErrorMessage from '../Common/ErrorMessage';
import '../../App.css';

const TodoList = () => {
  const { todos, loading, error, fetchTodos } = useTodos();

  useEffect(() => {
    fetchTodos();
  }, []);

  if (loading && todos.length === 0) {
    return <LoadingSpinner size="large" text="Loading your tasks..." />;
  }

  return (
    <div className="todo-list-container">
      <div className="todo-list-header">
        <h2>Your Tasks</h2>
        <TodoFilter />
      </div>

      <ErrorMessage message={error} />

      <div className="todo-list">
        {todos.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📝</div>
            <h3>No tasks found</h3>
            <p>Start by adding your first task above!</p>
          </div>
        ) : (
          todos.map((todo) => (
            <TodoItem key={todo._id} todo={todo} />
          ))
        )}
      </div>

      {loading && todos.length > 0 && (
        <div className="loading-overlay">
          <LoadingSpinner size="small" text="Updating..." />
        </div>
      )}
    </div>
  );
};

export default TodoList;