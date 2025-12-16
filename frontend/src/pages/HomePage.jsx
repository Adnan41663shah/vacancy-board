import React, { useState, useEffect } from 'react';
import { useJobs } from '../context/JobContext';
import Header from '../components/common/Header';
import HeroHeader from '../components/common/HeroHeader';
import ConnectSection from '../components/common/ConnectSection';
import Footer from '../components/common/Footer';
import CategorySidebar from '../components/jobs/CategorySidebar';
import JobFilters from '../components/jobs/JobFilters';
import JobGrid from '../components/jobs/JobGrid';
import JobModal from '../components/jobs/JobModal';
import Pagination from '../components/common/Pagination';
import LoginModal from '../components/auth/LoginModal';
import Loading from '../components/common/Loading';
import { useDebounce } from '../hooks/useDebounce';
import { jobService } from '../services/jobService';
import { categoryService } from '../services/categoryService';

const HomePage = () => {
  const { jobs, loading, pagination, fetchJobs, fetchJobById } = useJobs();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    location: '',
    type: '',
    category: '',
    vacancyType: '',
    datePosted: ''
  });
  const [locations, setLocations] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryCounts, setCategoryCounts] = useState({
    all: 0
  });
  const [currentPage, setCurrentPage] = useState(1);

  const debouncedSearch = useDebounce(filters.search, 300);

  // Fetch locations and categories
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const data = await jobService.getJobs({ pageSize: 1000 });
        const uniqueLocations = [...new Set(data.jobs.map(job => job.location))].sort();
        setLocations(uniqueLocations);
      } catch (error) {
        console.error('Error fetching locations:', error);
      }
    };
    
    const fetchCategories = async () => {
      try {
        const data = await categoryService.getCategories();
        setCategories(data.categories || []);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    
    fetchLocations();
    fetchCategories();
  }, []);

  // Update category counts
  useEffect(() => {
    if (categories.length === 0) return;
    
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
  }, [jobs, categories]);

  // Fetch jobs when filters or page change
  useEffect(() => {
    const loadJobs = async () => {
      const params = {
        page: currentPage,
        pageSize: 12,
        search: debouncedSearch,
        location: filters.location,
        type: filters.type,
        category: filters.category,
        vacancyType: filters.vacancyType
      };

      try {
        await fetchJobs(params);
      } catch (error) {
        console.error('Error loading jobs:', error);
      }
    };

    loadJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch, filters.location, filters.type, filters.category, filters.vacancyType, filters.datePosted, currentPage]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const handleCategoryChange = (category) => {
    setFilters(prev => ({ ...prev, category }));
    setCurrentPage(1);
    // Smooth scroll to jobs section only if user has scrolled down
    setTimeout(() => {
      const jobsSection = document.getElementById('jobs-section');
      const scrollPosition = window.scrollY || window.pageYOffset;
      if (jobsSection && scrollPosition > 200) {
        jobsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const handleClearFilters = () => {
    setFilters({
      search: '',
      location: '',
      type: '',
      category: '',
      vacancyType: '',
      datePosted: ''
    });
    setCurrentPage(1);
  };

  const handleJobClick = async (jobId) => {
    try {
      const job = await fetchJobById(jobId);
      setSelectedJob(job);
    } catch (error) {
      console.error('Error fetching job details:', error);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      <Header onAdminClick={() => setShowLoginModal(true)} />
      
      {/* Hero Section */}
      <HeroHeader />

      {/* Connect Section */}
      <ConnectSection />

      {/* Jobs Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 w-full">
        {/* Heading Section */}
        <div className="mb-6 sm:mb-8 text-center">
          <div className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-full bg-gradient-to-r from-orange-100 to-purple-100 mb-4 sm:mb-6">
            <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 bg-orange-500 rounded-full flex-shrink-0"></div>
            <h2 className="text-xs sm:text-sm md:text-base font-bold text-gray-800 uppercase tracking-wide">
              Available Positions
            </h2>
          </div>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            Discover exciting opportunities that match your skills
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-3 sm:gap-4 lg:gap-6 xl:gap-8 items-start w-full">
          {/* Category Sidebar - Mobile */}
          <div className="w-full lg:hidden">
            <CategorySidebar
              categories={categoryCounts}
              activeCategory={filters.category}
              onCategoryChange={handleCategoryChange}
              isMobile={true}
              categoryList={categories}
            />
          </div>

          {/* Category Sidebar - Desktop */}
          <div className="hidden lg:block lg:self-start">
            <CategorySidebar
              categories={categoryCounts}
              activeCategory={filters.category}
              onCategoryChange={handleCategoryChange}
              isMobile={false}
              categoryList={categories}
            />
          </div>

          {/* Main Content */}
          <div className="flex-1 w-full min-w-0">
            <section 
              id="jobs-section" 
              className="mb-4 sm:mb-6 lg:mb-8 transition-all duration-300"
            >
              <JobFilters
                filters={filters}
                onFilterChange={handleFilterChange}
                onClearFilters={handleClearFilters}
                locations={locations}
              />

              <div className="transition-opacity duration-300">
                {loading && jobs.length === 0 ? (
                  <div className="flex items-center justify-center min-h-[400px]">
                    <Loading message="Loading jobs..." />
                  </div>
                ) : jobs.length === 0 ? (
                  <div className="flex items-center justify-center min-h-[400px] py-16 px-4">
                    <div className="flex flex-col items-center justify-center text-center">
                      <div className="text-6xl text-gray-300 mb-4">
                        <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                        </svg>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">
                        No jobs found{filters.category ? ` for ${filters.category}` : ''}
                      </h3>
                      <p className="text-gray-600 text-center max-w-md">
                        Try adjusting your search criteria or check back later for new opportunities.
                      </p>
                    </div>
                  </div>
                ) : (
                  <JobGrid
                    jobs={jobs}
                    loading={loading}
                    onJobClick={handleJobClick}
                  />
                )}
              </div>

              {jobs.length > 0 && (
                <Pagination
                  pagination={pagination}
                  onPageChange={handlePageChange}
                />
              )}
            </section>
          </div>
        </div>
      </div>

      {/* Modals */}
      <JobModal
        job={selectedJob}
        isOpen={!!selectedJob}
        onClose={() => {
          setSelectedJob(null);
        }}
      />

      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />

      <Footer />
    </div>
  );
};

export default HomePage;

