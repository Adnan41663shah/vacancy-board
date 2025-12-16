const mongoose = require('mongoose');
require('dotenv').config();
const Job = require('../models/Job');

const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/cloudblitz-dashboard';

// Sample job data
const sampleJobs = [
  {
    title: "Senior Full Stack Developer",
    company: "CloudBlitz Technologies",
    location: "Mumbai, India",
    jobType: "Full-time",
    category: "Full Stack Development",
    vacancyType: "External",
    experience: "5-8 years",
    salary: "₹15,00,000 - ₹25,00,000",
    shortDescription: "Join our dynamic team to build scalable web applications using modern technologies like React, Node.js, and cloud platforms.",
    fullDescription: `We are looking for a Senior Full Stack Developer to join our growing team at CloudBlitz Technologies.

Key Responsibilities:
• Design and develop scalable web applications
• Work with React, Node.js, and cloud platforms (AWS/Azure)
• Collaborate with cross-functional teams
• Mentor junior developers
• Participate in code reviews and technical discussions

Requirements:
• 5-8 years of experience in full-stack development
• Strong proficiency in JavaScript, React, Node.js
• Experience with cloud platforms (AWS/Azure/GCP)
• Knowledge of databases (MongoDB, PostgreSQL)
• Experience with CI/CD pipelines
• Strong problem-solving skills

Benefits:
• Competitive salary and benefits
• Flexible work arrangements
• Professional development opportunities
• Health insurance
• Annual bonus`,
    applyLink: "https://cloudblitz.in/careers/senior-developer"
  },
  {
    title: "DevOps Engineer",
    company: "TechCorp Solutions",
    location: "Bangalore, India",
    jobType: "Full-time",
    category: "DevOps",
    vacancyType: "External",
    experience: "3-6 years",
    salary: "₹12,00,000 - ₹20,00,000",
    shortDescription: "Help us build and maintain robust infrastructure and deployment pipelines for our cloud-native applications.",
    fullDescription: `We are seeking a DevOps Engineer to join our infrastructure team.

Key Responsibilities:
• Design and implement CI/CD pipelines
• Manage cloud infrastructure (AWS/Azure)
• Monitor and optimize system performance
• Implement security best practices
• Automate deployment processes

Requirements:
• 3-6 years of DevOps experience
• Strong knowledge of AWS/Azure services
• Experience with Docker, Kubernetes
• Proficiency in scripting (Python, Bash)
• Knowledge of monitoring tools (Prometheus, Grafana)
• Experience with Terraform or CloudFormation

Benefits:
• Competitive compensation
• Remote work options
• Learning and certification support
• Health and wellness benefits`,
    applyLink: "https://techcorp.com/careers/devops-engineer"
  },
  {
    title: "Data Scientist",
    company: "Analytics Inc",
    location: "Hyderabad, India",
    jobType: "Full-time",
    category: "Data Science",
    vacancyType: "Internal",
    experience: "4-7 years",
    salary: "₹18,00,000 - ₹30,00,000",
    shortDescription: "Transform data into actionable insights and build machine learning models to drive business decisions.",
    fullDescription: `Join our data science team to work on cutting-edge analytics projects.

Key Responsibilities:
• Develop machine learning models and algorithms
• Analyze large datasets to extract insights
• Build predictive models for business applications
• Collaborate with business stakeholders
• Present findings to technical and non-technical audiences

Requirements:
• 4-7 years of experience in data science
• Strong programming skills in Python/R
• Experience with machine learning frameworks (TensorFlow, PyTorch)
• Knowledge of SQL and big data technologies
• Experience with statistical analysis and modeling
• Strong communication and presentation skills

Benefits:
• Competitive salary with performance bonuses
• Access to latest tools and technologies
• Conference and training opportunities
• Health insurance and wellness programs`,
    applyLink: "https://analyticsinc.com/careers/data-scientist"
  }
];

async function seedDatabase() {
  try {
    console.log('🌱 Connecting to MongoDB...');
    
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
    });

    console.log('✅ Connected to MongoDB successfully!');

    // Clear existing jobs
    console.log('🧹 Clearing existing jobs...');
    await Job.deleteMany({});
    console.log('✅ Existing jobs cleared');

    // Insert sample jobs
    console.log('📝 Inserting sample jobs...');
    const insertedJobs = await Job.insertMany(sampleJobs);
    console.log(`✅ Successfully inserted ${insertedJobs.length} sample jobs`);

    // Display sample jobs
    console.log('\n📋 Sample Jobs Created:');
    insertedJobs.forEach((job, index) => {
      console.log(`${index + 1}. ${job.title} at ${job.company} (${job.location}) - ${job.vacancyType}`);
    });

    console.log('\n🎉 Database seeding completed successfully!');
    console.log('🚀 You can now start the application with: npm start');

  } catch (error) {
    console.error('❌ Error seeding database:', error.message);
    
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
seedDatabase();

