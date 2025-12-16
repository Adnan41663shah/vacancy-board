import React from 'react';
import { FaMapMarkerAlt, FaUserTie, FaExternalLinkAlt } from 'react-icons/fa';
import { formatDate } from '../../utils/formatDate';
import { JOB_TYPE_COLORS, VACANCY_TYPE_COLORS } from '../../utils/constants';

const JobCard = ({ job, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="group relative rounded-lg sm:rounded-xl cursor-pointer h-full animate-fadeIn"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
    >
      {/* Gradient border - appears on hover */}
      <div className="absolute -inset-[2px] rounded-lg sm:rounded-xl bg-gradient-to-r from-orange-500 via-purple-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out -z-10"></div>
      
      {/* Card content */}
      <div className="relative bg-white rounded-lg sm:rounded-xl shadow-md group-hover:shadow-xl group-hover:shadow-gray-900/20 transition-all duration-300 ease-in-out p-4 sm:p-6 border border-gray-100 group-hover:border-transparent h-full flex flex-col">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3 sm:mb-4 gap-2 sm:gap-0">
        <div className="flex-1 min-w-0">
          <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 mb-1 break-words">{job.title}</h3>
          <p className="text-sm sm:text-base text-gray-600 truncate">{job.company}</p>
        </div>
        <div className="flex flex-row sm:flex-col gap-2 sm:gap-2 items-start sm:items-end flex-shrink-0">
          <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${JOB_TYPE_COLORS[job.jobType] || 'bg-gray-100 text-gray-800'}`}>
            {job.jobType}
          </span>
          <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${VACANCY_TYPE_COLORS[job.vacancyType] || 'bg-gray-100 text-gray-800'}`}>
            {job.vacancyType}
          </span>
        </div>
      </div>

      <div className="space-y-1.5 sm:space-y-2 mb-3 sm:mb-4 flex-1">
        <div className="flex items-center text-gray-600 text-xs sm:text-sm">
          <FaMapMarkerAlt className="mr-2 text-orange-500 flex-shrink-0 text-xs sm:text-sm" />
          <span className="truncate">{job.location}</span>
        </div>
        <div className="flex items-center text-gray-600 text-xs sm:text-sm">
          <FaUserTie className="mr-2 text-purple-500 flex-shrink-0 text-xs sm:text-sm" />
          <span className="truncate">{job.experience}</span>
        </div>
        {job.salary && (
          <div className="flex items-center text-gray-600 text-xs sm:text-sm">
            <span className="mr-2 text-green-500 font-semibold text-sm sm:text-base flex-shrink-0">₹</span>
            <span className="truncate">{job.salary}</span>
          </div>
        )}
      </div>

      <p className="text-gray-700 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2">{job.shortDescription}</p>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0 pt-3 sm:pt-4 border-t border-gray-100">
        <span className="text-xs text-gray-500">Posted {formatDate(job.createdAt)}</span>
        <a
          href={job.applyLink}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="flex items-center justify-center space-x-1 bg-gradient-to-r from-orange-500 to-purple-600 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold hover:from-orange-600 hover:to-purple-700 transition-all w-full sm:w-auto"
        >
          <span>Apply</span>
          <FaExternalLinkAlt className="text-xs sm:text-sm" size={12} />
        </a>
      </div>
      </div>
    </div>
  );
};

export default JobCard;

