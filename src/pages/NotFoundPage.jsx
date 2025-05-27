import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Layout/Navbar';
import '../App.css';

const NotFoundPage = () => {
  return (
    <div className="page-container">
      <Navbar />
      
      <main className="not-found-main">
        <div className="not-found-content">
          <div className="not-found-icon">🔍</div>
          <h1>404 - Page Not Found</h1>
          <p>The page you're looking for doesn't exist.</p>
          
          <div className="not-found-actions">
            <Link to="/" className="cta-button primary">
              Go Home
            </Link>
            <Link to="/dashboard" className="cta-button secondary">
              Dashboard
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NotFoundPage;