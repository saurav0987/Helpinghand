const pool = require('../config/db');

const createUser = async (user) => {
  const [result] = await pool.execute(
    'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
    [user.name, user.email, user.password, user.role]
  );
  return { id: result.insertId, ...user };
};

const findUserByEmail = async (email) => {
  const [rows] = await pool.execute('SELECT * FROM users WHERE email = ?', [email]);
  return rows[0];
};

const findUserById = async (id) => {
  const [rows] = await pool.execute('SELECT id, name, email, role FROM users WHERE id = ?', [id]);
  return rows[0];
};

const getAllUsers = async () => {
  const [rows] = await pool.execute('SELECT id, name, email, role FROM users ORDER BY id DESC');
  return rows;
};

module.exports = {
  createUser,
  findUserByEmail,
  findUserById,
  getAllUsers
};
