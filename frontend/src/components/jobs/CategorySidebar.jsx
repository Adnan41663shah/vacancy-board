import React from 'react';
import { FaThLarge, FaCogs, FaCode, FaChartLine, FaBriefcase, FaLaptop, FaDatabase, FaServer } from 'react-icons/fa';
import { CATEGORY_COLORS } from '../../utils/constants';

const CategorySidebar = ({ categories: categoryCounts, activeCategory, onCategoryChange, isMobile = false, categoryList = [] }) => {
  // Icon mapping
  const iconMap = {
    'FaThLarge': FaThLarge,
    'FaCogs': FaCogs,
    'FaCode': FaCode,
    'FaChartLine': FaChartLine,
    'FaBriefcase': FaBriefcase,
    'FaLaptop': FaLaptop,
    'FaDatabase': FaDatabase,
    'FaServer': FaServer
  };

  // Build category items from categoryList
  const categoryItems = [
    { id: '', name: 'All Jobs', icon: FaThLarge, count: categoryCounts.all || 0, color: 'bg-gray-100' }
  ];

  categoryList.forEach(cat => {
    const IconComponent = iconMap[cat.icon] || FaThLarge;
    const key = cat.name.toLowerCase().replace(/\s+/g, '');
    categoryItems.push({
      id: cat.name,
      name: cat.name,
      icon: IconComponent,
      count: categoryCounts[key] || 0,
      color: cat.color || 'bg-gray-100 text-gray-800'
    });
  });

  const baseClasses = "w-full flex items-center space-x-3 p-4 rounded-lg transition-all cursor-pointer";
  const activeClasses = "bg-gradient-to-r from-orange-500 to-purple-600 text-white shadow-lg";
  const inactiveClasses = "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200";

  if (isMobile) {
    return (
      <div className="flex overflow-x-auto gap-2 sm:gap-3 pb-2 sm:pb-3 scrollbar-hide md:hidden -mx-4 sm:-mx-6 px-4 sm:px-6">
        {categoryItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeCategory === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onCategoryChange(item.id)}
              className={`flex items-center space-x-1.5 sm:space-x-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg whitespace-nowrap transition-all text-xs sm:text-sm ${
                isActive ? activeClasses : 'bg-white text-gray-700 border border-gray-200'
              }`}
            >
              <Icon className="text-sm sm:text-base flex-shrink-0" />
              <span className="font-medium">{item.name}</span>
              <span className={`px-1.5 sm:px-2 py-0.5 rounded-full text-xs font-semibold flex-shrink-0 ${
                isActive ? 'bg-white bg-opacity-20' : 'bg-gray-100'
              }`}>
                {item.count}
              </span>
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <aside className="hidden lg:block w-64 flex-shrink-0">
      <div className="bg-white rounded-xl shadow-md p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Browse by Category</h3>
        <nav className="space-y-2">
          {categoryItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeCategory === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onCategoryChange(item.id)}
                className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
              >
                <div className={`p-2 rounded-lg ${isActive ? 'bg-white bg-opacity-20' : item.color || CATEGORY_COLORS[item.id] || 'bg-gray-100'}`}>
                  <Icon className={isActive ? 'text-white' : ''} />
                </div>
                <div className="flex-1 text-left">
                  <div className="font-medium">{item.name}</div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  isActive ? 'bg-white bg-opacity-20 text-white' : 'bg-gray-100 text-gray-700'
                }`}>
                  {item.count}
                </span>
              </button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};

export default CategorySidebar;

