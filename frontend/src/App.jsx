import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import WhyChooseUs from './components/WhyChooseUs';
import StudentFormSection from './components/StudentFormSection';
import TopDestinations from './components/TopDestinations';
import SuccessStories from './components/SuccessStories';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import AdminLoginModal from './components/AdminLoginModal';
import AdminDashboard from './components/AdminDashboard';
import { getAdminUser } from './services/api';
import { ShieldCheck, Eye, LogOut } from 'lucide-react';
import './App.css';

function App() {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminUser, setAdminUser] = useState(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [currentView, setCurrentView] = useState('landing'); // 'landing' | 'admin'

  useEffect(() => {
    const user = getAdminUser();
    const token = localStorage.getItem('destnation_admin_token');
    if (token && user) {
      setIsAdminLoggedIn(true);
      setAdminUser(user);
    }
  }, []);

  const handleLoginSuccess = (user) => {
    setIsAdminLoggedIn(true);
    setAdminUser(user);
    setCurrentView('admin');
  };

  const handleLogout = () => {
    setIsAdminLoggedIn(false);
    setAdminUser(null);
    setCurrentView('landing');
  };

  return (
    <div className="app-main">
      {/* Admin Quick Switch Navigation Banner if Admin is logged in */}
      {isAdminLoggedIn && (
        <div
          style={{
            background: '#0f172a',
            color: 'white',
            padding: '0.6rem 0',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            fontSize: '0.85rem',
          }}
        >
          <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <ShieldCheck size={16} color="#0d9488" />
              <span>Admin Mode Active (<strong>{adminUser?.username || 'admin'}</strong>)</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <button
                onClick={() => setCurrentView(currentView === 'admin' ? 'landing' : 'admin')}
                style={{
                  background: 'rgba(255, 255, 255, 0.15)',
                  color: 'white',
                  border: 'none',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '20px',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                }}
              >
                <Eye size={14} />
                <span>{currentView === 'admin' ? 'View Public Landing Page' : 'Go to Admin Dashboard'}</span>
              </button>

              <button
                onClick={handleLogout}
                style={{
                  background: 'none',
                  color: '#f87171',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                }}
              >
                <LogOut size={14} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {currentView === 'admin' && isAdminLoggedIn ? (
        <AdminDashboard adminUser={adminUser} onLogout={handleLogout} />
      ) : (
        <>
          <Navbar
            onOpenAdmin={() => setIsLoginModalOpen(true)}
            isAdminLoggedIn={isAdminLoggedIn}
            onOpenAdminDashboard={() => setCurrentView('admin')}
          />
          <HeroSection />
          <WhyChooseUs />
          <StudentFormSection />
          <TopDestinations />
          <SuccessStories />
          <ContactSection />
          <Footer />
        </>
      )}

      {/* Admin Login Popup Modal */}
      <AdminLoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
}

export default App;
