const mongoose = require('mongoose');
require('dotenv').config();
const Admin = require('../models/Admin');

const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/cloudblitz-dashboard';

async function createAdminUser() {
  try {
    console.log('🌱 Connecting to MongoDB...');
    
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
    });

    console.log('✅ Connected to MongoDB successfully!');

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ username: 'admin' });

    if (existingAdmin) {
      console.log('⚠️ Admin user already exists');
      console.log('Username: admin');
      console.log('Email: admin@cloudblitz.in');
      console.log('To reset password, delete the admin user and run this script again.');
      process.exit(0);
    }

    // Create new admin user
    const admin = new Admin({
      username: 'admin',
      email: 'admin@cloudblitz.in',
      password: 'Password@123', // This will be hashed automatically
      name: 'CloudBlitz Admin',
      role: 'admin'
    });

    await admin.save();

    console.log('✅ Admin user created successfully!');
    console.log('Username: admin');
    console.log('Password: Password@123');
    console.log('Email: admin@cloudblitz.in');
    console.log('⚠️  Please change the password after first login for security.');

  } catch (error) {
    console.error('❌ Error creating admin user:', error.message);
    
    if (error.name === 'MongooseServerSelectionError') {
      console.log('\n🔧 MongoDB Atlas Connection Troubleshooting:');
      console.log('1. Check if your IP is whitelisted in MongoDB Atlas Network Access');
      console.log('2. Verify username and password in your connection string');
      console.log('3. Ensure your Atlas cluster is active and running');
      console.log('4. Check your connection string format in .env file');
    }
  } finally {
    try {
      await mongoose.disconnect();
      console.log('🔌 Disconnected from MongoDB');
    } catch (disconnectError) {
      console.log('Disconnect error:', disconnectError.message);
    }
    process.exit(0);
  }
}

createAdminUser();

