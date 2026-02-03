const pool = require('../config/db');

const createComplaint = async (complaint) => {
  const [result] = await pool.execute(
    `INSERT INTO complaints (user_id, category, description, location, status)
     VALUES (?, ?, ?, ?, ?)` ,
    [
      complaint.user_id,
      complaint.category,
      complaint.description,
      complaint.location,
      complaint.status || 'Pending'
    ]
  );
  return { id: result.insertId, ...complaint };
};

const getComplaintsByUser = async (userId) => {
  const [rows] = await pool.execute(
    'SELECT * FROM complaints WHERE user_id = ? ORDER BY created_at DESC',
    [userId]
  );
  return rows;
};

const getAllComplaints = async () => {
  const [rows] = await pool.execute('SELECT * FROM complaints ORDER BY created_at DESC');
  return rows;
};

const updateComplaintStatus = async (id, status) => {
  const [result] = await pool.execute(
    'UPDATE complaints SET status = ? WHERE id = ?',
    [status, id]
  );
  return result.affectedRows > 0;
};

module.exports = {
  createComplaint,
  getComplaintsByUser,
  getAllComplaints,
  updateComplaintStatus
};
