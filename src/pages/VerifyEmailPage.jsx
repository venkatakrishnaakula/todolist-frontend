import React from 'react';
import EmailVerification from '../components/Auth/EmailVerification';
import Navbar from '../components/Layout/Navbar';
import '../App.css';

const VerifyEmailPage = () => {
  return (
    <div className="page-container">
      <Navbar />
      <main className="auth-main">
        <EmailVerification />
      </main>
    </div>
  );
};

export default VerifyEmailPage;