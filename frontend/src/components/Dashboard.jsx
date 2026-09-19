import React, { useEffect } from 'react';
import { useEvents } from '../context/EventContext';
import { EventGrid } from './EventGrid';
import { Calendar, Users, DollarSign, Sparkles } from 'lucide-react';

export const Dashboard = ({ onRegister }) => {
  const { dashboardData, fetchDashboard, deleteEvent } = useEvents();

  useEffect(() => {
    fetchDashboard();
  }, []);

  const stats = dashboardData?.stats || {
    totalEvents: 0,
    totalAttendees: 0,
    revenue: "0.00",
    upcomingEvents: 0
  };

  return (
    <div className="fade-in" style={{ padding: '2rem 0' }}>
      <div className="section-header">
        <h2 className="section-title">Organizer Dashboard</h2>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <Calendar size={24} color="#818cf8" style={{ marginBottom: '0.5rem' }} />
          <div className="stat-number">{stats.totalEvents}</div>
          <div className="stat-label">Total Platform Events</div>
        </div>

        <div className="stat-card">
          <Users size={24} color="#ec4899" style={{ marginBottom: '0.5rem' }} />
          <div className="stat-number">{stats.totalAttendees.toLocaleString()}</div>
          <div className="stat-label">Total Attendees Registered</div>
        </div>

        <div className="stat-card">
          <DollarSign size={24} color="#10b981" style={{ marginBottom: '0.5rem' }} />
          <div className="stat-number">${stats.revenue}</div>
          <div className="stat-label">Total Ticket Sales</div>
        </div>

        <div className="stat-card">
          <Sparkles size={24} color="#f59e0b" style={{ marginBottom: '0.5rem' }} />
          <div className="stat-number">{stats.myOrganizedCount || 0}</div>
          <div className="stat-label">My Hosted Events</div>
        </div>
      </div>

      {dashboardData?.myEvents && dashboardData.myEvents.length > 0 && (
        <div style={{ marginTop: '3rem' }}>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '1.25rem', color: '#f8fafc' }}>
            Events Hosted by You
          </h3>
          <EventGrid
            events={dashboardData.myEvents}
            loading={false}
            onRegister={onRegister}
            onDelete={deleteEvent}
          />
        </div>
      )}

      {dashboardData?.registeredEvents && dashboardData.registeredEvents.length > 0 && (
        <div style={{ marginTop: '3rem' }}>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '1.25rem', color: '#f8fafc' }}>
            Events You Are Registered For
          </h3>
          <EventGrid
            events={dashboardData.registeredEvents}
            loading={false}
            onRegister={onRegister}
          />
        </div>
      )}
    </div>
  );
};
