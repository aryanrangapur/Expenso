// src/components/ExpenseForm.jsx
import React, { useState, useEffect } from 'react';
import api from '../services/api';
import './ExpenseForm.css';

export default function ExpenseForm({ 
  onSaved,        // called after create or update
  initialData     // if provided, we’re editing
}) {
  const isEdit = Boolean(initialData && initialData.id);
  const [form, setForm] = useState({
    amount: '',
    category: '',
    transaction_date: ''
  });
  const [error, setError] = useState('');

  // Populate form when editing
  useEffect(() => {
    if (isEdit) {
      setForm({
        amount: initialData.amount,
        category: initialData.category,
        transaction_date: initialData.transaction_date
      });
    }
  }, [initialData]);

  const handleChange = e =>
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      if (isEdit) {
        await api.put(`expenses/${initialData.id}/`, form);
      } else {
        await api.post('expenses/', form);
      }
      onSaved();
      // clear form if this was a create
      if (!isEdit) {
        setForm({ amount: '', category: '', transaction_date: '' });
      }
    } catch (err) {
      setError(JSON.stringify(err.response?.data || 'Failed to save'));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="expense-form">
      <h2>{isEdit ? 'Edit Expense' : 'Add Expense'}</h2>
      {error && <p className="expense-error">{error}</p>}
      <input
        name="category"
        type="text"
        placeholder="Category"
        value={form.category}
        onChange={handleChange}
        required
        className="expense-input"
      />
      <input
        name="amount"
        type="number"
        placeholder="Amount"
        value={form.amount}
        onChange={handleChange}
        required
        className="expense-input"
      />
     
      <input
        name="transaction_date"
        type="date"
        placeholder="Date"
        value={form.transaction_date}
        onChange={handleChange}
        required
        className="expense-input"
      />
      <button type="submit" className="expense-button">
        {isEdit ? 'Update' : 'Add'}
      </button>
    </form>
  );
}
