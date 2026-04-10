import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FaTimes } from 'react-icons/fa';
import { JOB_TYPES, VACANCY_TYPES } from '../../utils/constants';

const JobForm = ({ isOpen, onClose, job, onSubmit, categories = [] }) => {
  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm({
    defaultValues: job || {
      vacancyType: 'External'
    }
  });

  const shortDescLength = watch('shortDescription')?.length || 0;
  const fullDescLength = watch('fullDescription')?.length || 0;

  useEffect(() => {
    if (job) {
      reset(job);
    } else {
      reset({
        vacancyType: 'External'
      });
    }
  }, [job, reset]);

  if (!isOpen) return null;

  const handleFormSubmit = (data) => {
    onSubmit(data);
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-3 sm:p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl sm:rounded-2xl shadow-2xl max-w-3xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white border-b border-gray-200 px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between z-10">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
            {job ? 'Edit Job' : 'Add New Job'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
            aria-label="Close modal"
          >
            <FaTimes className="text-lg sm:text-xl" />
          </button>
        </div>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="px-4 sm:px-6 py-4 sm:py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 mb-3 sm:mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Job Title *
              </label>
              <input
                {...register('title', {
                  required: 'Job title is required',
                  maxLength: { value: 100, message: 'Title cannot exceed 100 characters' }
                })}
                className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all text-sm sm:text-base ${
                  errors.title ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="e.g., Senior Software Engineer"
                maxLength={100}
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company *
              </label>
              <input
                {...register('company', {
                  required: 'Company name is required',
                  maxLength: { value: 50, message: 'Company name cannot exceed 50 characters' }
                })}
                className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all text-sm sm:text-base ${
                  errors.company ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="e.g., Job Board"
                maxLength={50}
              />
              {errors.company && (
                <p className="mt-1 text-sm text-red-600">{errors.company.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location *
              </label>
              <input
                {...register('location', {
                  required: 'Location is required',
                  maxLength: { value: 50, message: 'Location cannot exceed 50 characters' }
                })}
                className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all text-sm sm:text-base ${
                  errors.location ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="e.g., Mumbai, India"
                maxLength={50}
              />
              {errors.location && (
                <p className="mt-1 text-sm text-red-600">{errors.location.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Job Type *
              </label>
              <select
                {...register('jobType', { required: 'Job type is required' })}
                className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all text-sm sm:text-base ${
                  errors.jobType ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select Job Type</option>
                {JOB_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              {errors.jobType && (
                <p className="mt-1 text-sm text-red-600">{errors.jobType.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <select
                {...register('category', { required: 'Category is required' })}
                className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all text-sm sm:text-base ${
                  errors.category ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Vacancy Type *
              </label>
              <select
                {...register('vacancyType', { required: 'Vacancy type is required' })}
                className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all text-sm sm:text-base ${
                  errors.vacancyType ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                {VACANCY_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              {errors.vacancyType && (
                <p className="mt-1 text-sm text-red-600">{errors.vacancyType.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Experience *
              </label>
              <input
                {...register('experience', {
                  required: 'Experience is required',
                  maxLength: { value: 50, message: 'Experience cannot exceed 50 characters' }
                })}
                className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all text-sm sm:text-base ${
                  errors.experience ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="e.g., 3-5 years"
                maxLength={50}
              />
              {errors.experience && (
                <p className="mt-1 text-sm text-red-600">{errors.experience.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Salary (Optional)
              </label>
              <input
                {...register('salary', {
                  maxLength: { value: 50, message: 'Salary cannot exceed 50 characters' }
                })}
                className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all text-sm sm:text-base ${
                  errors.salary ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="e.g., $60,000 - $80,000"
                maxLength={50}
              />
              {errors.salary && (
                <p className="mt-1 text-sm text-red-600">{errors.salary.message}</p>
              )}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Short Description *
            </label>
            <textarea
              {...register('shortDescription', {
                required: 'Short description is required',
                maxLength: { value: 200, message: 'Short description cannot exceed 200 characters' }
              })}
              rows={3}
              className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all text-sm sm:text-base ${
                errors.shortDescription ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Brief description of the role (max 200 characters)"
              maxLength={200}
            />
            <div className="flex justify-between items-center mt-1">
              {errors.shortDescription && (
                <p className="text-sm text-red-600">{errors.shortDescription.message}</p>
              )}
              <span className="text-sm text-gray-500 ml-auto">{shortDescLength}/200</span>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Description *
            </label>
            <textarea
              {...register('fullDescription', {
                required: 'Full description is required',
                maxLength: { value: 2000, message: 'Full description cannot exceed 2000 characters' }
              })}
              rows={8}
              className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all text-sm sm:text-base ${
                errors.fullDescription ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Detailed job description, responsibilities, and requirements"
              maxLength={2000}
            />
            <div className="flex justify-between items-center mt-1">
              {errors.fullDescription && (
                <p className="text-sm text-red-600">{errors.fullDescription.message}</p>
              )}
              <span className="text-sm text-gray-500 ml-auto">{fullDescLength}/2000</span>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Apply Link *
            </label>
            <input
              {...register('applyLink', {
                required: 'Apply link is required',
                pattern: {
                  value: /^https?:\/\/.+/,
                  message: 'Apply link must be a valid URL starting with http:// or https://'
                }
              })}
              type="url"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all ${
                errors.applyLink ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="https://example.com/apply"
            />
            {errors.applyLink && (
              <p className="mt-1 text-sm text-red-600">{errors.applyLink.message}</p>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border-2 border-gray-300 text-gray-700 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors text-sm sm:text-base"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-orange-500 to-purple-600 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl text-sm sm:text-base"
            >
              {job ? 'Update Job' : 'Save Job'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobForm;

