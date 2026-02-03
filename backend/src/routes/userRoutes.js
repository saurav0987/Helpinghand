const express = require('express');
const { listUsers } = require('../controllers/userController');
const { authenticate, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', authenticate, authorize('admin'), listUsers);

module.exports = router;
