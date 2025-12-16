import React from 'react';
import JobCard from './JobCard';
import Loading from '../common/Loading';

const JobGrid = ({ jobs, loading, onJobClick }) => {
  return (
    <div className="relative min-h-[300px] sm:min-h-[400px]">
      {loading && jobs.length > 0 && (
        <div className="absolute inset-0 bg-white/50 backdrop-blur-sm z-10 flex items-center justify-center rounded-lg">
          <Loading message="Loading jobs..." />
        </div>
      )}
      <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 transition-opacity duration-300 ${loading && jobs.length > 0 ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
        {jobs.map((job, index) => (
          <div
            key={job._id}
            style={{
              animationDelay: `${index * 0.05}s`,
            }}
          >
            <JobCard 
              job={job} 
              onClick={() => onJobClick(job._id)} 
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobGrid;

