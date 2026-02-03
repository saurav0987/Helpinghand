import React, { useEffect, useMemo, useState } from 'react';
import MainLayout from '../layouts/MainLayout';
import SectionCard from '../components/SectionCard';
import StatCard from '../components/StatCard';
import DataTable from '../components/DataTable';
import api from '../services/api';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [complaints, setComplaints] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [bills, setBills] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [billForm, setBillForm] = useState({
    user_id: '',
    bill_type: '',
    amount: '',
    due_date: '',
    payment_status: 'Unpaid'
  });
  const [announcementForm, setAnnouncementForm] = useState({ title: '', body: '' });

  const loadData = async () => {
    const [usersRes, complaintsRes, appointmentsRes, billsRes, announcementsRes] = await Promise.all([
      api.get('/users'),
      api.get('/complaints'),
      api.get('/appointments'),
      api.get('/bills'),
      api.get('/announcements')
    ]);
    setUsers(usersRes.data.users);
    setComplaints(complaintsRes.data.complaints);
    setAppointments(appointmentsRes.data.appointments);
    setBills(billsRes.data.bills);
    setAnnouncements(announcementsRes.data.announcements);
  };

  useEffect(() => {
    loadData();
  }, []);

  const analytics = useMemo(() => {
    const resolved = complaints.filter((c) => c.status === 'Resolved').length;
    const pending = complaints.filter((c) => c.status !== 'Resolved').length;
    return {
      totalComplaints: complaints.length,
      resolvedComplaints: resolved,
      activeUsers: users.length,
      pendingComplaints: pending
    };
  }, [complaints, users]);

  const statusChart = {
    labels: ['Pending', 'In Progress', 'Resolved'],
    datasets: [
      {
        label: 'Complaints',
        data: [
          complaints.filter((c) => c.status === 'Pending').length,
          complaints.filter((c) => c.status === 'In Progress').length,
          complaints.filter((c) => c.status === 'Resolved').length
        ],
        backgroundColor: ['#fbbf24', '#60a5fa', '#34d399']
      }
    ]
  };

  const handleComplaintStatus = async (id, status) => {
    await api.patch(`/complaints/${id}/status`, { status });
    loadData();
  };

  const handleAppointmentStatus = async (id, status) => {
    await api.patch(`/appointments/${id}/status`, { status });
    loadData();
  };

  const handleBillSubmit = async (event) => {
    event.preventDefault();
    await api.post('/bills', billForm);
    setBillForm({ user_id: '', bill_type: '', amount: '', due_date: '', payment_status: 'Unpaid' });
    loadData();
  };

  const handleAnnouncementSubmit = async (event) => {
    event.preventDefault();
    await api.post('/announcements', announcementForm);
    setAnnouncementForm({ title: '', body: '' });
    loadData();
  };

  return (
    <MainLayout>
      <div className="flex flex-col gap-6">
        <div className="grid gap-4 md:grid-cols-4">
          <StatCard title="Total Complaints" value={analytics.totalComplaints} />
          <StatCard title="Resolved Cases" value={analytics.resolvedComplaints} />
          <StatCard title="Pending Cases" value={analytics.pendingComplaints} />
          <StatCard title="Active Users" value={analytics.activeUsers} />
        </div>

        <SectionCard title="Complaint Resolution Overview">
          <Bar data={statusChart} options={{ responsive: true, plugins: { legend: { position: 'bottom' } } }} />
        </SectionCard>

        <SectionCard title="Registered Users">
          <DataTable
            columns={[
              { key: 'id', label: 'ID' },
              { key: 'name', label: 'Name' },
              { key: 'email', label: 'Email' },
              { key: 'role', label: 'Role' }
            ]}
            rows={users}
          />
        </SectionCard>

        <SectionCard title="Manage Complaints">
          <DataTable
            columns={[
              { key: 'id', label: 'ID' },
              { key: 'category', label: 'Category' },
              { key: 'location', label: 'Location' },
              { key: 'status', label: 'Status' },
              { key: 'action', label: 'Action' }
            ]}
            rows={complaints.map((complaint) => ({
              ...complaint,
              action: (
                <select
                  className="rounded border border-slate-200 px-2 py-1 text-xs"
                  value={complaint.status}
                  onChange={(event) => handleComplaintStatus(complaint.id, event.target.value)}
                >
                  <option>Pending</option>
                  <option>In Progress</option>
                  <option>Resolved</option>
                </select>
              )
            }))}
          />
        </SectionCard>

        <SectionCard title="Manage Appointments">
          <DataTable
            columns={[
              { key: 'id', label: 'ID' },
              { key: 'patient_name', label: 'Patient' },
              { key: 'doctor_name', label: 'Doctor' },
              { key: 'appointment_date', label: 'Date' },
              { key: 'status', label: 'Status' },
              { key: 'action', label: 'Action' }
            ]}
            rows={appointments.map((appointment) => ({
              ...appointment,
              action: (
                <select
                  className="rounded border border-slate-200 px-2 py-1 text-xs"
                  value={appointment.status}
                  onChange={(event) => handleAppointmentStatus(appointment.id, event.target.value)}
                >
                  <option>Scheduled</option>
                  <option>Completed</option>
                  <option>Cancelled</option>
                </select>
              )
            }))}
          />
        </SectionCard>

        <div className="grid gap-6 lg:grid-cols-2">
          <SectionCard title="Add Utility Bill">
            <form className="space-y-3" onSubmit={handleBillSubmit}>
              <input
                className="w-full rounded-lg border border-slate-200 px-3 py-2"
                placeholder="User ID"
                value={billForm.user_id}
                onChange={(event) => setBillForm({ ...billForm, user_id: event.target.value })}
                required
              />
              <input
                className="w-full rounded-lg border border-slate-200 px-3 py-2"
                placeholder="Bill Type"
                value={billForm.bill_type}
                onChange={(event) => setBillForm({ ...billForm, bill_type: event.target.value })}
                required
              />
              <input
                className="w-full rounded-lg border border-slate-200 px-3 py-2"
                placeholder="Amount"
                value={billForm.amount}
                onChange={(event) => setBillForm({ ...billForm, amount: event.target.value })}
                required
              />
              <input
                type="date"
                className="w-full rounded-lg border border-slate-200 px-3 py-2"
                value={billForm.due_date}
                onChange={(event) => setBillForm({ ...billForm, due_date: event.target.value })}
                required
              />
              <select
                className="w-full rounded-lg border border-slate-200 px-3 py-2"
                value={billForm.payment_status}
                onChange={(event) => setBillForm({ ...billForm, payment_status: event.target.value })}
              >
                <option>Unpaid</option>
                <option>Paid</option>
              </select>
              <button className="rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white">
                Add Bill
              </button>
            </form>
          </SectionCard>

          <SectionCard title="Post City Announcement">
            <form className="space-y-3" onSubmit={handleAnnouncementSubmit}>
              <input
                className="w-full rounded-lg border border-slate-200 px-3 py-2"
                placeholder="Title"
                value={announcementForm.title}
                onChange={(event) =>
                  setAnnouncementForm({ ...announcementForm, title: event.target.value })
                }
                required
              />
              <textarea
                className="w-full rounded-lg border border-slate-200 px-3 py-2"
                placeholder="Announcement details"
                rows="4"
                value={announcementForm.body}
                onChange={(event) => setAnnouncementForm({ ...announcementForm, body: event.target.value })}
                required
              />
              <button className="rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white">
                Publish
              </button>
            </form>
          </SectionCard>
        </div>

        <SectionCard title="Utility Bills">
          <DataTable
            columns={[
              { key: 'id', label: 'Bill ID' },
              { key: 'user_id', label: 'User ID' },
              { key: 'bill_type', label: 'Type' },
              { key: 'amount', label: 'Amount' },
              { key: 'due_date', label: 'Due Date' },
              { key: 'payment_status', label: 'Status' }
            ]}
            rows={bills}
          />
        </SectionCard>

        <SectionCard title="City Announcements">
          <div className="space-y-3">
            {announcements.map((announcement) => (
              <div key={announcement.id} className="rounded-lg border border-slate-100 p-4">
                <p className="font-semibold text-slate-900">{announcement.title}</p>
                <p className="mt-2 text-sm text-slate-600">{announcement.body}</p>
              </div>
            ))}
            {!announcements.length && <p className="text-sm text-slate-500">No announcements yet.</p>}
          </div>
        </SectionCard>
      </div>
    </MainLayout>
  );
};

export default AdminDashboard;
