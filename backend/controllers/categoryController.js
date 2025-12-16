const Category = require('../models/Category');
const Job = require('../models/Job');

// @desc    Get all categories
// @route   GET /api/admin/categories
// @access  Private (Admin)
exports.getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find({ isActive: true }).sort({ name: 1 });
    res.json({ categories });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all categories (public - for job form)
// @route   GET /api/categories
// @access  Public
exports.getPublicCategories = async (req, res, next) => {
  try {
    const categories = await Category.find({ isActive: true }).sort({ name: 1 });
    res.json({ categories });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new category
// @route   POST /api/admin/categories
// @access  Private (Admin)
exports.createCategory = async (req, res, next) => {
  try {
    const { name, icon, color } = req.body;

    // Check if category already exists
    const existingCategory = await Category.findOne({ 
      name: { $regex: new RegExp(`^${name}$`, 'i') } 
    });

    if (existingCategory) {
      return res.status(400).json({
        error: 'Category already exists',
        message: 'A category with this name already exists'
      });
    }

    const category = new Category({
      name: name.trim(),
      icon: icon || 'FaThLarge',
      color: color || 'bg-gray-100 text-gray-800'
    });

    await category.save();

    res.status(201).json({
      message: 'Category created successfully',
      category
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update category
// @route   PUT /api/admin/categories/:id
// @access  Private (Admin)
exports.updateCategory = async (req, res, next) => {
  try {
    const { name, icon, color, isActive } = req.body;

    // Check if name is being changed and if it conflicts with another category
    if (name) {
      const existingCategory = await Category.findOne({
        _id: { $ne: req.params.id },
        name: { $regex: new RegExp(`^${name}$`, 'i') }
      });

      if (existingCategory) {
        return res.status(400).json({
          error: 'Category already exists',
          message: 'A category with this name already exists'
        });
      }
    }

    const category = await Category.findByIdAndUpdate(
      req.params.id,
      {
        ...(name && { name: name.trim() }),
        ...(icon && { icon }),
        ...(color && { color }),
        ...(isActive !== undefined && { isActive })
      },
      { new: true, runValidators: true }
    );

    if (!category) {
      return res.status(404).json({
        error: 'Category not found',
        message: 'The requested category does not exist'
      });
    }

    res.json({
      message: 'Category updated successfully',
      category
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(404).json({
        error: 'Category not found',
        message: 'Invalid category ID'
      });
    }
    next(error);
  }
};

// @desc    Delete category
// @route   DELETE /api/admin/categories/:id
// @access  Private (Admin)
exports.deleteCategory = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);
    
    if (!category) {
      return res.status(404).json({
        error: 'Category not found',
        message: 'The requested category does not exist'
      });
    }

    // Check if category is used in any jobs (for informational purposes only)
    // Note: We allow deletion even if used - existing jobs will keep their category name
    const jobsCount = await Job.countDocuments({ category: category.name });

    const deletedCategory = await Category.findByIdAndDelete(req.params.id);

    res.json({
      message: 'Category deleted successfully',
      deletedCategory,
      jobsUsingCategory: jobsCount // Inform admin how many jobs use this category
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(404).json({
        error: 'Category not found',
        message: 'Invalid category ID'
      });
    }
    next(error);
  }
};

