import React from 'react';
import { FaTimes, FaBuilding, FaMapMarkerAlt, FaTag, FaClock, FaUserTie, FaCalendar, FaExternalLinkAlt } from 'react-icons/fa';
import { formatDateLong } from '../../utils/formatDate';
import { formatJobDescription } from '../../utils/formatDescription';
import { JOB_TYPE_COLORS, VACANCY_TYPE_COLORS } from '../../utils/constants';

const JobModal = ({ job, isOpen, onClose }) => {
  if (!isOpen || !job) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl sm:rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] sm:max-h-[95vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Gradient */}
        <div className="sticky top-0 bg-gradient-to-r from-orange-500 to-purple-600 px-4 sm:px-6 py-4 sm:py-5 flex items-center justify-between z-10 rounded-t-xl sm:rounded-t-2xl">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white pr-4 flex-1">{job.title}</h2>
          <button
            onClick={onClose}
            className="p-2 text-white hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors flex-shrink-0"
            aria-label="Close modal"
          >
            <FaTimes className="text-lg sm:text-xl" />
          </button>
        </div>

        {/* Content */}
        <div className="px-4 sm:px-6 py-4 sm:py-6">
          {/* Job Information */}
          <div className="mb-6 sm:mb-8">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-5">Job Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              <div className="flex items-start space-x-3 p-3 sm:p-4 bg-orange-50 rounded-lg border border-orange-100">
                <div className="flex-shrink-0">
                  <FaBuilding className="text-orange-500 text-lg sm:text-xl mt-0.5" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-xs sm:text-sm text-gray-600 block mb-1">Company</span>
                  <span className="text-sm sm:text-base text-gray-900 font-medium break-words">{job.company}</span>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 sm:p-4 bg-purple-50 rounded-lg border border-purple-100">
                <div className="flex-shrink-0">
                  <FaMapMarkerAlt className="text-purple-500 text-lg sm:text-xl mt-0.5" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-xs sm:text-sm text-gray-600 block mb-1">Location</span>
                  <span className="text-sm sm:text-base text-gray-900 font-medium break-words">{job.location}</span>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 sm:p-4 bg-blue-50 rounded-lg border border-blue-100">
                <div className="flex-shrink-0">
                  <FaTag className="text-blue-500 text-lg sm:text-xl mt-0.5" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-xs sm:text-sm text-gray-600 block mb-1">Category</span>
                  <span className="text-sm sm:text-base text-gray-900 font-medium break-words">{job.category}</span>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 sm:p-4 bg-indigo-50 rounded-lg border border-indigo-100">
                <div className="flex-shrink-0">
                  <FaClock className="text-indigo-500 text-lg sm:text-xl mt-0.5" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-xs sm:text-sm text-gray-600 block mb-1">Job Type</span>
                  <span className={`inline-block px-2.5 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${JOB_TYPE_COLORS[job.jobType] || 'bg-gray-100 text-gray-800'}`}>
                    {job.jobType}
                  </span>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 sm:p-4 bg-teal-50 rounded-lg border border-teal-100">
                <div className="flex-shrink-0">
                  <FaTag className="text-teal-500 text-lg sm:text-xl mt-0.5" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-xs sm:text-sm text-gray-600 block mb-1">Vacancy Type</span>
                  <span className={`inline-block px-2.5 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${VACANCY_TYPE_COLORS[job.vacancyType] || 'bg-gray-100 text-gray-800'}`}>
                    {job.vacancyType}
                  </span>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 sm:p-4 bg-pink-50 rounded-lg border border-pink-100">
                <div className="flex-shrink-0">
                  <FaUserTie className="text-pink-500 text-lg sm:text-xl mt-0.5" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-xs sm:text-sm text-gray-600 block mb-1">Experience</span>
                  <span className="text-sm sm:text-base text-gray-900 font-medium break-words">{job.experience}</span>
                </div>
              </div>
              {job.salary && (
                <div className="flex items-start space-x-3 p-3 sm:p-4 bg-green-50 rounded-lg border border-green-100">
                  <div className="flex-shrink-0">
                    <span className="text-green-500 text-lg sm:text-xl mt-0.5 font-semibold">₹</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-xs sm:text-sm text-gray-600 block mb-1">Salary</span>
                    <span className="text-sm sm:text-base text-gray-900 font-medium break-words">{job.salary}</span>
                  </div>
                </div>
              )}
              <div className="flex items-start space-x-3 p-3 sm:p-4 bg-cyan-50 rounded-lg border border-cyan-100">
                <div className="flex-shrink-0">
                  <FaCalendar className="text-cyan-500 text-lg sm:text-xl mt-0.5" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-xs sm:text-sm text-gray-600 block mb-1">Posted On</span>
                  <span className="text-sm sm:text-base text-gray-900 font-medium break-words">{formatDateLong(job.createdAt)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Full Description */}
          <div className="mb-6 sm:mb-8">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-5">Job Description</h3>
            <div className="bg-gray-50 rounded-lg border border-gray-200 p-4 sm:p-6">
              <div
                className="text-gray-700 text-sm sm:text-base leading-relaxed prose prose-sm sm:prose-base max-w-none
                  prose-headings:text-gray-900 prose-headings:font-semibold prose-headings:mt-4 prose-headings:mb-2
                  prose-p:mb-3 prose-p:leading-relaxed
                  prose-strong:text-gray-900 prose-strong:font-semibold
                  prose-ul:list-disc prose-ul:ml-5 prose-ul:mb-3 prose-ul:space-y-1
                  prose-li:text-gray-700 prose-li:leading-relaxed
                  prose-a:text-orange-600 prose-a:no-underline hover:prose-a:underline"
                dangerouslySetInnerHTML={{ __html: formatJobDescription(job.fullDescription) }}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 sm:pt-5 border-t border-gray-200">
            <a
              href={job.applyLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center space-x-2 bg-gradient-to-r from-orange-500 to-purple-600 text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl text-sm sm:text-base"
            >
              <span>Apply Now</span>
              <FaExternalLinkAlt className="text-xs sm:text-sm" />
            </a>
            <button
              onClick={onClose}
              className="flex items-center justify-center space-x-2 border-2 border-gray-300 text-gray-700 px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors text-sm sm:text-base"
            >
              <FaTimes className="text-xs sm:text-sm" />
              <span>Close</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobModal;

