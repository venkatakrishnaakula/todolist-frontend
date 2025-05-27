import React, { createContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    // Only require token and userData for authentication
    if (token && userData) {
      setUser(JSON.parse(userData));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      setError(null);
      setLoading(true);
      const data = await authService.login(email, password);
      // Expecting data.token and data.refreshToken from backend
      localStorage.setItem('token', data.tokens?.accessToken);
      localStorage.setItem('refreshToken', data.tokens?.refreshToken);
      // Map isVerified property if needed
      let userObj = data.user;
      if (userObj && userObj.verified !== undefined) {
        userObj.isVerified = userObj.verified;
      } else if (userObj && userObj.emailVerified !== undefined) {
        userObj.isVerified = userObj.emailVerified;
      } else if (userObj && userObj.isVerified === undefined) {
        // fallback: assume verified if not present (customize as needed)
        userObj.isVerified = true;
      }
      localStorage.setItem('user', JSON.stringify(userObj));
      setUser(userObj);
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed';
      setError(message);
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  };

  const signup = async (firstName, lastName, email, password, username) => {
    try {
      setError(null);
      setLoading(true);
      const data = await authService.signup(firstName, lastName, email, password, username);
      return { success: true, message: data.message };
    } catch (error) {
      const message = error.response?.data?.message || 'Signup failed';
      setError(message);
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
    }
  };

  const verifyEmail = async (token) => {
    try {
      setError(null);
      setLoading(true);
      const data = await authService.verifyEmail(token);
      return { success: true, message: data.message };
    } catch (error) {
      const message = error.response?.data?.message || 'Email verification failed';
      setError(message);
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    error,
    login,
    signup,
    logout,
    verifyEmail,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
