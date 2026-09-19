import React from 'react';
import { X, User, Mail, Phone, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const ProfileModal = ({ isOpen, onClose }) => {
  const { user } = useAuth();

  if (!isOpen || !user) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <X size={18} />
        </button>

        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <div className="avatar-circle" style={{ width: '64px', height: '64px', fontSize: '1.75rem', margin: '0 auto 1rem' }}>
            {user.fullname ? user.fullname.charAt(0).toUpperCase() : user.username.charAt(0).toUpperCase()}
          </div>
          <h2 className="modal-title" style={{ marginBottom: '0.25rem' }}>
            {user.fullname || user.username}
          </h2>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>@{user.username}</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', background: 'rgba(15, 23, 42, 0.5)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <ShieldCheck color="#818cf8" size={20} />
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>User ID</div>
              <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{user._id || user.id}</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Mail color="#ec4899" size={20} />
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Email Address</div>
              <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{user.mail}</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Phone color="#10b981" size={20} />
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Contact Number</div>
              <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{user.phno || 'Not provided'}</div>
            </div>
          </div>
        </div>

        <button className="btn-secondary" onClick={onClose} style={{ width: '100%', marginTop: '1.5rem', justifyContent: 'center' }}>
          Close Profile
        </button>
      </div>
    </div>
  );
};
