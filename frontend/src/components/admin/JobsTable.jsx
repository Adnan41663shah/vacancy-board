import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { formatDate } from '../../utils/formatDate';
import { JOB_TYPE_COLORS, VACANCY_TYPE_COLORS, CATEGORY_COLORS } from '../../utils/constants';
import Loading from '../common/Loading';
import EmptyState from '../common/EmptyState';

const JobsTable = ({ jobs, loading, onEdit, onDelete, isMobile = false }) => {
  if (loading) {
    return <Loading message="Loading jobs..." />;
  }

  if (jobs.length === 0) {
    return <EmptyState icon="inbox" title="No jobs found" message="Try adjusting your search criteria or add a new job posting." />;
  }

  if (isMobile) {
    return (
      <div className="space-y-3 sm:space-y-4 md:hidden">
        {jobs.map((job) => (
          <div key={job._id} className="bg-white rounded-xl shadow-md p-3 sm:p-4 border border-gray-100">
            <div className="flex justify-between items-start mb-2 sm:mb-3 gap-2">
              <h3 className="font-semibold text-sm sm:text-base text-gray-900 flex-1 break-words">{job.title}</h3>
              <div className="flex space-x-1 sm:space-x-2 flex-shrink-0">
                <button
                  onClick={() => onEdit(job._id)}
                  className="p-1.5 sm:p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  aria-label="Edit job"
                >
                  <FaEdit className="text-sm sm:text-base" />
                </button>
                <button
                  onClick={() => onDelete(job._id, job.title)}
                  className="p-1.5 sm:p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  aria-label="Delete job"
                >
                  <FaTrash className="text-sm sm:text-base" />
                </button>
              </div>
            </div>
            <div className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
              <div className="flex flex-wrap gap-1">
                <span className="text-gray-500">Company:</span>
                <span className="text-gray-900 break-words">{job.company}</span>
              </div>
              <div className="flex flex-wrap gap-1">
                <span className="text-gray-500">Location:</span>
                <span className="text-gray-900 break-words">{job.location}</span>
              </div>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                <span className={`px-2 py-0.5 sm:py-1 rounded-full text-xs ${CATEGORY_COLORS[job.category] || 'bg-gray-100'}`}>
                  {job.category}
                </span>
                <span className={`px-2 py-0.5 sm:py-1 rounded-full text-xs ${JOB_TYPE_COLORS[job.jobType] || 'bg-gray-100'}`}>
                  {job.jobType}
                </span>
                <span className={`px-2 py-0.5 sm:py-1 rounded-full text-xs ${VACANCY_TYPE_COLORS[job.vacancyType] || 'bg-gray-100'}`}>
                  {job.vacancyType}
                </span>
              </div>
              <div className="flex flex-wrap gap-1">
                <span className="text-gray-500">Posted:</span>
                <span className="text-gray-900">{formatDate(job.createdAt)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="hidden md:block overflow-x-auto">
      <table className="w-full bg-white rounded-xl shadow-md border border-gray-100 table-fixed">
        <thead className="bg-gray-50 border-b-2 border-gray-300">
          <tr>
            <th className="px-3 py-3 text-left text-sm font-semibold text-gray-900 w-[20%]">Job Title</th>
            <th className="px-3 py-3 text-left text-sm font-semibold text-gray-900 w-[12%]">Company</th>
            <th className="px-3 py-3 text-left text-sm font-semibold text-gray-900 w-[12%]">Location</th>
            <th className="px-3 py-3 text-left text-sm font-semibold text-gray-900 w-[12%]">Category</th>
            <th className="px-3 py-3 text-left text-sm font-semibold text-gray-900 w-[10%]">Type</th>
            <th className="px-3 py-3 text-left text-sm font-semibold text-gray-900 w-[12%]">Vacancy Type</th>
            <th className="px-3 py-3 text-left text-sm font-semibold text-gray-900 w-[12%]">Posted Date</th>
            <th className="px-3 py-3 text-left text-sm font-semibold text-gray-900 w-[10%]">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {jobs.map((job) => (
            <tr key={job._id} className="hover:bg-gray-50 transition-colors">
              <td className="px-3 py-3 text-sm font-medium text-gray-900 truncate" title={job.title}>{job.title}</td>
              <td className="px-3 py-3 text-sm text-gray-700 truncate" title={job.company}>{job.company}</td>
              <td className="px-3 py-3 text-sm text-gray-700 truncate" title={job.location}>{job.location}</td>
              <td className="px-3 py-3">
                <span className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${CATEGORY_COLORS[job.category] || 'bg-gray-100'}`}>
                  {job.category}
                </span>
              </td>
              <td className="px-3 py-3">
                <span className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${JOB_TYPE_COLORS[job.jobType] || 'bg-gray-100'}`}>
                  {job.jobType}
                </span>
              </td>
              <td className="px-3 py-3">
                <span className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${VACANCY_TYPE_COLORS[job.vacancyType] || 'bg-gray-100'}`}>
                  {job.vacancyType}
                </span>
              </td>
              <td className="px-3 py-3 text-sm text-gray-700 whitespace-nowrap">{formatDate(job.createdAt)}</td>
              <td className="px-3 py-3">
                <div className="flex space-x-2">
                  <button
                    onClick={() => onEdit(job._id)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    aria-label="Edit job"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => onDelete(job._id, job.title)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    aria-label="Delete job"
                  >
                    <FaTrash />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default JobsTable;

