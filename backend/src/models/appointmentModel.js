const pool = require('../config/db');

const createAppointment = async (appointment) => {
  const [result] = await pool.execute(
    `INSERT INTO appointments (user_id, patient_name, doctor_name, appointment_date, appointment_time, status)
     VALUES (?, ?, ?, ?, ?, ?)` ,
    [
      appointment.user_id,
      appointment.patient_name,
      appointment.doctor_name,
      appointment.appointment_date,
      appointment.appointment_time,
      appointment.status || 'Scheduled'
    ]
  );
  return { id: result.insertId, ...appointment };
};

const getAppointmentsByUser = async (userId) => {
  const [rows] = await pool.execute(
    'SELECT * FROM appointments WHERE user_id = ? ORDER BY appointment_date DESC',
    [userId]
  );
  return rows;
};

const getAllAppointments = async () => {
  const [rows] = await pool.execute('SELECT * FROM appointments ORDER BY appointment_date DESC');
  return rows;
};

const updateAppointmentStatus = async (id, status) => {
  const [result] = await pool.execute(
    'UPDATE appointments SET status = ? WHERE id = ?',
    [status, id]
  );
  return result.affectedRows > 0;
};

module.exports = {
  createAppointment,
  getAppointmentsByUser,
  getAllAppointments,
  updateAppointmentStatus
};
