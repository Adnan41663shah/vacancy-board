const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const errorHandler = require('./middleware/errorHandler');
const jobRoutes = require('./routes/jobRoutes');
const adminRoutes = require('./routes/adminRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const { startAutoDeleteScheduler } = require('./utils/autoDeleteJobs');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Validate required environment variables
if (!process.env.JWT_SECRET) {
  console.error('❌ JWT_SECRET is not set in environment variables!');
  console.error('Please set JWT_SECRET in your .env file');
  process.exit(1);
}

// Connect to database
connectDB().then(() => {
  // Start automatic job deletion scheduler (deletes jobs older than 15 days)
  // Wait for DB connection before starting scheduler
  startAutoDeleteScheduler();
}).catch((error) => {
  console.error('Failed to start auto-delete scheduler:', error);
});

// Middleware
// CORS configuration - allow both 3000 and 8000 in development for flexibility
const allowedOrigins = process.env.NODE_ENV === 'production' 
  ? [process.env.FRONTEND_URL || 'http://localhost:8000']
  : ['http://localhost:8000', 'http://localhost:3000', process.env.FRONTEND_URL].filter(Boolean);

console.log(`🌐 CORS configured for origins: ${allowedOrigins.join(', ')}`);

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Routes
app.use('/api/jobs', jobRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/categories', categoryRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Error handling middleware (must be last)
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 CloudBlitz Job Dashboard API running on http://localhost:${PORT}`);
  console.log(`📊 API available at http://localhost:${PORT}/api/jobs`);
  console.log(`🔐 Admin API available at http://localhost:${PORT}/api/admin`);
});

