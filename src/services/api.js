import axios from 'axios'

// Create axios instance with base configuration
const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
})

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear token and redirect to login
      localStorage.removeItem('auth_token')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// Auth API
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  logout: () => api.post('/auth/logout'),
  getUser: () => api.get('/auth/user')
}

// Dashboard API
export const dashboardAPI = {
  getStats: () => api.get('/dashboard/stats')
}

// Children API
export const childrenAPI = {
  getAll: (params = {}) => api.get('/children', { params }),
  getById: (id) => api.get(`/children/${id}`),
  create: (data) => api.post('/children', data),
  update: (id, data) => api.put(`/children/${id}`, data),
  delete: (id) => api.delete(`/children/${id}`),
  restore: (id) => api.post(`/children/${id}/restore`)
}

// Caregivers API
export const caregiversAPI = {
  getByChild: (childId) => api.get(`/children/${childId}/caregivers`),
  create: (childId, data) => api.post(`/children/${childId}/caregivers`, data),
  update: (id, data) => api.put(`/caregivers/${id}`, data),
  delete: (id) => api.delete(`/caregivers/${id}`)
}

// Assessments API
export const assessmentsAPI = {
  getAll: () => api.get('/assessments'),
  getByChild: (childId) => api.get(`/children/${childId}/assessments`),
  create: (childId, data) => api.post(`/children/${childId}/assessments`, data),
  getById: (id) => api.get(`/child-assessments/${id}`),
  update: (id, data) => api.put(`/child-assessments/${id}`, data),
  delete: (id) => api.delete(`/child-assessments/${id}`),
  generatePDF: (id) => api.get(`/child-assessments/${id}/pdf`),
  duplicate: (id) => api.post(`/child-assessments/${id}/duplicate`)
}

// Household Assessments API
export const householdAssessmentsAPI = {
  getAll: () => api.get('/household-assessments'),
  getByChild: (childId) => api.get(`/children/${childId}/household-assessments`),
  create: (childId, data) => api.post(`/children/${childId}/household-assessments`, data),
  getById: (id) => api.get(`/household-assessments/${id}`),
  update: (id, data) => api.put(`/household-assessments/${id}`, data),
  delete: (id) => api.delete(`/household-assessments/${id}`),
  generatePDF: (id) => api.get(`/household-assessments/${id}/pdf`)
}

// Case CasePlans API
export const CasePlansAPI = {
  getAll: (params = {}) => api.get('/case-casePlans', { params }),
  getById: (id) => api.get(`/case-casePlans/${id}`),
  create: (data) => api.post('/case-casePlans', data),
  update: (id, data) => api.put(`/case-casePlans/${id}`, data),
  delete: (id) => api.delete(`/case-casePlans/${id}`),
  addParticipant: (id, data) => api.post(`/case-casePlans/${id}/participants`, data),
  addAction: (id, data) => api.post(`/case-casePlans/${id}/actions`, data),
  updateActionStatus: (actionId, status) => api.put(`/case-casePlan-actions/${actionId}/status`, { status })
}

// Schools API
export const schoolsAPI = {
  getAll: () => api.get('/schools'),
  getById: (id) => api.get(`/schools/${id}`),
  create: (data) => api.post('/schools', data),
  update: (id, data) => api.put(`/schools/${id}`, data),
  delete: (id) => api.delete(`/schools/${id}`)
}

// Users API
export const usersAPI = {
  getAll: () => api.get('/users'),
  getById: (id) => api.get(`/users/${id}`),
  create: (data) => api.post('/users', data),
  update: (id, data) => api.put(`/users/${id}`, data),
  delete: (id) => api.delete(`/users/${id}`)
}

export default api
