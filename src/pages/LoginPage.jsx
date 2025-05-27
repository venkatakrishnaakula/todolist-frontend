import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { Navigate } from 'react-router-dom';
import Login from '../components/Auth/Login';
import Navbar from '../components/Layout/Navbar';
import '../App.css';

const LoginPage = () => {
  const { isAuthenticated, user } = useAuth();

  if (isAuthenticated && user?.isVerified) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="page-container">
      <Navbar />
      <main className="auth-main">
        <Login />
      </main>
    </div>
  );
};

export default LoginPage;