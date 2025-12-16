import React from 'react';
import { FaBriefcase, FaClock, FaBuilding, FaMapMarkerAlt } from 'react-icons/fa';

const StatsCards = ({ stats }) => {
  const statItems = [
    {
      icon: FaBriefcase,
      value: stats.totalJobs || 0,
      label: 'Total Jobs',
      color: 'from-orange-500 to-orange-600'
    },
    {
      icon: FaClock,
      value: stats.recentJobs || 0,
      label: 'This Week',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: FaBuilding,
      value: stats.totalCompanies || 0,
      label: 'Companies',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: FaMapMarkerAlt,
      value: stats.totalLocations || 0,
      label: 'Locations',
      color: 'from-green-500 to-green-600'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-3 sm:mb-4 md:mb-5">
      {statItems.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-3 sm:p-4 md:p-6 border border-gray-100"
          >
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-0.5 sm:mb-1">{stat.value}</h3>
                <p className="text-xs sm:text-sm md:text-base text-gray-600 truncate">{stat.label}</p>
              </div>
              <div className={`bg-gradient-to-r ${stat.color} p-2 sm:p-3 md:p-4 rounded-lg flex-shrink-0 ml-2`}>
                <Icon className="text-white text-base sm:text-lg md:text-2xl" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StatsCards;

