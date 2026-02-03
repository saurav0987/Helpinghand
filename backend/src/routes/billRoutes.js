const express = require('express');
const { body } = require('express-validator');
const { listMyBills, listAllBills, addBill, updateBillById } = require('../controllers/billController');
const { authenticate, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/mine', authenticate, listMyBills);
router.get('/', authenticate, authorize('admin'), listAllBills);
router.post(
  '/',
  authenticate,
  authorize('admin'),
  [
    body('user_id').isInt().withMessage('User required'),
    body('bill_type').notEmpty().withMessage('Bill type required'),
    body('amount').isFloat({ min: 0 }).withMessage('Amount required'),
    body('due_date').isISO8601().withMessage('Valid due date required')
  ],
  addBill
);
router.put('/:id', authenticate, authorize('admin'), updateBillById);

module.exports = router;
