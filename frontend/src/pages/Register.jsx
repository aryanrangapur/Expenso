// src/pages/Register.jsx
import React, { useState } from 'react';
import api from '../services/api';
import './Register.css';

export default function Register({ onSuccess }) {
  const [form, setForm] = useState({
    username: '',
    email: '',
    first_name: '', 
    last_name: '',
    password: '',
    password2: '',
  });
  const [error, setError] = useState('');

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      await api.post('register/', {
        username:   form.username,
        email:      form.email,
        first_name: form.first_name,
        last_name:  form.last_name,
        password:   form.password,
        password2:  form.password2,
      });
      onSuccess();
    } catch (err) {
      setError(JSON.stringify(err.response?.data || 'Registration failed'));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h2>Register</h2>
      {error && <p className="auth-error">{error}</p>}
      
      <div>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          name="username"
          type="text"
          // placeholder="username"
          value={form.username}
          onChange={handleChange}
          required
          className="auth-input"
        />
      </div>

      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          // placeholder="email"
          value={form.email}
          onChange={handleChange}
          required
          className="auth-input"
        />
      </div>

      <div>
        <label htmlFor="first_name">First Name</label>
        <input
          id="first_name"
          name="first_name"
          type="text"
          // placeholder="first name"
          value={form.first_name}
          onChange={handleChange}
          required
          className="auth-input"
        />
      </div>

      <div>
        <label htmlFor="last_name">Last Name</label>
        <input
          id="last_name"
          name="last_name"
          type="text"
          // placeholder="last name"
          value={form.last_name}
          onChange={handleChange}
          required
          className="auth-input"
        />
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          // placeholder="password"
          value={form.password}
          onChange={handleChange}
          required
          className="auth-input"
        />
      </div>

      <div>
        <label htmlFor="password2">Confirm Password</label>
        <input
          id="password2"
          name="password2"
          type="password"
          // placeholder="confirm password"
          value={form.password2}
          onChange={handleChange}
          required
          className="auth-input"
        />
      </div>

      <button type="submit" className="auth-button">Sign Up</button>
    </form>
  );
}
