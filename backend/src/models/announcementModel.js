const pool = require('../config/db');

const createAnnouncement = async (announcement) => {
  const [result] = await pool.execute(
    'INSERT INTO announcements (title, body) VALUES (?, ?)',
    [announcement.title, announcement.body]
  );
  return { id: result.insertId, ...announcement };
};

const getAllAnnouncements = async () => {
  const [rows] = await pool.execute('SELECT * FROM announcements ORDER BY created_at DESC');
  return rows;
};

module.exports = { createAnnouncement, getAllAnnouncements };
