const { getAllUsers } = require('../models/userModel');

const listUsers = async (req, res, next) => {
  try {
    const users = await getAllUsers();
    return res.json({ users });
  } catch (error) {
    return next(error);
  }
};

module.exports = { listUsers };
