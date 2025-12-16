const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ 
        error: 'Access denied',
        message: 'No token provided' 
      });
    }

    if (!process.env.JWT_SECRET) {
      console.error('❌ JWT_SECRET is not set in environment variables!');
      return res.status(500).json({
        error: 'Server configuration error',
        message: 'Authentication service is not properly configured'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findById(decoded.adminId);
    
    if (!admin || !admin.isActive) {
      return res.status(401).json({ 
        error: 'Access denied',
        message: 'Invalid or inactive admin account' 
      });
    }

    req.admin = admin;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(403).json({ 
        error: 'Access denied',
        message: 'Token has expired' 
      });
    }
    
    return res.status(403).json({ 
      error: 'Access denied',
      message: 'Invalid token' 
    });
  }
};

module.exports = authenticateToken;

