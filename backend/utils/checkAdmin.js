const mongoose = require('mongoose');
require('dotenv').config();
const Admin = require('../models/Admin');

const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/cloudblitz-dashboard';

async function checkAdminUser() {
  try {
    console.log('🌱 Connecting to MongoDB...');
    
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
    });

    console.log('✅ Connected to MongoDB successfully!\n');

    // Find all admin users
    const admins = await Admin.find({});
    
    if (admins.length === 0) {
      console.log('❌ No admin users found in the database!');
      console.log('\n💡 To create an admin user, run:');
      console.log('   npm run create-admin');
    } else {
      console.log(`📋 Found ${admins.length} admin user(s):\n`);
      admins.forEach((admin, index) => {
        console.log(`${index + 1}. Username: ${admin.username}`);
        console.log(`   Email: ${admin.email}`);
        console.log(`   Name: ${admin.name}`);
        console.log(`   Role: ${admin.role}`);
        console.log(`   Active: ${admin.isActive ? '✅ Yes' : '❌ No'}`);
        console.log(`   Last Login: ${admin.lastLogin || 'Never'}`);
        console.log(`   Created: ${admin.createdAt}`);
        console.log('');
      });
    }

  } catch (error) {
    console.error('❌ Error checking admin users:', error.message);
    
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

checkAdminUser();

