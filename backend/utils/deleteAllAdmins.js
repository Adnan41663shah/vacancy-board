const mongoose = require('mongoose');
require('dotenv').config();
const Admin = require('../models/Admin');

const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/cloudblitz-dashboard';

async function deleteAllAdmins() {
  try {
    console.log('🌱 Connecting to MongoDB...');
    
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
    });

    console.log('✅ Connected to MongoDB successfully!');

    // Get count of admins before deletion
    const adminCount = await Admin.countDocuments();
    
    if (adminCount === 0) {
      console.log('ℹ️  No admin users found in the database.');
      process.exit(0);
    }

    console.log(`📊 Found ${adminCount} admin user(s) in the database.`);
    
    // List all admins before deletion
    const admins = await Admin.find({});
    console.log('\n📋 Admin users to be deleted:');
    admins.forEach((admin, index) => {
      console.log(`   ${index + 1}. Username: ${admin.username}, Email: ${admin.email}, Role: ${admin.role}`);
    });

    // Delete all admins
    const result = await Admin.deleteMany({});
    
    console.log(`\n✅ Successfully deleted ${result.deletedCount} admin user(s) from the database.`);
    console.log('⚠️  You can now create a new admin using: node backend/utils/createAdmin.js');

  } catch (error) {
    console.error('❌ Error deleting admin users:', error.message);
    
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

deleteAllAdmins();

