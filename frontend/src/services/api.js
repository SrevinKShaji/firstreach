import axios from 'axios';

const API_LEADS = '/api/leads';
const API_ADMIN = '/api/admin';

// Helper to get auth header
const getAuthHeaders = () => {
  const token = localStorage.getItem('destnation_admin_token');
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
      'x-admin-token': 'admin_authorized_token',
    },
  };
};

export const adminLogin = async (username, password) => {
  try {
    const res = await axios.post(`${API_ADMIN}/login`, { username, password });
    if (res.data && res.data.token) {
      localStorage.setItem('destnation_admin_token', res.data.token);
      localStorage.setItem('destnation_admin_user', JSON.stringify(res.data.admin));
    }
    return res.data;
  } catch (error) {
    console.error('API adminLogin error:', error);
    throw error.response?.data || { error: 'Invalid admin credentials' };
  }
};

export const adminLogout = () => {
  localStorage.removeItem('destnation_admin_token');
  localStorage.removeItem('destnation_admin_user');
};

export const getAdminUser = () => {
  try {
    const userStr = localStorage.getItem('destnation_admin_user');
    return userStr ? JSON.parse(userStr) : null;
  } catch (e) {
    return null;
  }
};

export const fetchLeads = async () => {
  try {
    const res = await axios.get(API_LEADS, getAuthHeaders());
    return res.data;
  } catch (error) {
    console.error('API fetchLeads error:', error);
    throw error.response?.data || { error: 'Failed to fetch student details. Authorization required.' };
  }
};

export const createLead = async (leadData) => {
  try {
    const res = await axios.post(API_LEADS, leadData);
    return res.data;
  } catch (error) {
    console.error('API createLead error:', error);
    throw error.response?.data || { error: 'Failed to submit registration form' };
  }
};

export const deleteLead = async (id) => {
  try {
    const res = await axios.delete(`${API_LEADS}/${id}`, getAuthHeaders());
    return res.data;
  } catch (error) {
    console.error('API deleteLead error:', error);
    throw error.response?.data || { error: 'Failed to delete student entry' };
  }
};
