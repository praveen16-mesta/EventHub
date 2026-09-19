import React from 'react';
import { Search, Music, Briefcase, Trophy, Utensils, Cpu, Sparkles, Grid } from 'lucide-react';
import { useEvents } from '../context/EventContext';

export const HeroSection = () => {
  const { category, setCategory, searchQuery, setSearchQuery, handleSearch } = useEvents();

  const categories = [
    { id: 'all', label: 'All Events', icon: Grid },
    { id: 'music', label: 'Music', icon: Music },
    { id: 'business', label: 'Business', icon: Briefcase },
    { id: 'sports', label: 'Sports', icon: Trophy },
    { id: 'food', label: 'Food & Drink', icon: Utensils },
    { id: 'tech', label: 'Technology', icon: Cpu }
  ];

  return (
    <section className="hero fade-in">
      <h1 className="hero-title">
        Discover & Host <span>Amazing Events</span>
      </h1>
      <p className="hero-subtitle">
        Join thousands of attendees at the most exciting concerts, conferences, and summits in your area.
      </p>

      <form onSubmit={handleSearch} className="search-wrapper">
        <Search className="search-icon" size={20} />
        <input
          type="text"
          className="search-input"
          placeholder="Search events, locations, or categories..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          id="event-search-input"
        />
      </form>

      <div className="filters-container">
        {categories.map((cat) => {
          const Icon = cat.icon;
          return (
            <button
              key={cat.id}
              className={`filter-btn ${category === cat.id ? 'active' : ''}`}
              onClick={() => setCategory(cat.id)}
              id={`filter-${cat.id}`}
            >
              <Icon size={14} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
              {cat.label}
            </button>
          );
        })}
      </div>
    </section>
  );
};
