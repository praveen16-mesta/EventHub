import React from 'react';
import { MapPin, Users, Calendar, Trash2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const EventCard = ({ event, onRegister, onDelete }) => {
  const { user } = useAuth();
  const percentage = Math.min(100, Math.round((event.attendees / event.capacity) * 100));
  const isFull = event.attendees >= event.capacity;
  const isOrganizer = user && event.organizer && (event.organizer === user.id || event.organizer._id === user.id);

  return (
    <div className="event-card">
      <div className="card-banner">
        <span className="category-badge">{event.category}</span>
        <div className="date-badge">
          <Calendar size={14} />
          {event.date}
        </div>
      </div>

      <div className="card-body">
        <h3 className="card-title">{event.title}</h3>
        <div className="card-meta">
          <MapPin size={15} color="#818cf8" />
          <span>{event.location}</span>
        </div>

        <p className="card-desc">{event.description || 'Join us for an unforgettable experience with top professionals and vibrant community vibes.'}</p>

        <div className="card-stats">
          <div className="progress-info">
            <span>
              <Users size={14} style={{ display: 'inline', marginRight: '4px' }} />
              {event.attendees} / {event.capacity} Attendees
            </span>
            <span>{percentage}% filled</span>
          </div>
          <div className="progress-bar-track">
            <div className="progress-bar-fill" style={{ width: `${percentage}%` }}></div>
          </div>
        </div>

        <div className="card-footer">
          <div className="price-tag">
            {event.price === 0 ? 'Free' : `$${Number(event.price).toFixed(2)}`}
          </div>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {isOrganizer && onDelete && (
              <button
                className="btn-danger"
                onClick={() => onDelete(event._id || event.id)}
                title="Delete Event"
              >
                <Trash2 size={16} />
              </button>
            )}

            <button
              className={`btn-primary ${isFull ? 'disabled' : ''}`}
              onClick={() => onRegister(event)}
              disabled={isFull}
              style={isFull ? { opacity: 0.6, cursor: 'not-allowed', background: '#475569' } : {}}
            >
              {isFull ? 'Sold Out' : 'Register Now'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
