const express = require('express');
const router = express.Router();
const {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory
} = require('../controllers/categoryController');
const { getPublicCategories } = require('../controllers/categoryController');
const authenticateToken = require('../middleware/auth');
const { body } = require('express-validator');
const validate = require('../middleware/validate');

// Public route
router.get('/', getPublicCategories);

// Protected routes (Admin only)
router.get('/admin', authenticateToken, getCategories);

router.post(
  '/admin',
  authenticateToken,
  [
    body('name').trim().notEmpty().withMessage('Category name is required').isLength({ max: 100 }).withMessage('Category name cannot exceed 100 characters'),
    body('icon').optional().trim(),
    body('color').optional().trim()
  ],
  validate,
  createCategory
);

router.put(
  '/admin/:id',
  authenticateToken,
  [
    body('name').optional().trim().isLength({ max: 100 }).withMessage('Category name cannot exceed 100 characters'),
    body('icon').optional().trim(),
    body('color').optional().trim(),
    body('isActive').optional().isBoolean().withMessage('isActive must be a boolean')
  ],
  validate,
  updateCategory
);

router.delete('/admin/:id', authenticateToken, deleteCategory);

module.exports = router;

