const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { JWT_SECRET } = require('../middleware/authMiddleware');

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, username: user.username, mail: user.mail, fullname: user.fullname },
    JWT_SECRET,
    { expiresIn: '30d' }
  );
};

// @desc    Register a new user
// @route   POST /api/auth/signup
const registerUser = async (req, res) => {
  try {
    const { fname, lname, mail, pass, phno } = req.body;

    if (!mail || !pass) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    const emailTrimmed = mail.trim().toLowerCase();
    const existingUser = await User.findOne({ mail: emailTrimmed });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    const randomNum = Math.floor(Math.random() * 900) + 100;
    const fullname = fname && lname ? `${fname} ${lname}` : fname || 'User';
    const username = (fname ? fname.toLowerCase() : 'user') + randomNum;

    const salt = await bcrypt.genSalt(10);
    const hashpass = await bcrypt.hash(pass, salt);

    const user = await User.create({
      fullname,
      username,
      mail: emailTrimmed,
      phno: phno || '',
      pass: hashpass
    });

    const token = generateToken(user);

    res.status(201).json({
      token,
      user: {
        id: user._id,
        fullname: user.fullname,
        username: user.username,
        mail: user.mail,
        phno: user.phno
      }
    });
  } catch (error) {
    console.error('Signup Error:', error);
    res.status(500).json({ message: 'Server error during signup', error: error.message });
  }
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
const loginUser = async (req, res) => {
  try {
    const { mail, pass } = req.body;

    if (!mail || !pass) {
      return res.status(400).json({ message: 'Please enter both email and password' });
    }

    const emailTrimmed = mail.trim().toLowerCase();
    const user = await User.findOne({ mail: emailTrimmed });

    if (!user) {
      return res.status(404).json({ message: 'User not found. Please sign up first.' });
    }

    const isMatch = await bcrypt.compare(pass, user.pass);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid password. Please try again.' });
    }

    const token = generateToken(user);

    res.json({
      token,
      user: {
        id: user._id,
        fullname: user.fullname,
        username: user.username,
        mail: user.mail,
        phno: user.phno
      }
    });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ message: 'Server error during login', error: error.message });
  }
};

// @desc    Get current user profile
// @route   GET /api/auth/me
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-pass');
    if (!user) {
      return res.status(404).json({ message: 'User profile not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching profile' });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile
};
