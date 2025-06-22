// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';

import './App.css';
import Register from './pages/Register';
import Login from './pages/Login';
import ExpensesList from './components/ExpensesList';
import Statistics from './components/Statistics';

export default function App() {
  const isLoggedIn = !!localStorage.getItem('token');
  const username = localStorage.getItem('username');

  return (
    <Router>
      <div className='container'>
        <h1>
          <span>E</span>
          <span className='x'>x</span>
          <span>penso!</span>
          </h1>


      <nav className="nav">
        <div className="nav-left">
          {!isLoggedIn && (
            <>
              <Link className="link-register" to="/register">Register</Link> |{" "}
              <Link className="link-login" to="/login">Login</Link>
            </>
          )}
          {isLoggedIn && (
            <>
              <Link className='link-expenses' to="/expenses">Expenses</Link> |{" "}
              <Link className='link-statistics' to="/statistics">Statistics</Link> |{" "}
              <button className='button-logout' onClick={() => {
                localStorage.removeItem('token');
                localStorage.removeItem('username');
                window.location.href = '/login';
              }}>Logout</button>
            </>
          )}
        </div>

        {isLoggedIn && (
          <div className="nav-right">
            <h4 className='username'>
              <span className="hi-text">Hi, </span>
              <span className="name-text">{username}</span>
            </h4>
          </div>
        )}
      </nav>

        <hr />

        <Routes>
          <Route path="/" element={<Navigate to={isLoggedIn ? "/expenses" : "/register"} />} />
          <Route path="/register" element={<Register onSuccess={() => window.location.href = '/login'} />} />
          <Route path="/login" element={<Login onSuccess={() => window.location.href = '/expenses'} />} />
          <Route path="/expenses" element={isLoggedIn ? <ExpensesList /> : <Navigate to="/login" />} />
          <Route path="/statistics" element={isLoggedIn ? <Statistics /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}
