const express = require('express');
const router = express.Router();
const {
  getJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob
} = require('../controllers/jobController');
const authenticateToken = require('../middleware/auth');
const { body } = require('express-validator');
const validate = require('../middleware/validate');

// Public routes
router.get('/', getJobs);
router.get('/:id', getJobById);

// Protected routes (Admin only)
router.post(
  '/',
  authenticateToken,
  [
    body('title').trim().notEmpty().withMessage('Job title is required').isLength({ max: 100 }).withMessage('Title cannot exceed 100 characters'),
    body('company').trim().notEmpty().withMessage('Company name is required').isLength({ max: 50 }).withMessage('Company name cannot exceed 50 characters'),
    body('location').trim().notEmpty().withMessage('Location is required').isLength({ max: 50 }).withMessage('Location cannot exceed 50 characters'),
    body('jobType').isIn(['Full-time', 'Part-time', 'Contract']).withMessage('Invalid job type'),
    body('category').trim().notEmpty().withMessage('Category is required').isLength({ max: 100 }).withMessage('Category cannot exceed 100 characters'),
    body('vacancyType').isIn(['External', 'Internal']).withMessage('Invalid vacancy type').optional(),
    body('experience').trim().notEmpty().withMessage('Experience is required').isLength({ max: 50 }).withMessage('Experience cannot exceed 50 characters'),
    body('salary').optional().trim().isLength({ max: 50 }).withMessage('Salary cannot exceed 50 characters'),
    body('shortDescription').trim().notEmpty().withMessage('Short description is required').isLength({ max: 200 }).withMessage('Short description cannot exceed 200 characters'),
    body('fullDescription').trim().notEmpty().withMessage('Full description is required').isLength({ max: 2000 }).withMessage('Full description cannot exceed 2000 characters'),
    body('applyLink').trim().notEmpty().withMessage('Apply link is required').isURL().withMessage('Apply link must be a valid URL')
  ],
  validate,
  createJob
);

router.put(
  '/:id',
  authenticateToken,
  [
    body('title').optional().trim().isLength({ max: 100 }).withMessage('Title cannot exceed 100 characters'),
    body('company').optional().trim().isLength({ max: 50 }).withMessage('Company name cannot exceed 50 characters'),
    body('location').optional().trim().isLength({ max: 50 }).withMessage('Location cannot exceed 50 characters'),
    body('jobType').optional().isIn(['Full-time', 'Part-time', 'Contract']).withMessage('Invalid job type'),
    body('category').optional().isIn(['DevOps', 'Full Stack Development', 'Data Science']).withMessage('Invalid category'),
    body('vacancyType').optional().isIn(['External', 'Internal']).withMessage('Invalid vacancy type'),
    body('experience').optional().trim().isLength({ max: 50 }).withMessage('Experience cannot exceed 50 characters'),
    body('salary').optional().trim().isLength({ max: 50 }).withMessage('Salary cannot exceed 50 characters'),
    body('shortDescription').optional().trim().isLength({ max: 200 }).withMessage('Short description cannot exceed 200 characters'),
    body('fullDescription').optional().trim().isLength({ max: 2000 }).withMessage('Full description cannot exceed 2000 characters'),
    body('applyLink').optional().trim().isURL().withMessage('Apply link must be a valid URL')
  ],
  validate,
  updateJob
);

router.delete('/:id', authenticateToken, deleteJob);

module.exports = router;

