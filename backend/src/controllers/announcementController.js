const { validationResult } = require('express-validator');
const { createAnnouncement, getAllAnnouncements } = require('../models/announcementModel');

const listAnnouncements = async (req, res, next) => {
  try {
    const announcements = await getAllAnnouncements();
    return res.json({ announcements });
  } catch (error) {
    return next(error);
  }
};

const createNewAnnouncement = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const announcement = await createAnnouncement({
      title: req.body.title,
      body: req.body.body
    });

    return res.status(201).json({ announcement });
  } catch (error) {
    return next(error);
  }
};

module.exports = { listAnnouncements, createNewAnnouncement };
