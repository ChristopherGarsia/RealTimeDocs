import React, { useState } from 'react';
import RegistrationForm from './RegistrationForm';

const LoginForm = ({ setUserId, setIsLoggedIn }) => {
  const [showRegistration, setShowRegistration] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    fetch('http://localhost:3000/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            setUserId(username);
            setIsLoggedIn(true); 
          } else {
            setError('Invalid credentials');
          }
        })
        .catch((error) => {
          console.error('Error logging in:', error);
          setError('Login failed');
        });
  };

  const handleRegisterSuccess = () => {
    setShowRegistration(false);
  };

  return (
    <div className="auth-container">
      {showRegistration ? (
        <RegistrationForm 
            onRegisterSuccess={handleRegisterSuccess} 
            goBackToLogin={() => setShowRegistration(false)}
        />
      ) : (
        <div className="login-container">
          <h2 className="auth-title">Login</h2>
          <input 
            className="auth-input" 
            type="text" 
            placeholder="Username" 
            onChange={(e) => setUsername(e.target.value)}
          />
          <input 
            className="auth-input" 
            type="password" 
            placeholder="Password" 
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button className="auth-button" onClick={handleLogin}>Login</button>
          <p className="auth-toggle">
            Don't have an account?{' '}
            <button className="toggle-button" onClick={() => setShowRegistration(true)}>
              Register here
            </button>
          </p>
        </div>
      )}
    </div>
  );
};

export default LoginForm;