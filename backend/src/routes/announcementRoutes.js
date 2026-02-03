const express = require('express');
const { body } = require('express-validator');
const { listAnnouncements, createNewAnnouncement } = require('../controllers/announcementController');
const { authenticate, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', authenticate, listAnnouncements);
router.post(
  '/',
  authenticate,
  authorize('admin'),
  [
    body('title').notEmpty().withMessage('Title required'),
    body('body').notEmpty().withMessage('Body required')
  ],
  createNewAnnouncement
);

module.exports = router;
