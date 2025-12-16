import api from './api';

export const jobService = {
  getJobs: async (params = {}) => {
    const response = await api.get('/jobs', { params });
    return response.data;
  },

  getJobById: async (id) => {
    const response = await api.get(`/jobs/${id}`);
    return response.data;
  },

  createJob: async (jobData) => {
    const response = await api.post('/jobs', jobData);
    return response.data;
  },

  updateJob: async (id, jobData) => {
    const response = await api.put(`/jobs/${id}`, jobData);
    return response.data;
  },

  deleteJob: async (id) => {
    const response = await api.delete(`/jobs/${id}`);
    return response.data;
  },

  exportJobs: async (filters = {}) => {
    const params = {};
    if (filters.search) params.search = filters.search;
    if (filters.location) params.location = filters.location;
    if (filters.type) params.type = filters.type;
    if (filters.category) params.category = filters.category;
    if (filters.vacancyType) params.vacancyType = filters.vacancyType;
    
    const response = await api.get('/admin/jobs/export', {
      params,
      responseType: 'blob'
    });
    return response.data;
  }
};

