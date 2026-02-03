import React from 'react';
import Navbar from '../components/Navbar';

const MainLayout = ({ children }) => (
  <div className="min-h-screen bg-slate-50">
    <Navbar />
    <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
  </div>
);

export default MainLayout;
