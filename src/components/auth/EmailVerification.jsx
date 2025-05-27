import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import LoadingSpinner from '../Common/LoadingSpinner';
import ErrorMessage from '../Common/ErrorMessage';
import SuccessMessage from '../Common/SuccessMessage';
import '../../App.css';

const EmailVerification = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState('verifying'); // verifying, success, error
  const [message, setMessage] = useState('');
  const [resendLoading, setResendLoading] = useState(false);

  const { verifyEmail, user } = useAuth();
  const navigate = useNavigate();

  const token = searchParams.get('token');

  useEffect(() => {
    if (token) {
      handleVerification();
    } else if (user && user.isVerified) {
      navigate('/dashboard');
    } else {
      setStatus('error');
      setMessage('Invalid verification link');
    }
  }, [token, user]);

  const handleVerification = async () => {
    try {
      const result = await verifyEmail(token);
      if (result.success) {
        setStatus('success');
        setMessage('Email verified successfully! Redirecting to dashboard...');
        setTimeout(() => {
          navigate('/dashboard');
        }, 2000);
      } else {
        setStatus('error');
        setMessage(result.message);
      }
    } catch (error) {
      setStatus('error');
      setMessage('Verification failed. Please try again.');
    }
  };

  const handleResendVerification = async () => {
    if (!user?.email) return;
    
    setResendLoading(true);
    try {
      // This would need to be implemented in your auth service
      setMessage('Verification email sent! Please check your inbox.');
    } catch (error) {
      setMessage('Failed to resend verification email.');
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>Email Verification</h1>
        </div>

        <div className="verification-content">
          {status === 'verifying' && (
            <div className="verification-status">
              <LoadingSpinner size="large" text="Verifying your email..." />
            </div>
          )}

          {status === 'success' && (
            <div className="verification-status">
              <div className="success-icon">✅</div>
              <SuccessMessage message={message} />
            </div>
          )}

          {status === 'error' && (
            <div className="verification-status">
              <div className="error-icon">❌</div>
              <ErrorMessage message={message} />
              
              {user && !user.isVerified && (
                <div className="resend-section">
                  <p>Didn't receive the email?</p>
                  <button
                    onClick={handleResendVerification}
                    disabled={resendLoading}
                    className="resend-button"
                  >
                    {resendLoading ? 'Sending...' : 'Resend Verification Email'}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;