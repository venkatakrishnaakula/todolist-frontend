import React, { useState } from 'react';
import { useTodos } from '../../hooks/useTodos';
import { formatDate } from '../../utils/helpers';
import Modal from '../Common/Modal';
import TodoForm from './TodoForm';
import '../../App.css';

const TodoItem = ({ todo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  
  const { toggleTodo, deleteTodo } = useTodos();

  const handleToggle = async () => {
    await toggleTodo(todo._id);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleDelete = async () => {
    await deleteTodo(todo._id);
    setShowDeleteModal(false);
  };

  const handleEditCancel = () => {
    setIsEditing(false);
  };

  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'high': return 'priority-high';
      case 'medium': return 'priority-medium';
      case 'low': return 'priority-low';
      default: return '';
    }
  };

  return (
    <>
      <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
        <div className="todo-checkbox">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={handleToggle}
            id={`todo-${todo._id}`}
          />
          <label htmlFor={`todo-${todo._id}`} className="checkbox-label"></label>
        </div>

        <div className="todo-content">
          <div className="todo-header">
            <h3 className={`todo-title ${todo.completed ? 'completed' : ''}`}>
              {todo.title}
            </h3>
            <div className="todo-meta">
              <span className={`priority-badge ${getPriorityClass(todo.priority)}`}>
                {todo.priority}
              </span>
              <span className="todo-date">
                {formatDate(todo.createdAt)}
              </span>
            </div>
          </div>
          
          {todo.description && (
            <p className={`todo-description ${todo.completed ? 'completed' : ''}`}>
              {todo.description}
            </p>
          )}
        </div>

        <div className="todo-actions">
          <button
            onClick={handleEdit}
            className="action-button edit-button"
            aria-label="Edit todo"
          >
            ✏️
          </button>
          <button
            onClick={() => setShowDeleteModal(true)}
            className="action-button delete-button"
            aria-label="Delete todo"
          >
            🗑️
          </button>
        </div>
      </div>

      <Modal
        isOpen={isEditing}
        onClose={handleEditCancel}
        title="Edit Task"
      >
        <TodoForm
          editingTodo={todo}
          onCancel={handleEditCancel}
        />
      </Modal>

      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Delete Task"
      >
        <div className="delete-confirmation">
          <p>Are you sure you want to delete this task?</p>
          <p className="delete-task-title">"{todo.title}"</p>
          <div className="delete-actions">
            <button
              onClick={handleDelete}
              className="delete-confirm-button"
            >
              Delete
            </button>
            <button
              onClick={() => setShowDeleteModal(false)}
              className="delete-cancel-button"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default TodoItem;