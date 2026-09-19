import React, { useState } from 'react';
import { X, Mail, Lock, User, Phone } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const AuthModal = ({ isOpen, onClose, initialMode = 'login' }) => {
  const [mode, setMode] = useState(initialMode);
  const { login, signup } = useAuth();

  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    mail: '',
    phno: '',
    pass: ''
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (mode === 'login') {
      const res = await login(formData.mail, formData.pass);
      if (res.success) onClose();
    } else {
      const res = await signup(formData);
      if (res.success) onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <X size={18} />
        </button>

        <h2 className="modal-title">
          {mode === 'login' ? 'Welcome Back to EventHub' : 'Create an Account'}
        </h2>

        <form onSubmit={handleSubmit}>
          {mode === 'signup' && (
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">First Name</label>
                <input
                  type="text"
                  name="fname"
                  className="form-input"
                  placeholder="John"
                  value={formData.fname}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Last Name</label>
                <input
                  type="text"
                  name="lname"
                  className="form-input"
                  placeholder="Doe"
                  value={formData.lname}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          )}

          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              name="mail"
              className="form-input"
              placeholder="user@example.com"
              value={formData.mail}
              onChange={handleChange}
              required
            />
          </div>

          {mode === 'signup' && (
            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <input
                type="tel"
                name="phno"
                className="form-input"
                placeholder="+1 555-0199"
                value={formData.phno}
                onChange={handleChange}
                required
              />
            </div>
          )}

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="pass"
              className="form-input"
              placeholder="••••••••"
              value={formData.pass}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '1rem', justifyContent: 'center' }}>
            {mode === 'login' ? 'Log In' : 'Sign Up'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '1.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          {mode === 'login' ? (
            <span>
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => setMode('signup')}
                style={{ background: 'none', border: 'none', color: '#818cf8', fontWeight: 600 }}
              >
                Sign Up
              </button>
            </span>
          ) : (
            <span>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => setMode('login')}
                style={{ background: 'none', border: 'none', color: '#818cf8', fontWeight: 600 }}
              >
                Log In
              </button>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
