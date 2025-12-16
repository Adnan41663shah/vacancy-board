const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

// @desc    Admin login
// @route   POST /api/admin/login
// @access  Public
exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        error: 'Missing credentials',
        message: 'Username and password are required'
      });
    }

    if (!process.env.JWT_SECRET) {
      console.error('❌ JWT_SECRET is not set in environment variables!');
      return res.status(500).json({
        error: 'Server configuration error',
        message: 'Authentication service is not properly configured'
      });
    }

    // Find admin by username (trim and case-sensitive match)
    const trimmedUsername = username.trim();
    const admin = await Admin.findOne({ 
      username: trimmedUsername,
      isActive: true 
    });
    
    if (!admin) {
      console.log(`❌ Login attempt failed: Admin not found or inactive - username: ${username}`);
      return res.status(401).json({
        error: 'Authentication failed',
        message: 'Invalid username or password'
      });
    }

    // Check password
    const isPasswordValid = await admin.comparePassword(password);
    
    if (!isPasswordValid) {
      console.log(`❌ Login attempt failed: Invalid password for username: ${username}`);
      return res.status(401).json({
        error: 'Authentication failed',
        message: 'Invalid username or password'
      });
    }
    
    console.log(`✅ Login successful for username: ${username}`);

    // Update last login
    admin.lastLogin = new Date();
    await admin.save();

    // Generate JWT token
    const token = jwt.sign(
      { adminId: admin._id, username: admin.username, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      message: 'Login successful',
      token,
      admin: {
        id: admin._id,
        username: admin.username,
        name: admin.name,
        email: admin.email,
        role: admin.role
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Register new admin
// @route   POST /api/admin/register
// @access  Public
exports.register = async (req, res, next) => {
  try {
    const { username, email, password, name, role } = req.body;

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({
      $or: [{ username }, { email }]
    });
    
    if (existingAdmin) {
      return res.status(400).json({ 
        message: 'Username or email already exists' 
      });
    }

    const admin = new Admin({
      username,
      email,
      password,
      name,
      role: role || 'admin'
    });

    const savedAdmin = await admin.save();

    res.status(201).json({
      message: 'Admin created successfully',
      admin: {
        id: savedAdmin._id,
        username: savedAdmin.username,
        name: savedAdmin.name,
        email: savedAdmin.email,
        role: savedAdmin.role
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get admin profile
// @route   GET /api/admin/profile
// @access  Private
exports.getProfile = async (req, res, next) => {
  try {
    res.json({
      admin: {
        id: req.admin._id,
        username: req.admin.username,
        name: req.admin.name,
        email: req.admin.email,
        role: req.admin.role,
        lastLogin: req.admin.lastLogin
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update admin profile
// @route   PUT /api/admin/profile
// @access  Private
exports.updateProfile = async (req, res, next) => {
  try {
    const { name, email } = req.body;

    // Check if email is being changed and if it's already taken
    if (email && email !== req.admin.email) {
      const existingAdmin = await Admin.findOne({ email });
      if (existingAdmin) {
        return res.status(400).json({
          error: 'Validation error',
          message: 'Email already exists'
        });
      }
    }

    // Update allowed fields
    if (name) req.admin.name = name;
    if (email) req.admin.email = email;

    const updatedAdmin = await req.admin.save();

    res.json({
      message: 'Profile updated successfully',
      admin: {
        id: updatedAdmin._id,
        username: updatedAdmin.username,
        name: updatedAdmin.name,
        email: updatedAdmin.email,
        role: updatedAdmin.role
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Change admin password
// @route   PUT /api/admin/change-password
// @access  Private
exports.changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        error: 'Missing fields',
        message: 'Current password and new password are required'
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        error: 'Validation error',
        message: 'New password must be at least 6 characters'
      });
    }

    // Verify current password
    const isCurrentPasswordValid = await req.admin.comparePassword(currentPassword);
    if (!isCurrentPasswordValid) {
      return res.status(400).json({ 
        message: 'Current password is incorrect' 
      });
    }

    // Update password
    req.admin.password = newPassword;
    await req.admin.save();

    res.json({ message: 'Password changed successfully' });
  } catch (error) {
    next(error);
  }
};

