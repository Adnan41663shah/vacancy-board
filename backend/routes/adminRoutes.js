const express = require('express');
const router = express.Router();
const {
  login,
  register,
  getProfile,
  updateProfile,
  changePassword
} = require('../controllers/adminController');
const { exportJobs } = require('../controllers/jobController');
const authenticateToken = require('../middleware/auth');
const { body } = require('express-validator');
const validate = require('../middleware/validate');
const rateLimit = require('express-rate-limit');

// Rate limiting for auth endpoints
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: 'Too many login attempts, please try again later'
});

// Public routes
router.post(
  '/login',
  authLimiter,
  [
    body('username').trim().notEmpty().withMessage('Username is required'),
    body('password').notEmpty().withMessage('Password is required')
  ],
  validate,
  login
);

router.post(
  '/register',
  [
    body('username').trim().notEmpty().withMessage('Username is required').isLength({ min: 3 }).withMessage('Username must be at least 3 characters'),
    body('email').trim().isEmail().withMessage('Please provide a valid email').normalizeEmail(),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('role').optional().isIn(['admin', 'super_admin']).withMessage('Invalid role')
  ],
  validate,
  register
);

// Protected routes
router.get('/profile', authenticateToken, getProfile);

router.put(
  '/profile',
  authenticateToken,
  [
    body('name').optional().trim().notEmpty().withMessage('Name cannot be empty'),
    body('email').optional().trim().isEmail().withMessage('Please provide a valid email').normalizeEmail()
  ],
  validate,
  updateProfile
);

router.put(
  '/change-password',
  authenticateToken,
  [
    body('currentPassword').notEmpty().withMessage('Current password is required'),
    body('newPassword').isLength({ min: 6 }).withMessage('New password must be at least 6 characters')
  ],
  validate,
  changePassword
);

// Export jobs route (with filters)
router.get('/jobs/export', authenticateToken, exportJobs);

module.exports = router;

