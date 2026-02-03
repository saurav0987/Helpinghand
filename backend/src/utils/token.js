const jwt = require('jsonwebtoken');

const generateToken = (user) =>
  jwt.sign(
    { id: user.id, role: user.role, name: user.name, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );

module.exports = { generateToken };
