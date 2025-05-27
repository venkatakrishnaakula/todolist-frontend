import React, { useState } from 'react';
import { useTodos } from '../hooks/useTodos';
import Header from '../components/Layout/Header';
import Sidebar from '../components/Layout/Sidebar';
import TodoForm from '../components/Todo/TodoForm';
import TodoList from '../components/Todo/TodoList';
import '../App.css';

const DashboardPage = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const { todoStats } = useTodos();

  return (
    <div className="dashboard-container">
      <Header />
      
      <div className="dashboard-layout">
        <Sidebar />
        
        <main className="dashboard-main">
          <div className="dashboard-header">
            <div className="dashboard-title">
              <h1>My Dashboard</h1>
              <p>Stay organized and get things done!</p>
            </div>
            
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="add-todo-button"
            >
              {showAddForm ? 'Cancel' : '+ Add New Task'}
            </button>
          </div>

          {showAddForm && (
            <div className="add-form-container">
              <TodoForm onCancel={() => setShowAddForm(false)} />
            </div>
          )}

          <div className="dashboard-content">
            <TodoList />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;
