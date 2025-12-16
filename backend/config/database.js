const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI;
    
    if (!mongoUri) {
      throw new Error('MONGODB_URI is not defined in environment variables');
    }

    console.log('Attempting to connect to MongoDB...');
    
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    console.log('✅ Connected to MongoDB successfully!');
    return true;
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    
    if (error.name === 'MongooseServerSelectionError') {
      console.log('\n🔧 MongoDB Atlas Connection Troubleshooting:');
      console.log('1. Check if your IP is whitelisted in MongoDB Atlas Network Access');
      console.log('2. Verify username and password in your connection string');
      console.log('3. Ensure your Atlas cluster is active and running');
      console.log('4. Check your connection string format in .env file');
    }
    
    process.exit(1);
  }
};

module.exports = connectDB;

