import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { AdminDashboard } from './components/AdminDashboard';
import { PublicPortal } from './components/PublicPortal';

const AppContent: React.FC = () => {
  const { userRole } = useApp();

  return (
    <>
      {userRole === 'admin' ? (
        <AdminDashboard />
      ) : (
        <PublicPortal />
      )}
    </>
  );
};

export default function App() {
  return (
    <AppProvider>
      {/* Import high fidelity Arabic typography stylesheets globally */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;700;900&family=Tajawal:wght@400;700&display=swap" rel="stylesheet" />
      
      <AppContent />
    </AppProvider>
  );
}
