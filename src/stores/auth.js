import { ref, computed } from 'vue'
import { authAPI } from '../services/api'

// Global state
const user = ref(null)
const token = ref(null)
const loading = ref(false)

// Initialize from localStorage
const initAuth = () => {
  try {
    const savedToken = localStorage.getItem('auth_token')
    const savedUser = localStorage.getItem('user')
    
    if (savedToken && savedUser && savedUser !== 'undefined') {
      token.value = savedToken
      user.value = JSON.parse(savedUser)
    }
  } catch (error) {
    console.error('Error initializing auth from localStorage:', error)
    // Clear corrupted data
    localStorage.removeItem('auth_token')
    localStorage.removeItem('user')
    token.value = null
    user.value = null
  }
}

// Computed properties
const isAuthenticated = computed(() => !!token.value)
const isAdmin = computed(() => user.value?.role === 'admin')
const isTeacher = computed(() => user.value?.role === 'teacher')
const isSocialWorker = computed(() => user.value?.role === 'social_worker')
const isNurse = computed(() => user.value?.role === 'nurse')

// Actions
const login = async (credentials) => {
  loading.value = true
  try {
    const response = await authAPI.login(credentials)
    const { user: userData, token: authToken } = response.data.data
    
    user.value = userData
    token.value = authToken
    
    // Save to localStorage
    localStorage.setItem('auth_token', authToken)
    localStorage.setItem('user', JSON.stringify(userData))
    
    return { success: true, user: userData }
  } catch (error) {
    console.error('Login error:', error)
    return { 
      success: false, 
      error: error.response?.data?.message || 'Login failed' 
    }
  } finally {
    loading.value = false
  }
}

const logout = async () => {
  try {
    await authAPI.logout()
  } catch (error) {
    console.error('Logout error:', error)
  } finally {
    // Clear state regardless of API call success
    user.value = null
    token.value = null
    localStorage.removeItem('auth_token')
    localStorage.removeItem('user')
  }
}

const register = async (userData) => {
  loading.value = true
  try {
    const response = await authAPI.register(userData)
    const { user: newUser, token: authToken } = response.data.data
    
    user.value = newUser
    token.value = authToken
    
    // Save to localStorage
    localStorage.setItem('auth_token', authToken)
    localStorage.setItem('user', JSON.stringify(newUser))
    
    return { success: true, user: newUser }
  } catch (error) {
    console.error('Registration error:', error)
    return { 
      success: false, 
      error: error.response?.data?.message || 'Registration failed' 
    }
  } finally {
    loading.value = false
  }
}

const fetchUser = async () => {
  if (!token.value) return
  
  try {
    const response = await authAPI.getUser()
    user.value = response.data.data.user
    localStorage.setItem('user', JSON.stringify(response.data.data.user))
  } catch (error) {
    console.error('Fetch user error:', error)
    // If fetching user fails, logout
    logout()
  }
}

// Initialize auth on module load
initAuth()

export {
  user,
  token,
  loading,
  isAuthenticated,
  isAdmin,
  isTeacher,
  isSocialWorker,
  isNurse,
  login,
  logout,
  register,
  fetchUser,
  initAuth
}
