const express = require('express');
const { body } = require('express-validator');
const {
  lodgeComplaint,
  listMyComplaints,
  listAllComplaints,
  updateStatus
} = require('../controllers/complaintController');
const { authenticate, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.post(
  '/',
  authenticate,
  [
    body('category').notEmpty().withMessage('Category required'),
    body('description').notEmpty().withMessage('Description required'),
    body('location').notEmpty().withMessage('Location required')
  ],
  lodgeComplaint
);

router.get('/mine', authenticate, listMyComplaints);
router.get('/', authenticate, authorize('admin'), listAllComplaints);
router.patch('/:id/status', authenticate, authorize('admin'), updateStatus);

module.exports = router;
