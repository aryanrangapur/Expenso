// src/components/ExpensesList.jsx
import React, { useEffect, useState } from 'react';
import api from '../services/api';
import ExpenseForm from './ExpenseForm';
import './ExpensesList.css';

export default function ExpensesList() {
  const [expenses, setExpenses] = useState([]);
  const [err, setErr] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [showAll, setShowAll] = useState(false);

  const loadExpenses = () => {
    api.get('expenses/')
      .then(resp => {
          const sorted = resp.data.sort(
          (a, b) => new Date(b.transaction_date) - new Date(a.transaction_date)
        );
        setExpenses(sorted);
        setEditingId(null);
      })
      .catch(() => setErr('Failed to load expenses'));
  };

  useEffect(loadExpenses, []);
  
  const handleDelete = async id => {
    if (!window.confirm('Delete this expense?')) return;
    await api.delete(`expenses/${id}/`);
    loadExpenses();
  };

  if (err) return <p className="error">{err}</p>;

  // Determine which items to show
  const displayed = showAll ? expenses : expenses.slice(0, 5);

  return (
    <div className="expense-container">
      <h4 className="expense-title">Your Expenses</h4>

      <ul className="expense-list">
        {displayed.map(e => (
          <li key={e.id} className="expense-item">
            {editingId === e.id ? (
              // Inline edit form if this item is being edited
              <ExpenseForm
                initialData={e}
                onSaved={loadExpenses}
              />
            ) : (
              <>
                <span>
                  <strong>{e.category}</strong>: ₹{e.amount} on {e.transaction_date}
                </span>
                <span className="item-buttons">
                  <button className='edit-button' onClick={() => setEditingId(e.id)}>Edit</button>
                  <button className='delete-button' onClick={() => handleDelete(e.id)}>Delete</button>
                </span>
              </>
            )}
          </li>
        ))}
      </ul>

      {/* Show All / Show Less toggle */}
      {expenses.length > 5 && (
        <button
          className="expand-button"
          onClick={() => setShowAll(sa => !sa)}
        >
          {showAll ? 'Show Less' : `Show All (${expenses.length})`}
        </button>
      )}

      {/* Creation form only when not editing */}
      {!editingId && <ExpenseForm onSaved={loadExpenses} />}
    </div>
  );
}
