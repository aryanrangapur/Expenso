import React, { useState } from 'react';
import api from '../services/api';
import './Login.css';

export default function Login({ onSuccess }) {
  const [form, setForm] = useState({});
  const [error, setError] = useState('');

  const handleChange = e =>
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      const { data } = await api.post('auth/token/', {
        username: form.username,
        password: form.password
      });
      localStorage.setItem('token', data.token);
      localStorage.setItem('username', form.username); 

      onSuccess();
    } catch (err) {
      setError(JSON.stringify(err.response?.data || 'Login failed'));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h2>Login</h2>
      {error && <p className="auth-error">{error}</p>}
      <input name="username" placeholder="Username" onChange={handleChange} required className="auth-input" />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} required className="auth-input" />
      <button type="submit" className="auth-button">Log In</button>
    </form>
  );
}
