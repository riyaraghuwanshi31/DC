const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const authRoutes = require('./routes/auth');

dotenv.config();

const app = express();

// Replace your current CORS setup with this:
const allowedOrigins = [
  'https://dc-one-omega.vercel.app',
  'https://dc-awuphn1j9-riya-raghuwanshis-projects.vercel.app',
  'https://dc-git-main-riya-raghuwanshis-projects.vercel.app',
  'https://dc-lqusk49kz-riya-raghuwanshis-projects.vercel.app',
  'http://localhost:3000'
];

app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));



// Middleware

// Allow all origins for testing (then restrict later)
// app.use(cors({
//   origin: [
//   'https://dc-mu-five.vercel.app',
//   'https://dc-git-main-riya-raghuwanshis-projects.vercel.app', 
//   'https://dc-cry6jf77y-riya-raghuwanshis-projects.vercel.app',
//   'http://localhost:3000'
// ],
//   credentials: true,
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization']
// }));

// app.use(cors());  // Allow all origins


// app.use(cors({
//   origin: ['https://dc-awuphn1j9-riya-raghuwanshis-projects.vercel.app', 'http://localhost:3000'],
//   credentials: true
//   // methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   // allowedHeaders: ['Content-Type', 'Authorization']
// }));


// Or for quick testing, allow all:
// app.use(cors());


// app.use(
//   cors({
//     origin: [
//       "http://localhost:3000",
//       "https://dc-blush.vercel.app"
//     ],
//     credentials: true,
//   })
// );
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/auth', authRoutes);

// Static files for uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/products', require('./routes/products'));
app.use('/api/categories', require('./routes/categories'));
app.use('/api/orders', require('./routes/orders'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Dubey Creation API is running' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

// Connect to MongoDB
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://riya0831_db_user:Riya123@cluster0.i47ax1x.mongodb.net/dubey-creation?retryWrites=true&w=majority&appName=Cluster0';

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('✅ MongoDB connected successfully');
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });

module.exports = app;
