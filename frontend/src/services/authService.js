import api from './api';

export const authService = {
  login: async (username, password) => {
    const response = await api.post('/admin/login', { username, password });
    return response.data;
  },

  register: async (userData) => {
    const response = await api.post('/admin/register', userData);
    return response.data;
  },

  getProfile: async () => {
    const response = await api.get('/admin/profile');
    return response.data;
  },

  updateProfile: async (profileData) => {
    const response = await api.put('/admin/profile', profileData);
    return response.data;
  },

  changePassword: async (currentPassword, newPassword) => {
    const response = await api.put('/admin/change-password', {
      currentPassword,
      newPassword
    });
    return response.data;
  }
};

