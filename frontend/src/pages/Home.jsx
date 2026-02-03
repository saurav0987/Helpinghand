import React from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import SectionCard from '../components/SectionCard';

const Home = () => (
  <MainLayout>
    <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
      <div>
        <p className="text-sm font-semibold uppercase text-sky-600">Smart City Service Portal</p>
        <h1 className="mt-3 text-4xl font-bold text-slate-900 lg:text-5xl">
          One unified hub for city services, complaints, appointments, and utilities.
        </h1>
        <p className="mt-4 text-lg text-slate-600">
          Stay informed, take action, and access essential services in seconds with secure citizen and
          admin dashboards.
        </p>
        <div className="mt-6 flex flex-wrap gap-4">
          <Link
            to="/register"
            className="rounded-full bg-sky-600 px-6 py-3 text-sm font-semibold text-white"
          >
            Get Started
          </Link>
          <Link
            to="/login"
            className="rounded-full border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700"
          >
            Login
          </Link>
        </div>
      </div>
      <SectionCard title="City Status Snapshot">
        <div className="space-y-4 text-sm text-slate-600">
          <div className="flex items-center justify-between">
            <span>Resolved complaints this month</span>
            <span className="font-semibold text-slate-900">87%</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Appointments booked today</span>
            <span className="font-semibold text-slate-900">124</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Upcoming utility due dates</span>
            <span className="font-semibold text-slate-900">36</span>
          </div>
        </div>
      </SectionCard>
    </section>

    <section className="mt-12 grid gap-6 md:grid-cols-3">
      {[
        {
          title: 'Report Issues Faster',
          text: 'Log road, water, electricity, or garbage complaints with real-time tracking.'
        },
        {
          title: 'Book Healthcare',
          text: 'Schedule hospital appointments with preferred doctors and manage follow-ups.'
        },
        {
          title: 'Stay Informed',
          text: 'Receive notices, emergency contacts, and city announcements in one place.'
        }
      ].map((card) => (
        <SectionCard key={card.title} title={card.title}>
          <p className="text-sm text-slate-600">{card.text}</p>
        </SectionCard>
      ))}
    </section>
  </MainLayout>
);

export default Home;
