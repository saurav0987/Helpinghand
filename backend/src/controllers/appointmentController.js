const { validationResult } = require('express-validator');
const {
  createAppointment,
  getAppointmentsByUser,
  getAllAppointments,
  updateAppointmentStatus
} = require('../models/appointmentModel');

const bookAppointment = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const appointment = await createAppointment({
      user_id: req.user.id,
      patient_name: req.body.patient_name,
      doctor_name: req.body.doctor_name,
      appointment_date: req.body.appointment_date,
      appointment_time: req.body.appointment_time,
      status: 'Scheduled'
    });

    return res.status(201).json({ appointment });
  } catch (error) {
    return next(error);
  }
};

const listMyAppointments = async (req, res, next) => {
  try {
    const appointments = await getAppointmentsByUser(req.user.id);
    return res.json({ appointments });
  } catch (error) {
    return next(error);
  }
};

const listAllAppointments = async (req, res, next) => {
  try {
    const appointments = await getAllAppointments();
    return res.json({ appointments });
  } catch (error) {
    return next(error);
  }
};

const updateStatus = async (req, res, next) => {
  try {
    const updated = await updateAppointmentStatus(req.params.id, req.body.status);
    if (!updated) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    return res.json({ message: 'Status updated' });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  bookAppointment,
  listMyAppointments,
  listAllAppointments,
  updateStatus
};
