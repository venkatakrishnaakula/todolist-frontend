import React from 'react';
import { useTodos } from '../../hooks/useTodos';
import { TODO_FILTERS } from '../../utils/constants';
import '../../App.css';

const TodoFilter = () => {
  const { filter, setFilter, todoStats } = useTodos();

  const filters = [
    { key: TODO_FILTERS.ALL, label: 'All', count: todoStats.total },
    { key: TODO_FILTERS.ACTIVE, label: 'Active', count: todoStats.active },
    { key: TODO_FILTERS.COMPLETED, label: 'Completed', count: todoStats.completed },
  ];

  return (
    <div className="todo-filter">
      {filters.map(({ key, label, count }) => (
        <button
          key={key}
          onClick={() => setFilter(key)}
          className={`filter-button ${filter === key ? 'active' : ''}`}
        >
          {label} 
          <span className="filter-count">({count})</span>
        </button>
      ))}
    </div>
  );
};

export default TodoFilter;