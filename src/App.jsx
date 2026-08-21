import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import PresidentAnnouncementBanner from './components/PresidentAnnouncementBanner';
import HeroSection from './components/HeroSection';
import HistorySection from './components/HistorySection';
import GallerySection from './components/GallerySection';
import EventsSection from './components/EventsSection';
import TransparencySection from './components/TransparencySection';
import DonateSection from './components/DonateSection';
import MapFeedbackSection from './components/MapFeedbackSection';
import DisclaimerSection from './components/DisclaimerSection';
import UserManualSection from './components/UserManualSection';
import Footer from './components/Footer';
import AdminLoginModal from './components/admin/AdminLoginModal';
import AdminDashboard from './components/admin/AdminDashboard';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';

export default function App() {
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [adminUser, setAdminUser] = useState(null);
  const [adminToken, setAdminToken] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  // Restore saved session if exists
  useEffect(() => {
    const savedUser = localStorage.getItem('math_admin_user');
    const savedToken = localStorage.getItem('math_admin_token');
    if (savedUser && savedToken) {
      try {
        setAdminUser(JSON.parse(savedUser));
        setAdminToken(savedToken);
      } catch {
        localStorage.removeItem('math_admin_user');
        localStorage.removeItem('math_admin_token');
      }
    }
  }, []);

  const handleLoginSuccess = (user, token) => {
    setAdminUser(user);
    setAdminToken(token);
    localStorage.setItem('math_admin_user', JSON.stringify(user));
    localStorage.setItem('math_admin_token', token);
  };

  const handleLogout = () => {
    setAdminUser(null);
    setAdminToken(null);
    localStorage.removeItem('math_admin_user');
    localStorage.removeItem('math_admin_token');
  };

  const handleRefreshData = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className="min-h-screen flex flex-col transition-colors duration-300">
          
          {/* Navigation Header */}
          <Navbar
            onOpenAdminLogin={() => setIsAdminModalOpen(true)}
            adminUser={adminUser}
            onLogout={handleLogout}
          />

          {/* Official President Live Announcement Marquee Banner */}
          <PresidentAnnouncementBanner key={`banner-${refreshKey}`} />

          {/* Admin Panel (Visible when Committee Admin is logged in) */}
          {adminUser && adminToken && (
            <AdminDashboard
              user={adminUser}
              token={adminToken}
              onRefreshData={handleRefreshData}
            />
          )}

          {/* Main Public Website Sections */}
          <main className="flex-grow space-y-4" key={refreshKey}>
            <HeroSection />
            <HistorySection />
            <GallerySection />
            <EventsSection />
            <TransparencySection />
            <DonateSection />
            <MapFeedbackSection />
            <UserManualSection onOpenAdminLogin={() => setIsAdminModalOpen(true)} />
            <DisclaimerSection />
          </main>

          {/* Footer */}
          <Footer />

          {/* Committee Login Modal */}
          <AdminLoginModal
            isOpen={isAdminModalOpen}
            onClose={() => setIsAdminModalOpen(false)}
            onLoginSuccess={handleLoginSuccess}
          />

        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
}
