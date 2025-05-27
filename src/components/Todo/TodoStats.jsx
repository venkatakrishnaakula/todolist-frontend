import React from 'react';
import { useTodos } from '../../hooks/useTodos';
import '../../App.css';

const TodoStats = () => {
  const { todoStats } = useTodos();

  const completionRate = todoStats.total > 0 
    ? Math.round((todoStats.completed / todoStats.total) * 100) 
    : 0;

  return (
    <div className="todo-stats">
      <h3>Progress Overview</h3>
      
      <div className="progress-circle">
        <div 
          className="progress-ring"
          style={{ '--progress': `${completionRate}%` }}
        >
          <span className="progress-text">{completionRate}%</span>
        </div>
      </div>

      <div className="stats-summary">
        <div className="stat-row">
          <span>Total Tasks:</span>
          <span>{todoStats.total}</span>
        </div>
        <div className="stat-row">
          <span>Completed:</span>
          <span>{todoStats.completed}</span>
        </div>
        <div className="stat-row">
          <span>Remaining:</span>
          <span>{todoStats.active}</span>
        </div>
      </div>
    </div>
  );
};

export default TodoStats;
