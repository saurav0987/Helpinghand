import React from 'react';
import { Link } from 'react-router-dom';
import { getUser, clearAuth } from '../utils/auth';

const Navbar = () => {
  const user = getUser();

  const handleLogout = () => {
    clearAuth();
    window.location.href = '/';
  };

  return (
    <nav className="bg-white shadow">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link to="/" className="text-xl font-bold text-sky-600">
          Smart City Portal
        </Link>
        <div className="flex items-center gap-4 text-sm">
          {!user ? (
            <>
              <Link to="/login" className="font-medium text-slate-600 hover:text-slate-900">
                Login
              </Link>
              <Link
                to="/register"
                className="rounded-full bg-sky-600 px-4 py-2 font-semibold text-white"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <>
              <span className="text-slate-600">Hi, {user.name}</span>
              <button
                onClick={handleLogout}
                className="rounded-full border border-slate-200 px-4 py-2 font-medium text-slate-700"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
