const pool = require('../config/db');

const createBill = async (bill) => {
  const [result] = await pool.execute(
    `INSERT INTO bills (user_id, bill_type, amount, due_date, payment_status)
     VALUES (?, ?, ?, ?, ?)` ,
    [bill.user_id, bill.bill_type, bill.amount, bill.due_date, bill.payment_status || 'Unpaid']
  );
  return { id: result.insertId, ...bill };
};

const getBillsByUser = async (userId) => {
  const [rows] = await pool.execute(
    'SELECT * FROM bills WHERE user_id = ? ORDER BY due_date DESC',
    [userId]
  );
  return rows;
};

const getAllBills = async () => {
  const [rows] = await pool.execute('SELECT * FROM bills ORDER BY due_date DESC');
  return rows;
};

const updateBill = async (id, data) => {
  const [result] = await pool.execute(
    'UPDATE bills SET bill_type = ?, amount = ?, due_date = ?, payment_status = ? WHERE id = ?',
    [data.bill_type, data.amount, data.due_date, data.payment_status, id]
  );
  return result.affectedRows > 0;
};

module.exports = {
  createBill,
  getBillsByUser,
  getAllBills,
  updateBill
};
