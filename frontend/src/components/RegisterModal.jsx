import React, { useState, useEffect } from 'react';
import { X, Ticket } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useEvents } from '../context/EventContext';

export const RegisterModal = ({ isOpen, onClose, event }) => {
  const { user } = useAuth();
  const { registerForEvent } = useEvents();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (user) {
      setName(user.fullname || user.username || '');
      setEmail(user.mail || '');
    }
  }, [user]);

  if (!isOpen || !event) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await registerForEvent(event._id || event.id, name, email);
    if (success) onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <X size={18} />
        </button>

        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <Ticket size={40} color="#818cf8" style={{ marginBottom: '0.5rem' }} />
          <h2 className="modal-title" style={{ marginBottom: '0.25rem' }}>
            Register for {event.title}
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            {event.date} • {event.location}
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              className="form-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Email Address for Ticket Confirmation</label>
            <input
              type="email"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '1rem', borderRadius: 'var(--radius-md)', margin: '1.25rem 0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700 }}>
              <span>Total Amount:</span>
              <span style={{ color: '#818cf8' }}>
                {event.price === 0 ? 'Free' : `$${Number(event.price).toFixed(2)}`}
              </span>
            </div>
          </div>

          <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
            Confirm Registration
          </button>
        </form>
      </div>
    </div>
  );
};
