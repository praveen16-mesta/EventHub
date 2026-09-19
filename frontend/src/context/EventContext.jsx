import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const { token, showToast } = useAuth();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [dashboardData, setDashboardData] = useState(null);

  const fetchEvents = async (selectedCategory = category, query = searchQuery) => {
    setLoading(true);
    try {
      let url = `/api/events?category=${selectedCategory}`;
      if (query.trim()) {
        url += `&search=${encodeURIComponent(query.trim())}`;
      }
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        setEvents(data);
      }
    } catch (err) {
      console.error('Failed to fetch events:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents(category, searchQuery);
  }, [category]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchEvents(category, searchQuery);
  };

  const createEvent = async (eventData) => {
    if (!token) {
      showToast('Please login to create an event');
      return false;
    }

    try {
      const res = await fetch('/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(eventData)
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Failed to create event');
      }

      showToast(`Event "${data.title}" created successfully!`);
      fetchEvents();
      fetchDashboard();
      return true;
    } catch (err) {
      showToast(err.message);
      return false;
    }
  };

  const registerForEvent = async (eventId, attendeeName, attendeeEmail) => {
    if (!token) {
      showToast('Please login to register for events');
      return false;
    }

    try {
      const res = await fetch(`/api/events/${eventId}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ attendeeName, attendeeEmail })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      showToast(`Successfully registered for ${data.event.title}!`);
      fetchEvents();
      fetchDashboard();
      return true;
    } catch (err) {
      showToast(err.message);
      return false;
    }
  };

  const fetchDashboard = async () => {
    if (!token) return;
    try {
      const res = await fetch('/api/events/dashboard/stats', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (res.ok) {
        const data = await res.json();
        setDashboardData(data);
      }
    } catch (err) {
      console.error('Error fetching dashboard stats:', err);
    }
  };

  const deleteEvent = async (eventId) => {
    if (!token) return;
    try {
      const res = await fetch(`/api/events/${eventId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (res.ok) {
        showToast('Event deleted successfully');
        fetchEvents();
        fetchDashboard();
      } else {
        const data = await res.json();
        showToast(data.message || 'Failed to delete event');
      }
    } catch (err) {
      showToast('Error deleting event');
    }
  };

  return (
    <EventContext.Provider value={{
      events,
      loading,
      category,
      setCategory,
      searchQuery,
      setSearchQuery,
      handleSearch,
      fetchEvents,
      createEvent,
      registerForEvent,
      dashboardData,
      fetchDashboard,
      deleteEvent
    }}>
      {children}
    </EventContext.Provider>
  );
};

export const useEvents = () => useContext(EventContext);
