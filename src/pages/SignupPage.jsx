import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { Navigate } from 'react-router-dom';
import Signup from '../components/Auth/Signup';
import Navbar from '../components/Layout/Navbar';
import '../App.css';

const SignupPage = () => {
  const { isAuthenticated, user } = useAuth();

  if (isAuthenticated && user?.isVerified) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="page-container">
      <Navbar />
      <main className="auth-main">
        <Signup />
      </main>
    </div>
  );
};

export default SignupPage;
