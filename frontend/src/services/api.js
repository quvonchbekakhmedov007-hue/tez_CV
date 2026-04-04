import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_URL || '/api'

const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
})

// Request interceptor — attach JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor — auto-refresh token
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      const refresh = localStorage.getItem('refresh_token')
      if (refresh) {
        try {
          const res = await axios.post(`${API_BASE}/auth/token/refresh/`, { refresh })
          localStorage.setItem('access_token', res.data.access)
          originalRequest.headers.Authorization = `Bearer ${res.data.access}`
          return api(originalRequest)
        } catch {
          localStorage.removeItem('access_token')
          localStorage.removeItem('refresh_token')
          window.location.href = '/login'
        }
      }
    }
    return Promise.reject(error)
  }
)

// Auth
export const authAPI = {
  register: (data) => api.post('/auth/register/', data),
  login: (data) => api.post('/auth/login/', data),
  logout: (refresh) => api.post('/auth/logout/', { refresh }),
  getProfile: () => api.get('/auth/profile/'),
  updateProfile: (data) => api.patch('/auth/profile/', data),
  changePassword: (data) => api.post('/auth/change-password/', data),
}

// CV
export const cvAPI = {
  list: () => api.get('/cv/'),
  create: (data) => api.post('/cv/', data),
  get: (id) => api.get(`/cv/${id}/`),
  update: (id, data) => api.patch(`/cv/${id}/`, data),
  delete: (id) => api.delete(`/cv/${id}/`),
  duplicate: (id) => api.post(`/cv/${id}/duplicate/`),
  downloadPDF: (id) => api.get(`/cv/${id}/download/`, { responseType: 'blob' }),

  // Experiences
  getExperiences: (cvId) => api.get(`/cv/${cvId}/experiences/`),
  addExperience: (cvId, data) => api.post(`/cv/${cvId}/experiences/`, data),
  updateExperience: (cvId, id, data) => api.patch(`/cv/${cvId}/experiences/${id}/`, data),
  deleteExperience: (cvId, id) => api.delete(`/cv/${cvId}/experiences/${id}/`),

  // Educations
  getEducations: (cvId) => api.get(`/cv/${cvId}/educations/`),
  addEducation: (cvId, data) => api.post(`/cv/${cvId}/educations/`, data),
  updateEducation: (cvId, id, data) => api.patch(`/cv/${cvId}/educations/${id}/`, data),
  deleteEducation: (cvId, id) => api.delete(`/cv/${cvId}/educations/${id}/`),

  // Skills
  getSkills: (cvId) => api.get(`/cv/${cvId}/skills/`),
  addSkill: (cvId, data) => api.post(`/cv/${cvId}/skills/`, data),
  updateSkill: (cvId, id, data) => api.patch(`/cv/${cvId}/skills/${id}/`, data),
  deleteSkill: (cvId, id) => api.delete(`/cv/${cvId}/skills/${id}/`),

  // Languages
  getLanguages: (cvId) => api.get(`/cv/${cvId}/languages/`),
  addLanguage: (cvId, data) => api.post(`/cv/${cvId}/languages/`, data),
  updateLanguage: (cvId, id, data) => api.patch(`/cv/${cvId}/languages/${id}/`, data),
  deleteLanguage: (cvId, id) => api.delete(`/cv/${cvId}/languages/${id}/`),

  // Certificates
  getCertificates: (cvId) => api.get(`/cv/${cvId}/certificates/`),
  addCertificate: (cvId, data) => api.post(`/cv/${cvId}/certificates/`, data),
  updateCertificate: (cvId, id, data) => api.patch(`/cv/${cvId}/certificates/${id}/`, data),
  deleteCertificate: (cvId, id) => api.delete(`/cv/${cvId}/certificates/${id}/`),
}

export default api
