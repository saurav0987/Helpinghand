import React from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';

const NotFound = () => (
  <MainLayout>
    <div className="text-center">
      <h2 className="text-3xl font-bold text-slate-900">Page not found</h2>
      <p className="mt-2 text-slate-600">The page you are looking for does not exist.</p>
      <Link
        to="/"
        className="mt-6 inline-flex rounded-full bg-sky-600 px-6 py-2 text-sm font-semibold text-white"
      >
        Return Home
      </Link>
    </div>
  </MainLayout>
);

export default NotFound;
