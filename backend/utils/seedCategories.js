const mongoose = require('mongoose');
require('dotenv').config();
const Category = require('../models/Category');

const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/cloudblitz-dashboard';

// Default categories
const defaultCategories = [
  {
    name: 'DevOps',
    icon: 'FaCogs',
    color: 'bg-blue-100 text-blue-800'
  },
  {
    name: 'Full Stack Development',
    icon: 'FaCode',
    color: 'bg-green-100 text-green-800'
  },
  {
    name: 'Data Science',
    icon: 'FaChartLine',
    color: 'bg-orange-100 text-orange-800'
  }
];

async function seedCategories() {
  try {
    console.log('🌱 Connecting to MongoDB...');
    
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
    });

    console.log('✅ Connected to MongoDB successfully!');

    // Check existing categories
    const existingCategories = await Category.find({});
    const existingNames = existingCategories.map(cat => cat.name.toLowerCase());

    // Insert only new categories
    const categoriesToInsert = defaultCategories.filter(
      cat => !existingNames.includes(cat.name.toLowerCase())
    );

    if (categoriesToInsert.length > 0) {
      console.log('📝 Inserting default categories...');
      const insertedCategories = await Category.insertMany(categoriesToInsert);
      console.log(`✅ Successfully inserted ${insertedCategories.length} default categories`);
    } else {
      console.log('✅ Default categories already exist');
    }

    // Display all categories
    const allCategories = await Category.find({});
    console.log('\n📋 Categories in database:');
    allCategories.forEach((cat, index) => {
      console.log(`${index + 1}. ${cat.name} (${cat.isActive ? 'Active' : 'Inactive'})`);
    });

    console.log('\n🎉 Category seeding completed successfully!');

  } catch (error) {
    console.error('❌ Error seeding categories:', error.message);
    
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

// Run the seed function
seedCategories();

