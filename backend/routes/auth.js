const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { protect } = require('../middleware/auth');

const router = express.Router();


// ==========================
// REGISTER
// ==========================
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check existing user
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        msg: 'User already exists',
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,

      // Every new signup becomes normal user
      role: 'user',
    });

    

    // Generate token
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET || 'secret123',
      { expiresIn: '7d' }
    );

    res.status(201).json({
      token,
      role: user.role,
      name: user.name,
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      msg: 'Server error',
    });
  }
});


// ==========================
// LOGIN
// ==========================
router.post('/login', async (req, res) => {
  try {

    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        msg: 'User not found',
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        msg: 'Invalid credentials',
      });
    }

    // Generate token
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET || 'secret123',
      { expiresIn: '1d' }
    );

    res.json({
      token,
      role: user.role,
      name: user.name,
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      msg: 'Server error',
    });
  }
});


// ==========================
// GET CURRENT USER
// ==========================
router.get('/me', protect, async (req, res) => {
  try {

    const user = await User.findById(req.user.id).select('-password');

    res.json(user);

  } catch (err) {

    res.status(500).json({
      msg: 'Server error',
    });
  }
});

module.exports = router;


// const express = require('express');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const User = require('../models/User');

// const router = express.Router();

// // LOGIN
// router.post('/login', async (req, res) => {
//   try { 
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });
//     if (!user) return res.status(400).json({ msg: 'User not found' });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

//     const token = jwt.sign(
//       { id: user._id, role: user.role },
//       process.env.JWT_SECRET || "secret123",
//       { expiresIn: '1d' }
//     );

//     res.json({
//       token,
//       role: user.role,
//       name: user.name
//     });

//   } catch (err) {
//     res.status(500).json({ msg: 'Server error' });
//   }
// });

// module.exports = router;