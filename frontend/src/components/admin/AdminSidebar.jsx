import React from 'react';
import { FaThLarge, FaCogs, FaCode, FaChartLine, FaBriefcase, FaLaptop, FaDatabase, FaServer, FaTrash } from 'react-icons/fa';
import { CATEGORY_COLORS } from '../../utils/constants';

const AdminSidebar = ({ categories: categoryCounts, activeCategory, onCategoryChange, categoryList = [], onDeleteCategory }) => {
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
    { id: '', name: 'All Categories', icon: FaThLarge, count: categoryCounts.all || 0, color: 'bg-gray-100' }
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

  return (
    <>
      {/* Mobile Category Filter - Horizontal Scroll */}
      <div className="lg:hidden mb-4 sm:mb-6">
        <div className="bg-white rounded-xl shadow-md p-3 sm:p-4">
          <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-3">Categories</h3>
          <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-hide">
            {categoryItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeCategory === item.id;
              const canDelete = item.id !== '' && onDeleteCategory; // Don't show delete for "All Categories"
              
              return (
                <div key={item.id} className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => onCategoryChange(item.id)}
                    className={`flex items-center space-x-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg whitespace-nowrap transition-all flex-1 ${
                      isActive
                        ? 'bg-gradient-to-r from-orange-500 to-purple-600 text-white shadow-lg'
                        : 'bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="text-sm sm:text-base" />
                    <span className="font-medium text-xs sm:text-sm">{item.name}</span>
                    <span className={`px-1.5 sm:px-2 py-0.5 rounded-full text-xs font-semibold ${
                      isActive
                        ? 'bg-white bg-opacity-20 text-white'
                        : 'bg-gray-200 text-gray-700'
                    }`}>
                      {item.count}
                    </span>
                  </button>
                  {canDelete && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        const category = categoryList.find(cat => cat.name === item.id);
                        if (category) {
                          onDeleteCategory(category);
                        }
                      }}
                      className="p-1.5 sm:p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
                      aria-label="Delete category"
                      title="Delete category"
                    >
                      <FaTrash className="text-xs sm:text-sm" />
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-72 flex-shrink-0">
        <div className="bg-white rounded-xl shadow-md p-4 sticky top-24">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
          <nav className="space-y-2">
            {categoryItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeCategory === item.id;
              const canDelete = item.id !== '' && onDeleteCategory; // Don't show delete for "All Categories"
              
              return (
                <div key={item.id} className="group relative">
                  <button
                    onClick={() => onCategoryChange(item.id)}
                    className={`w-full flex items-center space-x-3 p-4 rounded-lg transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-orange-500 to-purple-600 text-white shadow-lg'
                        : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                    } ${canDelete ? 'pr-12' : ''}`}
                  >
                    <div className={`p-2 rounded-lg flex-shrink-0 ${
                      isActive
                        ? 'bg-white bg-opacity-20'
                        : item.color || CATEGORY_COLORS[item.id] || 'bg-gray-100'
                    }`}>
                      <Icon className={isActive ? 'text-white' : ''} />
                    </div>
                    <div className="flex-1 text-left min-w-0">
                      <div className="font-medium truncate">{item.name}</div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold flex-shrink-0 ${
                      isActive
                        ? 'bg-white bg-opacity-20 text-white'
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {item.count}
                    </span>
                  </button>
                  {canDelete && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        const category = categoryList.find(cat => cat.name === item.id);
                        if (category) {
                          onDeleteCategory(category);
                        }
                      }}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover:opacity-100 flex-shrink-0 z-10"
                      aria-label="Delete category"
                      title="Delete category"
                    >
                      <FaTrash className="text-sm" />
                    </button>
                  )}
                </div>
              );
            })}
          </nav>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;

