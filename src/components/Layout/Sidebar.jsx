import React from 'react';
import { useTodos } from '../../hooks/useTodos';
import TodoStats from '../Todo/TodoStats';
import '../../App.css';

const Sidebar = () => {
  const { todoStats } = useTodos();

  return (
    <aside className="sidebar">
      <div className="sidebar-content">
        <TodoStats />
        
        <div className="sidebar-section">
          <h3>Quick Stats</h3>
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-number">{todoStats.total}</span>
              <span className="stat-label">Total Tasks</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{todoStats.active}</span>
              <span className="stat-label">Active</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{todoStats.completed}</span>
              <span className="stat-label">Completed</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;