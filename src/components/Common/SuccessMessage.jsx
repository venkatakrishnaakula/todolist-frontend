import React from 'react';
import '../../App.css';

const SuccessMessage = ({ message, onDismiss }) => {
  if (!message) return null;

  return (
    <div className="success-message">
      <div className="success-content">
        <span className="success-icon">✅</span>
        <span className="success-text">{message}</span>
        {onDismiss && (
          <button 
            className="success-dismiss"
            onClick={onDismiss}
            aria-label="Dismiss success message"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
};

export default SuccessMessage;
