const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Mock authentication middleware
const isAuthenticated = async (req, res, next) => {
  try {
    // For development, accept userId in headers or use default
    const userId = req.headers['user-id'] || '507f1f77bcf86cd799439011';
    req.user = { _id: userId };
    next();
  } catch (error) {
    res.status(401).json({ message: 'Authentication failed' });
  }
};

// Mock admin middleware
const isAdmin = async (req, res, next) => {
  try {
    // For development, accept admin status in headers
    const isAdminUser = req.headers['is-admin'] === 'true';
    if (!isAdminUser) {
      return res.status(403).json({ message: 'Admin access required' });
    }
    next();
  } catch (error) {
    res.status(403).json({ message: 'Admin access denied' });
  }
};

module.exports = { isAuthenticated, isAdmin };