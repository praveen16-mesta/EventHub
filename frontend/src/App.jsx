import React, { useState } from 'react';
import { useAuth } from './context/AuthContext';
import { useEvents } from './context/EventContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { EventGrid } from './components/EventGrid';
import { Dashboard } from './components/Dashboard';
import { AuthModal } from './components/AuthModal';
import { CreateEventModal } from './components/CreateEventModal';
import { RegisterModal } from './components/RegisterModal';
import { ProfileModal } from './components/ProfileModal';
import { Bell } from 'lucide-react';

export const App = () => {
  const { user, toastMessage } = useAuth();
  const { events, loading } = useEvents();

  const [activeTab, setActiveTab] = useState('home');
  const [authModal, setAuthModal] = useState({ isOpen: false, mode: 'login' });
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [registerModal, setRegisterModal] = useState({ isOpen: false, event: null });
  const [profileModalOpen, setProfileModalOpen] = useState(false);

  const handleRegisterClick = (event) => {
    if (!user) {
      setAuthModal({ isOpen: true, mode: 'login' });
    } else {
      setRegisterModal({ isOpen: true, event });
    }
  };

  return (
    <div className="app">
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        openAuthModal={(mode) => setAuthModal({ isOpen: true, mode })}
        openCreateModal={() => setCreateModalOpen(true)}
        openProfileModal={() => setProfileModalOpen(true)}
      />

      <main className="app-container">
        {activeTab === 'home' && (
          <>
            <HeroSection />
            <div className="section-header">
              <h2 className="section-title">Featured Events</h2>
            </div>
            <EventGrid events={events} loading={loading} onRegister={handleRegisterClick} />
          </>
        )}

        {activeTab === 'events' && (
          <>
            <div className="section-header" style={{ marginTop: '2rem' }}>
              <h2 className="section-title">Browse All Events</h2>
            </div>
            <EventGrid events={events} loading={loading} onRegister={handleRegisterClick} />
          </>
        )}

        {activeTab === 'dashboard' && user && (
          <Dashboard onRegister={handleRegisterClick} />
        )}
      </main>

      {/* Modals */}
      <AuthModal
        isOpen={authModal.isOpen}
        onClose={() => setAuthModal({ isOpen: false, mode: 'login' })}
        initialMode={authModal.mode}
      />

      <CreateEventModal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
      />

      <RegisterModal
        isOpen={registerModal.isOpen}
        onClose={() => setRegisterModal({ isOpen: false, event: null })}
        event={registerModal.event}
      />

      <ProfileModal
        isOpen={profileModalOpen}
        onClose={() => setProfileModalOpen(false)}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="toast">
          <Bell size={18} color="#818cf8" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};

export default App;
