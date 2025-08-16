<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Navigation -->
    <nav class="bg-white shadow-lg border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <!-- Logo and brand -->
          <div class="flex items-center">
            <div class="flex-shrink-0 flex items-center">
              <div class="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                <svg class="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253">
                  </path>
                </svg>
              </div>
              <h1 class="text-xl font-bold text-gray-900 hidden sm:block">School Toolkit</h1>
              <h1 class="text-lg font-bold text-gray-900 sm:hidden">STK</h1>
            </div>

            <!-- Desktop Navigation -->
            <div class="hidden md:ml-8 md:flex md:space-x-1">
              <router-link to="/dashboard"
                class="px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200" :class="$route.path === '/dashboard' 
                  ? 'bg-blue-100 text-blue-700 border-blue-500' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'">
                <div class="flex items-center space-x-2">
                  <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z"></path>
                  </svg>
                  <span>Dashboard</span>
                </div>
              </router-link>

              <router-link to="/children"
                class="px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200" :class="$route.path.startsWith('/children') 
                  ? 'bg-blue-100 text-blue-700 border-blue-500' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'">
                <div class="flex items-center space-x-2">
                  <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z">
                    </path>
                  </svg>
                  <span>Children</span>
                </div>
              </router-link>

              <router-link to="/assessments"
                class="px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200" :class="$route.path.startsWith('/assessments') 
                  ? 'bg-blue-100 text-blue-700 border-blue-500' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'">
                <div class="flex items-center space-x-2">
                  <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01">
                    </path>
                  </svg>
                  <span>Assessments</span>
                </div>
              </router-link>

              <!-- <router-link to="/case-conferences"
                class="px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200" :class="$route.path.startsWith('/case-conferences') 
                  ? 'bg-blue-100 text-blue-700 border-blue-500' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'">
                <div class="flex items-center space-x-2">
                  <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z">
                    </path>
                  </svg>
                  <span>Conferences</span>
                </div>
              </router-link> -->
              <router-link to="/case-CasePlans"
                class="px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200" :class="$route.path.startsWith('/case-CasePlans')
                  ? 'bg-blue-100 text-blue-700 border-blue-500'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'">
                <div class="flex items-center space-x-2">
                  <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z">
                    </path>
                  </svg>
                  <span>Case Plans</span>
                </div>
              </router-link>

              <router-link v-if="isAdmin" to="/schools"
                class="px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200" :class="$route.path.startsWith('/schools') 
                  ? 'bg-blue-100 text-blue-700 border-blue-500' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'">
                <div class="flex items-center space-x-2">
                  <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4">
                    </path>
                  </svg>
                  <span>Schools</span>
                </div>
              </router-link>

              <router-link to="/users" class="px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                :class="$route.path.startsWith('/users') 
                  ? 'bg-blue-100 text-blue-700 border-blue-500' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'">
                <div class="flex items-center space-x-2">
                  <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z">
                    </path>
                  </svg>
                  <span>Users</span>
                </div>
              </router-link>
            </div>
          </div>

          <!-- Right side - Profile and Mobile menu -->
          <div class="flex items-center space-x-4">
            <!-- User info badge -->
            <div class="hidden sm:flex items-center space-x-3 bg-gray-50 rounded-lg px-3 py-1">
              <div class="text-right">
                <div class="text-sm font-medium text-gray-900">{{ user?.name }}</div>
                <div class="text-xs text-gray-500 capitalize">{{ user?.role?.replace('_', ' ') }}</div>
              </div>
            </div>

            <!-- Profile dropdown -->
            <div class="relative">
              <button @click="showProfileMenu = !showProfileMenu"
                class="bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 hover:from-blue-600 hover:to-blue-700 transition-all duration-200">
                <span class="sr-only">Open user menu</span>
                <div class="h-10 w-10 rounded-full flex items-center justify-center text-white font-semibold">
                  {{ user?.name?.charAt(0).toUpperCase() }}
                </div>
              </button>

              <div v-show="showProfileMenu"
                class="origin-top-right absolute right-0 mt-2 w-56 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
                @click="showProfileMenu = false">
                <div class="py-2">
                  <div class="px-4 py-3 border-b border-gray-100">
                    <div class="font-medium text-gray-900">{{ user?.name }}</div>
                    <div class="text-sm text-gray-500">{{ user?.email }}</div>
                    <div class="text-xs text-blue-600 capitalize mt-1">{{ user?.role?.replace('_', ' ') }}</div>
                  </div>
                  <button @click="handleLogout"
                    class="flex items-center w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors duration-200">
                    <svg class="h-4 w-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1">
                      </path>
                    </svg>
                    Sign out
                  </button>
                </div>
              </div>
            </div>

            <!-- Mobile menu button -->
            <button @click="showMobileMenu = !showMobileMenu"
              class="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500">
              <span class="sr-only">Open main menu</span>
              <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path v-if="!showMobileMenu" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"></path>
                <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12">
                </path>
              </svg>
            </button>
          </div>
        </div>

        <!-- Mobile Navigation Menu -->
        <div v-show="showMobileMenu" class="md:hidden border-t border-gray-200 pt-4 pb-3 space-y-1">
          <router-link to="/dashboard"
            class="block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200" :class="$route.path === '/dashboard' 
              ? 'bg-blue-100 text-blue-700' 
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'" @click="showMobileMenu = false">
            Dashboard
          </router-link>
          <router-link to="/children"
            class="block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200" :class="$route.path.startsWith('/children') 
              ? 'bg-blue-100 text-blue-700' 
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'" @click="showMobileMenu = false">
            Children
          </router-link>
          <router-link to="/assessments"
            class="block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200" :class="$route.path.startsWith('/assessments') 
              ? 'bg-blue-100 text-blue-700' 
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'" @click="showMobileMenu = false">
            Assessments
          </router-link>
          <router-link to="/case-CasePlans"
            class="block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200" :class="$route.path.startsWith('/case-CasePlans') 
              ? 'bg-blue-100 text-blue-700' 
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'" @click="showMobileMenu = false">
            Case CasePlans
          </router-link>
          <router-link v-if="isAdmin" to="/schools"
            class="block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200" :class="$route.path.startsWith('/schools') 
              ? 'bg-blue-100 text-blue-700' 
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'" @click="showMobileMenu = false">
            Schools
          </router-link>
          <router-link to="/users"
            class="block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200" :class="$route.path.startsWith('/users') 
              ? 'bg-blue-100 text-blue-700' 
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'" @click="showMobileMenu = false">
            Users
          </router-link>
        </div>
      </div>
    </nav>

    <!-- Main content -->
    <main class="py-6">
      <slot />
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { user, isAdmin, logout } from '../stores/auth'

const router = useRouter()
const showProfileMenu = ref(false)
const showMobileMenu = ref(false)

const handleLogout = async () => {
  await logout()
  router.push('/login')
}

// Close menus when clicking outside
const closeMenus = () => {
  showProfileMenu.value = false
  showMobileMenu.value = false
}

// Close menus on route change
router.afterEach(() => {
  closeMenus()
})
</script>
