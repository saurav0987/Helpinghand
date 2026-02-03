const { validationResult } = require('express-validator');
const {
  createComplaint,
  getComplaintsByUser,
  getAllComplaints,
  updateComplaintStatus
} = require('../models/complaintModel');

const lodgeComplaint = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const complaint = await createComplaint({
      user_id: req.user.id,
      category: req.body.category,
      description: req.body.description,
      location: req.body.location,
      status: 'Pending'
    });

    return res.status(201).json({ complaint });
  } catch (error) {
    return next(error);
  }
};

const listMyComplaints = async (req, res, next) => {
  try {
    const complaints = await getComplaintsByUser(req.user.id);
    return res.json({ complaints });
  } catch (error) {
    return next(error);
  }
};

const listAllComplaints = async (req, res, next) => {
  try {
    const complaints = await getAllComplaints();
    return res.json({ complaints });
  } catch (error) {
    return next(error);
  }
};

const updateStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const updated = await updateComplaintStatus(req.params.id, status);
    if (!updated) {
      return res.status(404).json({ message: 'Complaint not found' });
    }
    return res.json({ message: 'Status updated' });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  lodgeComplaint,
  listMyComplaints,
  listAllComplaints,
  updateStatus
};
