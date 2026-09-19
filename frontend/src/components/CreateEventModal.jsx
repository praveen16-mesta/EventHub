import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useEvents } from '../context/EventContext';

export const CreateEventModal = ({ isOpen, onClose }) => {
  const { createEvent } = useEvents();

  const [formData, setFormData] = useState({
    title: '',
    date: '',
    location: '',
    category: 'music',
    price: '',
    capacity: '100',
    description: ''
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await createEvent(formData);
    if (success) {
      setFormData({
        title: '',
        date: '',
        location: '',
        category: 'music',
        price: '',
        capacity: '100',
        description: ''
      });
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <X size={18} />
        </button>

        <h2 className="modal-title">Create New Event</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Event Title</label>
            <input
              type="text"
              name="title"
              className="form-input"
              placeholder="e.g. Annual Tech Leadership Summit"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Event Date</label>
              <input
                type="text"
                name="date"
                className="form-input"
                placeholder="e.g. Sep 25, 2026"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Category</label>
              <select
                name="category"
                className="form-select"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="music">Music</option>
                <option value="business">Business</option>
                <option value="sports">Sports</option>
                <option value="food">Food & Drink</option>
                <option value="tech">Technology</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Location</label>
            <input
              type="text"
              name="location"
              className="form-input"
              placeholder="e.g. Grand Convention Center, NY"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Ticket Price ($)</label>
              <input
                type="number"
                name="price"
                className="form-input"
                placeholder="0.00"
                min="0"
                step="0.01"
                value={formData.price}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Max Capacity</label>
              <input
                type="number"
                name="capacity"
                className="form-input"
                placeholder="100"
                min="1"
                value={formData.capacity}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Event Description</label>
            <textarea
              name="description"
              className="form-textarea"
              rows="3"
              placeholder="Describe what attendees should expect..."
              value={formData.description}
              onChange={handleChange}
            ></textarea>
          </div>

          <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '1rem', justifyContent: 'center' }}>
            Publish Event
          </button>
        </form>
      </div>
    </div>
  );
};
