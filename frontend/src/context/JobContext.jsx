import React, { createContext, useContext, useState, useCallback, useRef } from 'react';
import { jobService } from '../services/jobService';

const JobContext = createContext();

export const useJobs = () => {
  const context = useContext(JobContext);
  if (!context) {
    throw new Error('useJobs must be used within a JobProvider');
  }
  return context;
};

export const JobProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState(null);
  const [stats, setStats] = useState({
    totalJobs: 0,
    recentJobs: 0,
    totalCompanies: 0,
    totalLocations: 0
  });
  const fetchingRef = useRef(false);

  const fetchJobs = useCallback(async (params = {}) => {
    // Prevent multiple simultaneous requests
    if (fetchingRef.current) {
      return;
    }
    
    fetchingRef.current = true;
    setLoading(true);
    try {
      const data = await jobService.getJobs(params);
      setJobs(data.jobs || []);
      setPagination(data.pagination || null);
      return data;
    } catch (error) {
      console.error('Error fetching jobs:', error);
      // Don't throw on network errors to prevent infinite loops
      if (error.code === 'ERR_NETWORK' || error.message === 'Network Error') {
        console.warn('Network error - stopping request loop');
        return { jobs: [], pagination: null };
      }
      throw error;
    } finally {
      setLoading(false);
      fetchingRef.current = false;
    }
  }, []);

  const fetchJobById = async (id) => {
    try {
      const job = await jobService.getJobById(id);
      return job;
    } catch (error) {
      console.error('Error fetching job:', error);
      throw error;
    }
  };

  const createJob = async (jobData) => {
    try {
      const data = await jobService.createJob(jobData);
      return data;
    } catch (error) {
      console.error('Error creating job:', error);
      throw error;
    }
  };

  const updateJob = async (id, jobData) => {
    try {
      const data = await jobService.updateJob(id, jobData);
      return data;
    } catch (error) {
      console.error('Error updating job:', error);
      throw error;
    }
  };

  const deleteJob = async (id) => {
    try {
      const data = await jobService.deleteJob(id);
      return data;
    } catch (error) {
      console.error('Error deleting job:', error);
      throw error;
    }
  };

  const updateStats = useCallback(async () => {
    try {
      const data = await jobService.getJobs({ pageSize: 1000 });
      const allJobs = data.jobs || [];
      
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      const recentJobs = allJobs.filter(job => new Date(job.createdAt) >= oneWeekAgo);
      
      const companies = new Set(allJobs.map(job => job.company));
      const locations = new Set(allJobs.map(job => job.location));
      
      setStats({
        totalJobs: allJobs.length,
        recentJobs: recentJobs.length,
        totalCompanies: companies.size,
        totalLocations: locations.size
      });
    } catch (error) {
      console.error('Error updating stats:', error);
      // Don't retry on network errors
      if (error.code === 'ERR_NETWORK' || error.message === 'Network Error') {
        console.warn('Network error - skipping stats update');
      }
    }
  }, []);

  const value = {
    jobs,
    loading,
    pagination,
    stats,
    fetchJobs,
    fetchJobById,
    createJob,
    updateJob,
    deleteJob,
    updateStats
  };

  return <JobContext.Provider value={value}>{children}</JobContext.Provider>;
};

