import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Navbar from '../components/Layout/Navbar';
import Footer from '../components/Layout/Footer';
import { APP_NAME } from '../utils/constants';
import '../App.css';

const HomePage = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="page-container">
      <Navbar />
      
      <main className="home-main">
        <div className="hero-section">
          <div className="hero-content">
            <h1 className="hero-title">{APP_NAME}</h1>
            <p className="hero-subtitle">
              Organize your life with our secure and intuitive task management app
            </p>
            
            <div className="hero-features">
              <div className="feature">
                <span className="feature-icon">🔐</span>
                <span>Secure Authentication</span>
              </div>
              <div className="feature">
                <span className="feature-icon">📱</span>
                <span>Responsive Design</span>
              </div>
              <div className="feature">
                <span className="feature-icon">✅</span>
                <span>Easy Task Management</span>
              </div>
            </div>

            <div className="hero-actions">
              {isAuthenticated ? (
                <Link to="/dashboard" className="cta-button primary">
                  Go to Dashboard
                </Link>
              ) : (
                <>
                  <Link to="/signup" className="cta-button primary">
                    Get Started
                  </Link>
                  <Link to="/login" className="cta-button secondary">
                    Sign In
                  </Link>
                </>
              )}
            </div>
          </div>
          
          <div className="hero-image">
            <div className="mockup-card">
              <div className="mockup-header">
                <div className="mockup-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
              <div className="mockup-content">
                <div className="mockup-todo completed">
                  <span className="mockup-checkbox">✓</span>
                  <span>Complete project proposal</span>
                </div>
                <div className="mockup-todo">
                  <span className="mockup-checkbox">○</span>
                  <span>Review client feedback</span>
                </div>
                <div className="mockup-todo">
                  <span className="mockup-checkbox">○</span>
                  <span>Schedule team meeting</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default HomePage;