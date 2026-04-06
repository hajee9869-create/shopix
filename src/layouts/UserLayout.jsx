import React from 'react';
import { Outlet } from 'react-router-dom';
import UserNavbar from '../components/UserNavbar';

// An optional footer component structure
const UserFooter = () => (
  <footer className="glass" style={{ padding: '3rem 2rem', marginTop: '4rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
    <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '2rem' }}>
      <div style={{ textAlign: 'left', flex: '1 1 250px' }}>
        <h3 style={{ color: 'var(--text-primary)', fontWeight: 'bold', marginBottom: '1rem' }}>SHOPIX</h3>
        <p>The ultimate destination for premium products from top sellers worldwide.</p>
      </div>
      <div style={{ textAlign: 'left', flex: '1 1 250px' }}>
        <h3 style={{ color: 'var(--text-primary)', fontWeight: 'bold', marginBottom: '1rem' }}>Support</h3>
        <p>Help Center</p>
        <p>Returns & Refunds</p>
        <p>Shipping Info</p>
      </div>
    </div>
    <div style={{ borderTop: '1px solid var(--border-color)', marginTop: '2rem', paddingTop: '2rem' }}>
      © {new Date().getFullYear()} SHOPIX. All rights reserved.
    </div>
  </footer>
);

const UserLayout = () => {
  return (
    <div className="user-layout">
      <UserNavbar />
      <main className="user-main-content" style={{ minHeight: 'calc(100vh - 80px)' }}>
        <Outlet />
      </main>
      <UserFooter />
    </div>
  );
};

export default UserLayout;
