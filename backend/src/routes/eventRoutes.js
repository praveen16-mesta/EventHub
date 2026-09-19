const express = require('express');
const router = express.Router();
const {
  getEvents,
  getEventById,
  createEvent,
  registerForEvent,
  getUserDashboard,
  deleteEvent
} = require('../controllers/eventsController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', getEvents);
router.get('/dashboard/stats', protect, getUserDashboard);
router.get('/:id', getEventById);
router.post('/', protect, createEvent);
router.post('/:id/register', protect, registerForEvent);
router.delete('/:id', protect, deleteEvent);

module.exports = router;
