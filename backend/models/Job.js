const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Job title is required'],
    trim: true,
    maxlength: [100, 'Job title cannot exceed 100 characters']
  },
  company: {
    type: String,
    required: [true, 'Company name is required'],
    trim: true,
    maxlength: [50, 'Company name cannot exceed 50 characters']
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
    trim: true,
    maxlength: [50, 'Location cannot exceed 50 characters']
  },
  jobType: {
    type: String,
    required: [true, 'Job type is required'],
    enum: {
      values: ['Full-time', 'Part-time', 'Contract'],
      message: 'Job type must be Full-time, Part-time, or Contract'
    }
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    trim: true,
    maxlength: [100, 'Category cannot exceed 100 characters']
  },
  experience: {
    type: String,
    required: [true, 'Experience level is required'],
    trim: true,
    maxlength: [50, 'Experience cannot exceed 50 characters']
  },
  salary: {
    type: String,
    trim: true,
    maxlength: [50, 'Salary cannot exceed 50 characters']
  },
  shortDescription: {
    type: String,
    required: [true, 'Short description is required'],
    trim: true,
    maxlength: [200, 'Short description cannot exceed 200 characters']
  },
  fullDescription: {
    type: String,
    required: [true, 'Full description is required'],
    trim: true,
    maxlength: [2000, 'Full description cannot exceed 2000 characters']
  },
  applyLink: {
    type: String,
    required: [true, 'Apply link is required'],
    trim: true,
    validate: {
      validator: function(v) {
        return /^https?:\/\/.+/.test(v);
      },
      message: 'Apply link must be a valid URL starting with http:// or https://'
    }
  },
  vacancyType: {
    type: String,
    required: [true, 'Vacancy type is required'],
    enum: {
      values: ['External', 'Internal'],
      message: 'Vacancy type must be External or Internal'
    },
    default: 'External'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for search functionality
jobSchema.index({ title: 'text', company: 'text', location: 'text', shortDescription: 'text' });

// Indexes for filtering
jobSchema.index({ location: 1 });
jobSchema.index({ jobType: 1 });
jobSchema.index({ category: 1 });
jobSchema.index({ vacancyType: 1 });
jobSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Job', jobSchema);

