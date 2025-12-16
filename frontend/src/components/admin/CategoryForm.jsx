import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FaTimes } from 'react-icons/fa';

const CategoryForm = ({ isOpen, onClose, category, onSubmit }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: category || {
      name: '',
      icon: 'FaThLarge',
      color: 'bg-gray-100 text-gray-800'
    }
  });

  useEffect(() => {
    if (category) {
      reset(category);
    } else {
      reset({
        name: '',
        icon: 'FaThLarge',
        color: 'bg-gray-100 text-gray-800'
      });
    }
  }, [category, reset]);

  if (!isOpen) return null;

  const handleFormSubmit = (data) => {
    onSubmit(data);
  };

  const colorOptions = [
    { value: 'bg-blue-100 text-blue-800', label: 'Blue' },
    { value: 'bg-green-100 text-green-800', label: 'Green' },
    { value: 'bg-orange-100 text-orange-800', label: 'Orange' },
    { value: 'bg-purple-100 text-purple-800', label: 'Purple' },
    { value: 'bg-pink-100 text-pink-800', label: 'Pink' },
    { value: 'bg-indigo-100 text-indigo-800', label: 'Indigo' },
    { value: 'bg-teal-100 text-teal-800', label: 'Teal' },
    { value: 'bg-cyan-100 text-cyan-800', label: 'Cyan' },
    { value: 'bg-gray-100 text-gray-800', label: 'Gray' }
  ];

  const iconOptions = [
    { value: 'FaThLarge', label: 'Grid' },
    { value: 'FaCogs', label: 'Cogs' },
    { value: 'FaCode', label: 'Code' },
    { value: 'FaChartLine', label: 'Chart' },
    { value: 'FaBriefcase', label: 'Briefcase' },
    { value: 'FaLaptop', label: 'Laptop' },
    { value: 'FaDatabase', label: 'Database' },
    { value: 'FaServer', label: 'Server' }
  ];

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-3 sm:p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl sm:rounded-2xl shadow-2xl max-w-md w-full mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white border-b border-gray-200 px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between z-10">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
            {category ? 'Edit Category' : 'Add New Category'}
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
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category Name *
              </label>
              <input
                {...register('name', {
                  required: 'Category name is required',
                  maxLength: { value: 100, message: 'Category name cannot exceed 100 characters' }
                })}
                className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all text-sm sm:text-base ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="e.g., Machine Learning"
                maxLength={100}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Icon
              </label>
              <select
                {...register('icon')}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all text-sm sm:text-base"
              >
                {iconOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Color
              </label>
              <select
                {...register('color')}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all text-sm sm:text-base"
              >
                {colorOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6">
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
              {category ? 'Update Category' : 'Create Category'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryForm;

