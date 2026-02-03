import React, { useEffect, useState } from 'react';
import MainLayout from '../layouts/MainLayout';
import SectionCard from '../components/SectionCard';
import DataTable from '../components/DataTable';
import api from '../services/api';
import { getUser } from '../utils/auth';

const CitizenDashboard = () => {
  const user = getUser();
  const [profile, setProfile] = useState(null);
  const [complaints, setComplaints] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [bills, setBills] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [complaintForm, setComplaintForm] = useState({
    category: '',
    description: '',
    location: ''
  });
  const [appointmentForm, setAppointmentForm] = useState({
    patient_name: user?.name || '',
    doctor_name: '',
    appointment_date: '',
    appointment_time: ''
  });

  const loadData = async () => {
    const [profileRes, complaintRes, appointmentRes, billRes, announcementRes] = await Promise.all([
      api.get('/auth/profile'),
      api.get('/complaints/mine'),
      api.get('/appointments/mine'),
      api.get('/bills/mine'),
      api.get('/announcements')
    ]);
    setProfile(profileRes.data.user);
    setComplaints(complaintRes.data.complaints);
    setAppointments(appointmentRes.data.appointments);
    setBills(billRes.data.bills);
    setAnnouncements(announcementRes.data.announcements);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleComplaintSubmit = async (event) => {
    event.preventDefault();
    await api.post('/complaints', complaintForm);
    setComplaintForm({ category: '', description: '', location: '' });
    loadData();
  };

  const handleAppointmentSubmit = async (event) => {
    event.preventDefault();
    await api.post('/appointments', appointmentForm);
    setAppointmentForm({
      patient_name: user?.name || '',
      doctor_name: '',
      appointment_date: '',
      appointment_time: ''
    });
    loadData();
  };

  return (
    <MainLayout>
      <div className="flex flex-col gap-6">
        <SectionCard title="Citizen Profile">
          <div className="grid gap-3 text-sm text-slate-600">
            <div className="flex justify-between">
              <span>Name</span>
              <span className="font-semibold text-slate-900">{profile?.name || 'Loading...'}</span>
            </div>
            <div className="flex justify-between">
              <span>Email</span>
              <span className="font-semibold text-slate-900">{profile?.email || 'Loading...'}</span>
            </div>
            <div className="flex justify-between">
              <span>Role</span>
              <span className="font-semibold text-slate-900">{profile?.role || 'citizen'}</span>
            </div>
          </div>
        </SectionCard>

        <div className="grid gap-6 lg:grid-cols-2">
          <SectionCard title="Lodge a Complaint">
            <form className="space-y-3" onSubmit={handleComplaintSubmit}>
              <input
                className="w-full rounded-lg border border-slate-200 px-3 py-2"
                placeholder="Category (Road, Water, Electricity, etc.)"
                value={complaintForm.category}
                onChange={(event) => setComplaintForm({ ...complaintForm, category: event.target.value })}
                required
              />
              <input
                className="w-full rounded-lg border border-slate-200 px-3 py-2"
                placeholder="Location"
                value={complaintForm.location}
                onChange={(event) => setComplaintForm({ ...complaintForm, location: event.target.value })}
                required
              />
              <textarea
                className="w-full rounded-lg border border-slate-200 px-3 py-2"
                placeholder="Description"
                rows="3"
                value={complaintForm.description}
                onChange={(event) => setComplaintForm({ ...complaintForm, description: event.target.value })}
                required
              />
              <button className="rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white">
                Submit Complaint
              </button>
            </form>
          </SectionCard>

          <SectionCard title="Book Hospital Appointment">
            <form className="space-y-3" onSubmit={handleAppointmentSubmit}>
              <input
                className="w-full rounded-lg border border-slate-200 px-3 py-2"
                placeholder="Patient Name"
                value={appointmentForm.patient_name}
                onChange={(event) =>
                  setAppointmentForm({ ...appointmentForm, patient_name: event.target.value })
                }
                required
              />
              <input
                className="w-full rounded-lg border border-slate-200 px-3 py-2"
                placeholder="Doctor Name"
                value={appointmentForm.doctor_name}
                onChange={(event) =>
                  setAppointmentForm({ ...appointmentForm, doctor_name: event.target.value })
                }
                required
              />
              <div className="grid gap-3 md:grid-cols-2">
                <input
                  type="date"
                  className="w-full rounded-lg border border-slate-200 px-3 py-2"
                  value={appointmentForm.appointment_date}
                  onChange={(event) =>
                    setAppointmentForm({ ...appointmentForm, appointment_date: event.target.value })
                  }
                  required
                />
                <input
                  type="time"
                  className="w-full rounded-lg border border-slate-200 px-3 py-2"
                  value={appointmentForm.appointment_time}
                  onChange={(event) =>
                    setAppointmentForm({ ...appointmentForm, appointment_time: event.target.value })
                  }
                  required
                />
              </div>
              <button className="rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white">
                Book Appointment
              </button>
            </form>
          </SectionCard>
        </div>

        <SectionCard title="Complaint Status">
          <DataTable
            columns={[
              { key: 'id', label: 'ID' },
              { key: 'category', label: 'Category' },
              { key: 'location', label: 'Location' },
              { key: 'status', label: 'Status' }
            ]}
            rows={complaints.map((complaint) => ({
              id: complaint.id,
              category: complaint.category,
              location: complaint.location,
              status: complaint.status
            }))}
          />
        </SectionCard>

        <div className="grid gap-6 lg:grid-cols-2">
          <SectionCard title="Appointments">
            <DataTable
              columns={[
                { key: 'doctor', label: 'Doctor' },
                { key: 'date', label: 'Date' },
                { key: 'time', label: 'Time' },
                { key: 'status', label: 'Status' }
              ]}
              rows={appointments.map((appointment) => ({
                doctor: appointment.doctor_name,
                date: appointment.appointment_date,
                time: appointment.appointment_time,
                status: appointment.status
              }))}
            />
          </SectionCard>

          <SectionCard title="Utility Bills">
            <DataTable
              columns={[
                { key: 'type', label: 'Type' },
                { key: 'amount', label: 'Amount' },
                { key: 'due', label: 'Due Date' },
                { key: 'status', label: 'Status' }
              ]}
              rows={bills.map((bill) => ({
                type: bill.bill_type,
                amount: `₹${bill.amount}`,
                due: bill.due_date,
                status: bill.payment_status
              }))}
            />
          </SectionCard>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <SectionCard title="Emergency Contacts">
            <ul className="space-y-2 text-sm text-slate-600">
              <li>Police Helpline: 100</li>
              <li>Ambulance: 102</li>
              <li>Fire & Rescue: 101</li>
              <li>City Control Room: 1800-123-456</li>
            </ul>
          </SectionCard>

          <SectionCard title="City Notices & Announcements">
            <div className="space-y-4 text-sm text-slate-600">
              {announcements.map((notice) => (
                <div key={notice.id} className="rounded-lg border border-slate-100 p-3">
                  <p className="font-semibold text-slate-900">{notice.title}</p>
                  <p className="mt-1 text-sm text-slate-600">{notice.body}</p>
                </div>
              ))}
              {!announcements.length && <p>No announcements yet.</p>}
            </div>
          </SectionCard>
        </div>
      </div>
    </MainLayout>
  );
};

export default CitizenDashboard;
