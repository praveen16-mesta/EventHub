import React from 'react';
import { EventCard } from './EventCard';
import { CalendarX } from 'lucide-react';

export const EventGrid = ({ events, loading, onRegister, onDelete }) => {
  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-muted)' }}>
        <p>Loading events...</p>
      </div>
    );
  }

  if (!events || events.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-muted)' }}>
        <CalendarX size={48} style={{ marginBottom: '1rem', color: '#64748b' }} />
        <h3>No events found</h3>
        <p style={{ marginTop: '0.5rem' }}>Try adjusting your search query or filter category.</p>
      </div>
    );
  }

  return (
    <div className="events-grid">
      {events.map((event) => (
        <EventCard
          key={event._id || event.id}
          event={event}
          onRegister={onRegister}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};
