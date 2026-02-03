const { validationResult } = require('express-validator');
const { createBill, getBillsByUser, getAllBills, updateBill } = require('../models/billModel');

const listMyBills = async (req, res, next) => {
  try {
    const bills = await getBillsByUser(req.user.id);
    return res.json({ bills });
  } catch (error) {
    return next(error);
  }
};

const listAllBills = async (req, res, next) => {
  try {
    const bills = await getAllBills();
    return res.json({ bills });
  } catch (error) {
    return next(error);
  }
};

const addBill = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const bill = await createBill({
      user_id: req.body.user_id,
      bill_type: req.body.bill_type,
      amount: req.body.amount,
      due_date: req.body.due_date,
      payment_status: req.body.payment_status
    });

    return res.status(201).json({ bill });
  } catch (error) {
    return next(error);
  }
};

const updateBillById = async (req, res, next) => {
  try {
    const updated = await updateBill(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ message: 'Bill not found' });
    }
    return res.json({ message: 'Bill updated' });
  } catch (error) {
    return next(error);
  }
};

module.exports = { listMyBills, listAllBills, addBill, updateBillById };
