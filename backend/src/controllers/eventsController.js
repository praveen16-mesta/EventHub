const Event = require('../models/Event');
const Registration = require('../models/Registration');

// @desc Get all events with filtering & search
// @route GET /api/events
const getEvents = async (req, res) => {
  try {
    const { category, search } = req.query;
    let query = {};

    if (category && category !== 'all') {
      query.category = category.toLowerCase();
    }

    if (search) {
      const searchRegex = new RegExp(search, 'i');
      query.$or = [
        { title: searchRegex },
        { location: searchRegex },
        { category: searchRegex },
        { description: searchRegex }
      ];
    }

    const events = await Event.find(query).sort({ createdAt: -1 });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching events', error: error.message });
  }
};

// @desc Get single event by ID
// @route GET /api/events/:id
const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching event details' });
  }
};

// @desc Create a new event
// @route POST /api/events
const createEvent = async (req, res) => {
  try {
    const { title, date, location, price, category, capacity, description } = req.body;

    if (!title || !date || !location || !category || !capacity) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const newEvent = await Event.create({
      title,
      date,
      location,
      price: Number(price) || 0,
      category: category.toLowerCase(),
      capacity: Number(capacity),
      description: description || '',
      organizer: req.user.id,
      organizerName: req.user.fullname || req.user.username
    });

    res.status(201).json(newEvent);
  } catch (error) {
    res.status(500).json({ message: 'Error creating event', error: error.message });
  }
};

// @desc Register user for an event
// @route POST /api/events/:id/register
const registerForEvent = async (req, res) => {
  try {
    const { attendeeName, attendeeEmail } = req.body;
    const eventId = req.params.id;
    const userId = req.user.id;

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    if (event.attendees >= event.capacity) {
      return res.status(400).json({ message: 'Event is fully booked! Maximum capacity reached.' });
    }

    // Check if already registered
    const existingRegistration = await Registration.findOne({ user: userId, event: eventId });
    if (existingRegistration) {
      return res.status(400).json({ message: 'You are already registered for this event!' });
    }

    // Create registration record
    const registration = await Registration.create({
      user: userId,
      event: eventId,
      attendeeName: attendeeName || req.user.fullname,
      attendeeEmail: attendeeEmail || req.user.mail
    });

    // Increment attendees count
    event.attendees += 1;
    await event.save();

    res.status(201).json({
      message: 'Registration successful!',
      registration,
      event
    });
  } catch (error) {
    res.status(500).json({ message: 'Error registering for event', error: error.message });
  }
};

// @desc Get user dashboard stats and user's events / registrations
// @route GET /api/events/dashboard/stats
const getUserDashboard = async (req, res) => {
  try {
    const userId = req.user.id;

    const totalEventsCount = await Event.countDocuments();
    const myEvents = await Event.find({ organizer: userId }).sort({ createdAt: -1 });

    const registrations = await Registration.find({ user: userId }).populate('event');
    const registeredEvents = registrations
      .map(r => r.event)
      .filter(e => e !== null);

    // Stats calculations
    const allEvents = await Event.find();
    let totalAttendees = 0;
    let totalRevenue = 0;

    allEvents.forEach(evt => {
      totalAttendees += (evt.attendees || 0);
      totalRevenue += (evt.attendees || 0) * (evt.price || 0);
    });

    res.json({
      stats: {
        totalEvents: totalEventsCount,
        totalAttendees,
        revenue: totalRevenue.toFixed(2),
        upcomingEvents: allEvents.length,
        myOrganizedCount: myEvents.length,
        myRegisteredCount: registeredEvents.length
      },
      myEvents,
      registeredEvents
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching dashboard stats', error: error.message });
  }
};

// @desc Delete an event
// @route DELETE /api/events/:id
const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    if (event.organizer && event.organizer.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to delete this event' });
    }

    await Event.findByIdAndDelete(req.params.id);
    await Registration.deleteMany({ event: req.params.id });

    res.json({ message: 'Event removed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting event' });
  }
};

module.exports = {
  getEvents,
  getEventById,
  createEvent,
  registerForEvent,
  getUserDashboard,
  deleteEvent
};
