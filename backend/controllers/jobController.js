const Job = require('../models/Job');

// @desc    Get all jobs with pagination and filters
// @route   GET /api/jobs
// @access  Public
exports.getJobs = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = Math.min(parseInt(req.query.pageSize) || 12, 100);
    const search = req.query.search || '';
    const location = req.query.location || '';
    const type = req.query.type || '';
    const category = req.query.category || '';
    const vacancyType = req.query.vacancyType || '';

    // Build query
    let query = {};
    
    // Search across multiple fields using regex (case-insensitive)
    if (search && search.trim()) {
      const searchRegex = { $regex: search.trim(), $options: 'i' };
      query.$or = [
        { title: searchRegex },
        { company: searchRegex },
        { location: searchRegex },
        { shortDescription: searchRegex },
        { fullDescription: searchRegex },
        { category: searchRegex }
      ];
    }
    
    if (location) {
      query.location = { $regex: location, $options: 'i' };
    }
    
    if (type) {
      query.jobType = type;
    }
    
    if (category) {
      query.category = category;
    }

    if (vacancyType) {
      query.vacancyType = vacancyType;
    }

    // Calculate skip value for pagination
    const skip = (page - 1) * pageSize;

    // Execute query
    const jobs = await Job.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(pageSize);

    // Get total count for pagination
    const total = await Job.countDocuments(query);
    const totalPages = Math.ceil(total / pageSize);

    res.json({
      jobs,
      pagination: {
        currentPage: page,
        totalPages,
        total,
        hasNext: page < totalPages,
        hasPrev: page > 1
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single job by ID
// @route   GET /api/jobs/:id
// @access  Public
exports.getJobById = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id);
    
    if (!job) {
      return res.status(404).json({ 
        error: 'Job not found',
        message: 'The requested job posting does not exist'
      });
    }

    res.json(job);
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(404).json({
        error: 'Job not found',
        message: 'Invalid job ID'
      });
    }
    next(error);
  }
};

// @desc    Create new job
// @route   POST /api/jobs
// @access  Private (Admin)
exports.createJob = async (req, res, next) => {
  try {
    const jobData = {
      ...req.body,
      // Ensure vacancyType is set
      vacancyType: req.body.vacancyType || 'External'
    };

    const job = new Job(jobData);
    await job.save();

    res.status(201).json({
      message: 'Job posted successfully',
      job
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update job
// @route   PUT /api/jobs/:id
// @access  Private (Admin)
exports.updateJob = async (req, res, next) => {
  try {
    const job = await Job.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!job) {
      return res.status(404).json({ 
        error: 'Job not found',
        message: 'The requested job posting does not exist'
      });
    }

    res.json({
      message: 'Job updated successfully',
      job
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(404).json({
        error: 'Job not found',
        message: 'Invalid job ID'
      });
    }
    next(error);
  }
};

// @desc    Delete job
// @route   DELETE /api/jobs/:id
// @access  Private (Admin)
exports.deleteJob = async (req, res, next) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);
    
    if (!job) {
      return res.status(404).json({ 
        error: 'Job not found',
        message: 'The requested job posting does not exist'
      });
    }

    res.json({
      message: 'Job deleted successfully',
      deletedJob: job
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(404).json({
        error: 'Job not found',
        message: 'Invalid job ID'
      });
    }
    next(error);
  }
};

// @desc    Export jobs as CSV with filters
// @route   GET /api/admin/jobs/export
// @access  Private (Admin)
exports.exportJobs = async (req, res, next) => {
  try {
    const search = req.query.search || '';
    const location = req.query.location || '';
    const type = req.query.type || '';
    const category = req.query.category || '';
    const vacancyType = req.query.vacancyType || '';

    // Build query (same logic as getJobs)
    let query = {};
    
    // Search across multiple fields using regex (case-insensitive)
    if (search && search.trim()) {
      const searchRegex = { $regex: search.trim(), $options: 'i' };
      query.$or = [
        { title: searchRegex },
        { company: searchRegex },
        { location: searchRegex },
        { shortDescription: searchRegex },
        { fullDescription: searchRegex },
        { category: searchRegex }
      ];
    }
    
    if (location) {
      query.location = { $regex: location, $options: 'i' };
    }
    
    if (type) {
      query.jobType = type;
    }
    
    if (category) {
      query.category = category;
    }

    if (vacancyType) {
      query.vacancyType = vacancyType;
    }

    // Get filtered jobs
    const jobs = await Job.find(query).sort({ createdAt: -1 });
    
    // CSV header
    const csvHeader = 'Title,Company,Location,Job Type,Category,Vacancy Type,Experience,Salary,Short Description,Apply Link,Created At\n';
    
    // CSV rows with proper escaping
    const csvRows = jobs.map(job => {
      const escapeCSV = (field) => {
        if (!field) return '';
        const string = String(field);
        if (string.includes(',') || string.includes('"') || string.includes('\n')) {
          return `"${string.replace(/"/g, '""')}"`;
        }
        return string;
      };

      // Clean salary by removing rupee symbol and any currency symbols
      const cleanSalary = (salary) => {
        if (!salary) return '';
        // Remove rupee symbol (₹), corrupted rupee symbol (â‚¹), and other currency symbols
        return String(salary)
          .replace(/₹/g, '') // Remove ₹
          .replace(/â‚¹/g, '') // Remove corrupted rupee symbol
          .replace(/[\u20B9]/g, '') // Remove rupee symbol (Unicode)
          .replace(/\$/g, '') // Remove dollar sign
          .replace(/€/g, '') // Remove euro sign
          .replace(/£/g, '') // Remove pound sign
          .trim(); // Remove leading/trailing spaces
      };

      return [
        escapeCSV(job.title),
        escapeCSV(job.company),
        escapeCSV(job.location),
        escapeCSV(job.jobType),
        escapeCSV(job.category),
        escapeCSV(job.vacancyType),
        escapeCSV(job.experience),
        escapeCSV(cleanSalary(job.salary)),
        escapeCSV(job.shortDescription),
        escapeCSV(job.applyLink),
        job.createdAt.toISOString()
      ].join(',');
    }).join('\n');
    
    const csvContent = csvHeader + csvRows;
    
    // Generate filename with filter info if filters are applied
    let filename = 'cloudblitz-jobs-export';
    const filterParts = [];
    if (search) filterParts.push('search');
    if (location) filterParts.push(location.replace(/[^a-zA-Z0-9]/g, '-'));
    if (type) filterParts.push(type);
    if (category) filterParts.push(category.replace(/[^a-zA-Z0-9]/g, '-'));
    if (vacancyType) filterParts.push(vacancyType);
    
    if (filterParts.length > 0) {
      filename += '-' + filterParts.join('-');
    }
    filename += '.csv';
    
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.send(csvContent);
  } catch (error) {
    next(error);
  }
};

