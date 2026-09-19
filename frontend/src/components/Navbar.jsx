import React, { useState } from 'react';
import { Calendar, PlusCircle, LogIn, UserPlus, LogOut, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Navbar = ({ activeTab, setActiveTab, openAuthModal, openCreateModal, openProfileModal }) => {
  const { user, logout } = useAuth();

  return (
    <header className="navbar">
      <div className="app-container nav-content">
        <div className="logo cursor-pointer" onClick={() => setActiveTab('home')}>
          <Calendar size={28} color="#6366f1" />
          <span>EventHub</span>
        </div>

        <nav className="nav-links">
          <button
            className={`nav-item ${activeTab === 'home' ? 'active' : ''}`}
            onClick={() => setActiveTab('home')}
            id="nav-home-btn"
          >
            Home
          </button>
          <button
            className={`nav-item ${activeTab === 'events' ? 'active' : ''}`}
            onClick={() => setActiveTab('events')}
            id="nav-events-btn"
          >
            Events
          </button>

          {user && (
            <button
              className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
              onClick={() => setActiveTab('dashboard')}
              id="nav-dashboard-btn"
            >
              Dashboard
            </button>
          )}

          {user ? (
            <>
              <button className="btn-primary" onClick={openCreateModal} id="create-event-btn">
                <PlusCircle size={18} />
                Create Event
              </button>

              <div className="user-profile-badge" onClick={openProfileModal} id="user-profile-badge">
                <div className="avatar-circle">
                  {user.fullname ? user.fullname.charAt(0).toUpperCase() : user.username.charAt(0).toUpperCase()}
                </div>
                <span className="text-sm font-semibold">{user.username}</span>
              </div>

              <button className="btn-secondary" onClick={logout} id="logout-btn" title="Logout">
                <LogOut size={16} />
              </button>
            </>
          ) : (
            <>
              <button className="btn-secondary" onClick={() => openAuthModal('login')} id="login-modal-btn">
                <LogIn size={16} />
                Login
              </button>
              <button className="btn-primary" onClick={() => openAuthModal('signup')} id="signup-modal-btn">
                <UserPlus size={16} />
                Sign Up
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};
