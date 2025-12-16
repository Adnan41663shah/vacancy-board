import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useJobs } from '../context/JobContext';
import AdminHeader from '../components/admin/AdminHeader';
import AdminSidebar from '../components/admin/AdminSidebar';
import Footer from '../components/common/Footer';
import StatsCards from '../components/admin/StatsCards';
import JobsTable from '../components/admin/JobsTable';
import JobForm from '../components/admin/JobForm';
import CategoryForm from '../components/admin/CategoryForm';
import DeleteModal from '../components/admin/DeleteModal';
import Pagination from '../components/common/Pagination';
import { useDebounce } from '../hooks/useDebounce';
import { jobService } from '../services/jobService';
import { categoryService } from '../services/categoryService';
import { toast } from 'react-toastify';
import { FaPlus, FaDownload, FaSearch, FaBook } from 'react-icons/fa';
import { JOB_TYPES, VACANCY_TYPES } from '../utils/constants';

const AdminDashboard = () => {
  const { admin, isAuthenticated, loading: authLoading } = useAuth();
  const { jobs, loading, pagination, stats, fetchJobs, createJob, updateJob, deleteJob, updateStats } = useJobs();
  
  const [showJobForm, setShowJobForm] = useState(false);
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDeleteCategoryModal, setShowDeleteCategoryModal] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);
  const [jobToDelete, setJobToDelete] = useState(null);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
    location: '',
    type: '',
    category: '',
    vacancyType: ''
  });
  const [locations, setLocations] = useState([]);
  const [categoryCounts, setCategoryCounts] = useState({
    all: 0,
    devops: 0,
    fullstack: 0,
    datascience: 0
  });
  const [currentPage, setCurrentPage] = useState(1);

  const debouncedSearch = useDebounce(filters.search, 300);

  useEffect(() => {
    if (isAuthenticated) {
      updateStats();
      fetchCategories();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  const fetchCategories = async () => {
    try {
      const data = await categoryService.getCategories();
      setCategories(data.categories || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
      toast.error('Failed to load categories');
    }
  };

  useEffect(() => {
    const loadLocations = async () => {
      try {
        const data = await jobService.getJobs({ pageSize: 1000 });
        const uniqueLocations = [...new Set(data.jobs.map(job => job.location))].sort();
        setLocations(uniqueLocations);
      } catch (error) {
        console.error('Error fetching locations:', error);
      }
    };
    loadLocations();
  }, []);

  useEffect(() => {
    if (!isAuthenticated || categories.length === 0) return;
    
    const updateCounts = async () => {
      try {
        const data = await jobService.getJobs({ pageSize: 1000 });
        const allJobs = data.jobs;
        const counts = {
          all: allJobs.length
        };
        
        // Count jobs for each category
        categories.forEach(cat => {
          const key = cat.name.toLowerCase().replace(/\s+/g, '');
          counts[key] = allJobs.filter(job => job.category === cat.name).length;
        });
        
        setCategoryCounts(counts);
      } catch (error) {
        console.error('Error updating category counts:', error);
      }
    };
    updateCounts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, categories]);

  useEffect(() => {
    if (!isAuthenticated) return;
    
    const params = {
      page: currentPage,
      pageSize: 10,
      search: debouncedSearch,
      location: filters.location,
      type: filters.type,
      category: filters.category,
      vacancyType: filters.vacancyType
    };
    fetchJobs(params);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch, filters.location, filters.type, filters.category, filters.vacancyType, currentPage, isAuthenticated]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const handleCategoryChange = (category) => {
    setFilters(prev => ({ ...prev, category }));
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setFilters({
      search: '',
      location: '',
      type: '',
      category: '',
      vacancyType: ''
    });
    setCurrentPage(1);
  };

  const handleAddJob = () => {
    setEditingJob(null);
    setShowJobForm(true);
  };

  const handleAddCategory = () => {
    setEditingCategory(null);
    setShowCategoryForm(true);
  };

  const handleCategorySubmit = async (categoryData) => {
    try {
      if (editingCategory) {
        await categoryService.updateCategory(editingCategory._id, categoryData);
        toast.success('Category updated successfully!');
      } else {
        await categoryService.createCategory(categoryData);
        toast.success('Category created successfully!');
      }
      setShowCategoryForm(false);
      setEditingCategory(null);
      await fetchCategories();
      // Update category counts
      const data = await jobService.getJobs({ pageSize: 1000 });
      const allJobs = data.jobs;
      const newCategoryCounts = {
        all: allJobs.length
      };
      const updatedCategories = await categoryService.getCategories();
      updatedCategories.categories.forEach(cat => {
        const key = cat.name.toLowerCase().replace(/\s+/g, '');
        newCategoryCounts[key] = allJobs.filter(job => job.category === cat.name).length;
      });
      setCategoryCounts(newCategoryCounts);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save category');
    }
  };

  const handleDeleteCategory = (category) => {
    setCategoryToDelete(category);
    setShowDeleteCategoryModal(true);
  };

  const handleConfirmDeleteCategory = async () => {
    try {
      const response = await categoryService.deleteCategory(categoryToDelete._id);
      const jobsCount = response.jobsUsingCategory || 0;
      const deletedCategoryName = categoryToDelete.name;
      
      toast.success(
        jobsCount > 0 
          ? `Category deleted successfully! Note: ${jobsCount} job(s) still use this category name.`
          : 'Category deleted successfully!'
      );
      
      setShowDeleteCategoryModal(false);
      setCategoryToDelete(null);
      
      // Clear category filter if deleted category was selected
      if (filters.category === deletedCategoryName) {
        setFilters(prev => ({ ...prev, category: '' }));
        setCurrentPage(1);
      }
      
      // Refresh categories and counts
      await fetchCategories();
      const data = await jobService.getJobs({ pageSize: 1000 });
      const allJobs = data.jobs;
      const updatedCategories = await categoryService.getCategories();
      const newCategoryCounts = {
        all: allJobs.length
      };
      updatedCategories.categories.forEach(cat => {
        const key = cat.name.toLowerCase().replace(/\s+/g, '');
        newCategoryCounts[key] = allJobs.filter(job => job.category === cat.name).length;
      });
      setCategoryCounts(newCategoryCounts);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete category');
    }
  };

  const handleEditJob = async (jobId) => {
    try {
      const job = await jobService.getJobById(jobId);
      setEditingJob(job);
      setShowJobForm(true);
    } catch (error) {
      toast.error('Failed to load job details');
    }
  };

  const handleDeleteJob = (jobId, jobTitle) => {
    setJobToDelete({ id: jobId, title: jobTitle });
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteJob(jobToDelete.id);
      toast.success('Job deleted successfully!');
      setShowDeleteModal(false);
      setJobToDelete(null);
      updateStats();
      fetchJobs({
        page: currentPage,
        pageSize: 10,
        ...filters
      });
    } catch (error) {
      toast.error('Failed to delete job');
    }
  };

  const handleJobSubmit = async (jobData) => {
    try {
      if (editingJob) {
        await updateJob(editingJob._id, jobData);
        toast.success('Job updated successfully!');
      } else {
        await createJob(jobData);
        toast.success('Job created successfully!');
      }
      setShowJobForm(false);
      setEditingJob(null);
      updateStats();
      fetchJobs({
        page: currentPage,
        pageSize: 10,
        ...filters
      });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save job');
    }
  };

  const handleExport = async () => {
    try {
      // Pass current filters to export function (use same filters as displayed jobs)
      const exportFilters = {
        search: debouncedSearch,
        location: filters.location,
        type: filters.type,
        category: filters.category,
        vacancyType: filters.vacancyType
      };
      
      const blob = await jobService.exportJobs(exportFilters);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      
      // Generate filename based on active filters
      let filename = `cloudblitz-jobs-${new Date().toISOString().split('T')[0]}`;
      const filterParts = [];
      if (exportFilters.search) filterParts.push('search');
      if (exportFilters.location) filterParts.push(exportFilters.location.replace(/[^a-zA-Z0-9]/g, '-'));
      if (exportFilters.type) filterParts.push(exportFilters.type);
      if (exportFilters.category) filterParts.push(exportFilters.category.replace(/[^a-zA-Z0-9]/g, '-'));
      if (exportFilters.vacancyType) filterParts.push(exportFilters.vacancyType);
      
      if (filterParts.length > 0) {
        filename += '-' + filterParts.join('-');
      }
      filename += '.csv';
      
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      const filterCount = Object.values(exportFilters).filter(f => f).length;
      if (filterCount > 0) {
        toast.success(`Exported ${jobs.length} job(s) with applied filters!`);
      } else {
        toast.success('All jobs exported successfully!');
      }
    } catch (error) {
      toast.error('Failed to export jobs');
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600 text-sm sm:text-base">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-orange-100/60 via-green-100/60 to-purple-100/90">
      <AdminHeader />
      
      <div className="max-w-[95rem] mx-auto px-3 sm:px-4 md:px-6 lg:px-8 pt-20 sm:pt-24 md:pt-28 pb-3 sm:pb-4 md:pb-6">
        <div className="flex flex-col lg:flex-row gap-3 sm:gap-4 lg:gap-6">
          {/* Sidebar - Desktop */}
          <AdminSidebar
            categories={categoryCounts}
            activeCategory={filters.category}
            onCategoryChange={handleCategoryChange}
            categoryList={categories}
            onDeleteCategory={handleDeleteCategory}
          />

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Stats */}
            <StatsCards stats={stats} />

            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-3 sm:gap-4 border-b-2 border-gray-300 pb-2">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-900">Manage Job Postings</h2>
              <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-2 sm:gap-2.5">
                <button
                  onClick={handleAddCategory}
                  className="flex items-center justify-center space-x-1.5 sm:space-x-2 border-2 border-purple-300 text-purple-700 bg-purple-50 px-2.5 sm:px-3 md:px-4 py-2 sm:py-2.5 rounded-lg font-semibold hover:bg-purple-100 transition-colors text-xs sm:text-sm"
                >
                  <FaBook className="text-xs sm:text-sm" />
                  <span className="hidden sm:inline">New Course</span>
                  <span className="sm:hidden">Category</span>
                </button>
                <button
                  onClick={handleAddJob}
                  className="flex items-center justify-center space-x-1.5 sm:space-x-2 bg-gradient-to-r from-orange-500 to-purple-600 text-white px-2.5 sm:px-3 md:px-4 py-2 sm:py-2.5 rounded-lg font-semibold hover:from-orange-600 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl text-xs sm:text-sm"
                >
                  <FaPlus className="text-xs sm:text-sm" />
                  <span>Add New Job</span>
                </button>
                <button
                  onClick={handleExport}
                  className="flex items-center justify-center space-x-1.5 sm:space-x-2 border-2 border-gray-300 text-gray-700 px-2.5 sm:px-3 md:px-4 py-2 sm:py-2.5 rounded-lg font-semibold hover:bg-gray-50 transition-colors text-xs sm:text-sm"
                >
                  <FaDownload className="text-xs sm:text-sm" />
                  <span className="hidden sm:inline">Export CSV</span>
                </button>
              </div>
            
            </div>
            

            {/* Search and Filters */}
            <div className="bg-white rounded-xl shadow-md p-3 sm:p-4 md:p-6 mb-3 sm:mb-4 md:mb-5">
              <div className="space-y-3 sm:space-y-4">
                <div className="relative">
                  <FaSearch className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={filters.search}
                    onChange={(e) => handleFilterChange('search', e.target.value)}
                    placeholder="Search jobs..."
                    className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all text-sm sm:text-base"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-wrap gap-2 sm:gap-3">
                  <select
                    value={filters.location}
                    onChange={(e) => handleFilterChange('location', e.target.value)}
                    className="flex-1 min-w-0 sm:min-w-[150px] px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none text-sm sm:text-base"
                  >
                    <option value="">All Locations</option>
                    {locations.map((location) => (
                      <option key={location} value={location}>
                        {location}
                      </option>
                    ))}
                  </select>

                  <select
                    value={filters.type}
                    onChange={(e) => handleFilterChange('type', e.target.value)}
                    className="flex-1 min-w-0 sm:min-w-[150px] px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none text-sm sm:text-base"
                  >
                    <option value="">All Types</option>
                    {JOB_TYPES.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>

                  <select
                    value={filters.category}
                    onChange={(e) => handleFilterChange('category', e.target.value)}
                    className="flex-1 min-w-0 sm:min-w-[150px] px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none text-sm sm:text-base"
                  >
                    <option value="">All Categories</option>
                    {categories.map((cat) => (
                      <option key={cat._id} value={cat.name}>
                        {cat.name}
                      </option>
                    ))}
                  </select>

                  <select
                    value={filters.vacancyType}
                    onChange={(e) => handleFilterChange('vacancyType', e.target.value)}
                    className="flex-1 min-w-0 sm:min-w-[150px] px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none text-sm sm:text-base"
                  >
                    <option value="">All Vacancy Types</option>
                    {VACANCY_TYPES.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Jobs Table */}
            <div className="bg-white rounded-xl shadow-md p-3 sm:p-4 md:p-6">
              {loading ? (
                <div className="flex items-center justify-center py-8 sm:py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
                </div>
              ) : jobs.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8 sm:py-12 px-4">
                  <div className="text-6xl text-gray-300 mb-4">
                    <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                    No jobs found{filters.category ? ` for ${filters.category}` : ''}
                  </h3>
                  <p className="text-gray-600 text-center max-w-md">
                    Try adjusting your search criteria or add a new job posting.
                  </p>
                </div>
              ) : (
                <>
                  <JobsTable
                    jobs={jobs}
                    loading={loading}
                    onEdit={handleEditJob}
                    onDelete={handleDeleteJob}
                    isMobile={false}
                  />
                  <JobsTable
                    jobs={jobs}
                    loading={loading}
                    onEdit={handleEditJob}
                    onDelete={handleDeleteJob}
                    isMobile={true}
                  />
                  <Pagination
                    pagination={pagination}
                    onPageChange={handlePageChange}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <JobForm
        isOpen={showJobForm}
        onClose={() => {
          setShowJobForm(false);
          setEditingJob(null);
        }}
        job={editingJob}
        onSubmit={handleJobSubmit}
        categories={categories}
      />

      <CategoryForm
        isOpen={showCategoryForm}
        onClose={() => {
          setShowCategoryForm(false);
          setEditingCategory(null);
        }}
        category={editingCategory}
        onSubmit={handleCategorySubmit}
      />

      <DeleteModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setJobToDelete(null);
        }}
        jobTitle={jobToDelete?.title}
        onConfirm={handleConfirmDelete}
      />

      <DeleteModal
        isOpen={showDeleteCategoryModal}
        onClose={() => {
          setShowDeleteCategoryModal(false);
          setCategoryToDelete(null);
        }}
        jobTitle={categoryToDelete?.name}
        onConfirm={handleConfirmDeleteCategory}
        isCategory={true}
      />

      <Footer />
    </div>
  );
};

export default AdminDashboard;

