import React, { useEffect, useState } from 'react';
import api from '../services/api';
import './Statistics.css';

export default function Statistics() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('expenses/statistics/')
      .then(resp => {
        setStats(resp.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Could not load statistics');
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading statistics…</p>;
  if (error)   return <p className="auth-error">{error}</p>;
  if (!stats || typeof stats !== 'object') {
    return <p>No statistics available.</p>;
  }

  return (
    <div className="stats-container">
      <h2>Expense Statistics</h2>

      {Object.entries(stats).map(([year, { yearly = 0, monthly = {}, weekly = {} }]) => (
        <div key={year} className="stats-year">
          <h3>{year}</h3>

          <div className="stats-list">
            <div className="stats-title">Yearly Total: ₹{yearly}</div>
  
            {Object.keys(monthly).length > 0 && (
              <>
                <div className="stats-title">Monthly</div>
                <ul>
                  {Object.entries(monthly).map(([month, total]) => (
                    <li key={month}>{month}: ₹{total}</li>
                  ))}
                </ul>
              </>
            )}

            {Object.keys(weekly).length > 0 && (
              <>
                <div className="stats-title">Weekly</div>
                <ul>
                  {Object.entries(weekly).map(([label, total]) => (
                    <li key={label}>{label}: ₹{total}</li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
