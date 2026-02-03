const express = require('express');
const { body } = require('express-validator');
const {
  bookAppointment,
  listMyAppointments,
  listAllAppointments,
  updateStatus
} = require('../controllers/appointmentController');
const { authenticate, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.post(
  '/',
  authenticate,
  [
    body('patient_name').notEmpty().withMessage('Patient name required'),
    body('doctor_name').notEmpty().withMessage('Doctor name required'),
    body('appointment_date').isISO8601().withMessage('Valid date required'),
    body('appointment_time').notEmpty().withMessage('Time required')
  ],
  bookAppointment
);

router.get('/mine', authenticate, listMyAppointments);
router.get('/', authenticate, authorize('admin'), listAllAppointments);
router.patch('/:id/status', authenticate, authorize('admin'), updateStatus);

module.exports = router;
