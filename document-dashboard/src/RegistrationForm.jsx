import React, { useState } from 'react';

const RegistrationForm = ({ onRegisterSuccess, goBackToLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = () => {
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    fetch('http://localhost:3000/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          onRegisterSuccess();
        } else {
          setError(data.message);
        }
      })
      .catch(err => {
        setError('An error occurred while registering.');
      });
  };

  return (
    <div className="registration-container">
      <h2>Register</h2>
      {error && <p className="error">{error}</p>}
      <input
        type="text"
        placeholder="Enter Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <button className="auth-button" onClick={handleRegister}>Register</button>
      <button className="auth-back-button" onClick={goBackToLogin}>Back</button>
    </div>
  );
};

export default RegistrationForm;
