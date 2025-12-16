const Job = require('../models/Job');

/**
 * Delete jobs that are older than 15 days
 * This function runs automatically on a schedule
 */
const deleteOldJobs = async () => {
  try {
    // Calculate date 15 days ago
    const fifteenDaysAgo = new Date();
    fifteenDaysAgo.setDate(fifteenDaysAgo.getDate() - 15);

    // Find and delete jobs older than 15 days
    const result = await Job.deleteMany({
      createdAt: { $lt: fifteenDaysAgo }
    });

    if (result.deletedCount > 0) {
      console.log(`🗑️  Auto-deleted ${result.deletedCount} job(s) older than 15 days`);
    }

    return {
      deletedCount: result.deletedCount,
      cutoffDate: fifteenDaysAgo
    };
  } catch (error) {
    console.error('❌ Error in auto-delete jobs:', error.message);
    return {
      deletedCount: 0,
      error: error.message
    };
  }
};

/**
 * Start the automatic job deletion scheduler
 * Runs every 6 hours to check and delete old jobs
 */
const startAutoDeleteScheduler = () => {
  // Wait a moment for DB connection to be fully established
  setTimeout(async () => {
    console.log('⏰ Auto-delete scheduler started. Jobs older than 15 days will be deleted automatically.');
    await deleteOldJobs();
  }, 2000); // 2 second delay to ensure DB is ready

  // Then run every 6 hours (21600000 milliseconds)
  const interval = 6 * 60 * 60 * 1000; // 6 hours in milliseconds
  
  setInterval(async () => {
    await deleteOldJobs();
  }, interval);

  console.log(`⏰ Auto-delete scheduler initialized. Will check and delete old jobs every 6 hours.`);
};

module.exports = {
  deleteOldJobs,
  startAutoDeleteScheduler
};

