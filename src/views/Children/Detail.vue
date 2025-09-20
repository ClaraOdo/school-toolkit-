<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <!-- Header -->
    <div class="mb-8">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-gray-900">Child Details</h1>
          <p class="mt-2 text-gray-600" v-if="child.name">{{ child.name }}</p>
        </div>
        <div class="flex space-x-3">
          <router-link 
            :to="`/children/${$route.params.id}/edit`"
            class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <svg class="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
            </svg>
            Edit Child
          </router-link>
          <router-link 
            to="/children" 
            class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <svg class="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
            </svg>
            Back to Children
          </router-link>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="text-center py-8">
      <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      <p class="mt-2 text-gray-600">Loading child details...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-md p-4">
      <div class="flex">
        <div class="flex-shrink-0">
          <svg class="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path>
          </svg>
        </div>
        <div class="ml-3">
          <h3 class="text-sm font-medium text-red-800">Error loading child details</h3>
          <p class="mt-1 text-sm text-red-700">{{ error }}</p>
        </div>
      </div>
    </div>

    <!-- Child Details -->
    <div v-else-if="child.id" class="space-y-6">
      <!-- Basic Information -->
      <div class="bg-white shadow rounded-lg p-6">
        <h2 class="text-lg font-medium text-gray-900 mb-6">Basic Information</h2>
        
        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <dt class="text-sm font-medium text-gray-500">Case Number</dt>
            <dd class="mt-1 text-sm text-gray-900">{{ child.case_number }}</dd>
          </div>
          
          <div>
            <dt class="text-sm font-medium text-gray-500">Full Name</dt>
            <dd class="mt-1 text-sm text-gray-900">{{ child.name }}</dd>
          </div>
          
          <div>
            <dt class="text-sm font-medium text-gray-500">Date of Birth</dt>
            <dd class="mt-1 text-sm text-gray-900">{{ formatDate(child.date_of_birth) }}</dd>
          </div>
          
          <div>
            <dt class="text-sm font-medium text-gray-500">Age</dt>
            <dd class="mt-1 text-sm text-gray-900">{{ child.age }} years</dd>
          </div>
          
          <div>
            <dt class="text-sm font-medium text-gray-500">Gender</dt>
            <dd class="mt-1 text-sm text-gray-900 capitalize">{{ child.gender }}</dd>
          </div>
          
          <div>
            <dt class="text-sm font-medium text-gray-500">Birth Position</dt>
            <dd class="mt-1 text-sm text-gray-900">{{ child.birth_position || 'Not specified' }}</dd>
          </div>
        </div>
      </div>

      <!-- Cultural & Religious Information -->
      <div class="bg-white shadow rounded-lg p-6">
        <h2 class="text-lg font-medium text-gray-900 mb-6">Cultural & Religious Information</h2>
        
        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <dt class="text-sm font-medium text-gray-500">Religion</dt>
            <dd class="mt-1 text-sm text-gray-900 capitalize">{{ child.religion || 'Not specified' }}</dd>
          </div>
          
          <div v-if="child.religion === 'other'">
            <dt class="text-sm font-medium text-gray-500">Other Religion</dt>
            <dd class="mt-1 text-sm text-gray-900">{{ child.other_religion || 'Not specified' }}</dd>
          </div>
          
          <div>
            <dt class="text-sm font-medium text-gray-500">Tribe</dt>
            <dd class="mt-1 text-sm text-gray-900">{{ child.tribe || 'Not specified' }}</dd>
          </div>
          
          <div>
            <dt class="text-sm font-medium text-gray-500">Language Spoken</dt>
            <dd class="mt-1 text-sm text-gray-900">{{ child.language_spoken || 'Not specified' }}</dd>
          </div>
        </div>
      </div>

      <!-- Education Information -->
      <div class="bg-white shadow rounded-lg p-6">
        <h2 class="text-lg font-medium text-gray-900 mb-6">Education Information</h2>
        
        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <dt class="text-sm font-medium text-gray-500">School</dt>
            <dd class="mt-1 text-sm text-gray-900">{{ child.school?.name || 'Not assigned' }}</dd>
          </div>
          
          <div>
            <dt class="text-sm font-medium text-gray-500">Current Education Level</dt>
            <dd class="mt-1 text-sm text-gray-900">{{ child.current_education_level || 'Not specified' }}</dd>
          </div>
          
          <div>
            <dt class="text-sm font-medium text-gray-500">Date of Admission</dt>
            <dd class="mt-1 text-sm text-gray-900">{{ formatDate(child.date_of_admission) }}</dd>
          </div>
        </div>
      </div>

      <!-- Origin Information -->
      <div class="bg-white shadow rounded-lg p-6">
        <h2 class="text-lg font-medium text-gray-900 mb-6">Origin Information</h2>
        
        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <dt class="text-sm font-medium text-gray-500">Origin District</dt>
            <dd class="mt-1 text-sm text-gray-900">{{ child.origin_district || 'Not specified' }}</dd>
          </div>
          
          <div>
            <dt class="text-sm font-medium text-gray-500">Origin Sub County</dt>
            <dd class="mt-1 text-sm text-gray-900">{{ child.origin_sub_county || 'Not specified' }}</dd>
          </div>
          
          <div>
            <dt class="text-sm font-medium text-gray-500">Origin Parish</dt>
            <dd class="mt-1 text-sm text-gray-900">{{ child.origin_parish || 'Not specified' }}</dd>
          </div>
          
          <div>
            <dt class="text-sm font-medium text-gray-500">Origin Village</dt>
            <dd class="mt-1 text-sm text-gray-900">{{ child.origin_village || 'Not specified' }}</dd>
          </div>
        </div>
      </div>

      <!-- Admission Details -->
      <div class="bg-white shadow rounded-lg p-6">
        <h2 class="text-lg font-medium text-gray-900 mb-6">Admission Details</h2>
        
        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <dt class="text-sm font-medium text-gray-500">Brought By</dt>
            <dd class="mt-1 text-sm text-gray-900 capitalize">{{ child.brought_by?.replace('_', ' ') || 'Not specified' }}</dd>
          </div>
          
          <div v-if="child.brought_by_details && child.brought_by_details.length > 0">
            <dt class="text-sm font-medium text-gray-500">Brought By Details</dt>
            <dd class="mt-1 text-sm text-gray-900">
              <span v-for="detail in child.brought_by_details" :key="detail" 
                    class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800 mr-2">
                {{ detail }}
              </span>
            </dd>
          </div>
          
          <div>
            <dt class="text-sm font-medium text-gray-500">Reason for Admission</dt>
            <dd class="mt-1 text-sm text-gray-900">
              <span v-if="child.reason_for_admission && child.reason_for_admission.length > 0" class="space-x-2">
                <span v-for="reason in child.reason_for_admission" :key="reason" 
                      class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                  {{ reason.replace('_', ' ') }}
                </span>
              </span>
              <span v-else>Not specified</span>
            </dd>
          </div>
          
          <div v-if="child.other_reason" class="sm:col-span-2">
            <dt class="text-sm font-medium text-gray-500">Other Reason Details</dt>
            <dd class="mt-1 text-sm text-gray-900">{{ child.other_reason }}</dd>
          </div>
        </div>
      </div>

      <!-- Health Status -->
      <div class="bg-white shadow rounded-lg p-6">
        <h2 class="text-lg font-medium text-gray-900 mb-6">Health Status</h2>
        
        <div>
          <dt class="text-sm font-medium text-gray-500">Health Conditions</dt>
          <dd class="mt-1 text-sm text-gray-900">
            <span v-if="child.health_status && child.health_status.length > 0" class="space-x-2">
              <span v-for="condition in child.health_status" :key="condition" 
                    class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                {{ condition.replace('_', ' ') }}
              </span>
            </span>
            <span v-else>Not specified</span>
          </dd>
        </div>
      </div>

      <!-- Health & Disability Information -->
      <div class="bg-white shadow rounded-lg p-6">
        <h2 class="text-lg font-medium text-gray-900 mb-6">Health & Disability Information</h2>
        
        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <dt class="text-sm font-medium text-gray-500">Disability Status</dt>
            <dd class="mt-1">
              <span
                :class="[
                  'inline-flex px-2 py-1 text-xs font-semibold rounded-full',
                  child.disability_status === 'with_disability'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-green-100 text-green-800'
                ]"
              >
                {{ child.disability_status?.replace('_', ' ') || 'Not specified' }}
              </span>
            </dd>
          </div>
          
          <div v-if="child.disability_status === 'with_disability' && child.disability_types && child.disability_types.length > 0">
            <dt class="text-sm font-medium text-gray-500">Disability Types</dt>
            <dd class="mt-1 text-sm text-gray-900">
              <span v-for="type in child.disability_types" :key="type" 
                    class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800 mr-2">
                {{ type.replace('_', ' ') }}
              </span>
            </dd>
          </div>
          
          <div v-if="child.disability_status === 'with_disability'" class="sm:col-span-2">
            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <dt class="text-sm font-medium text-gray-500">Has Sign Language Competence</dt>
                <dd class="mt-1 text-sm text-gray-900">
                  <span :class="child.has_sign_language_competence ? 'text-green-600' : 'text-gray-500'">
                    {{ child.has_sign_language_competence ? 'Yes' : 'No' }}
                  </span>
                </dd>
              </div>
              
              <div>
                <dt class="text-sm font-medium text-gray-500">Family Knows Sign Language</dt>
                <dd class="mt-1 text-sm text-gray-900">
                  <span :class="child.family_knows_sign_language ? 'text-green-600' : 'text-gray-500'">
                    {{ child.family_knows_sign_language ? 'Yes' : 'No' }}
                  </span>
                </dd>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Location Information -->
      <div class="bg-white shadow rounded-lg p-6">
        <h2 class="text-lg font-medium text-gray-900 mb-6">Location Information</h2>
        
        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <dt class="text-sm font-medium text-gray-500">District</dt>
            <dd class="mt-1 text-sm text-gray-900">{{ child.district || 'Not specified' }}</dd>
          </div>
          
          <div>
            <dt class="text-sm font-medium text-gray-500">County</dt>
            <dd class="mt-1 text-sm text-gray-900">{{ child.county || 'Not specified' }}</dd>
          </div>
          
          <div>
            <dt class="text-sm font-medium text-gray-500">Sub County</dt>
            <dd class="mt-1 text-sm text-gray-900">{{ child.sub_county || 'Not specified' }}</dd>
          </div>
          
          <div>
            <dt class="text-sm font-medium text-gray-500">Parish</dt>
            <dd class="mt-1 text-sm text-gray-900">{{ child.parish || 'Not specified' }}</dd>
          </div>
          
          <div>
            <dt class="text-sm font-medium text-gray-500">Village</dt>
            <dd class="mt-1 text-sm text-gray-900">{{ child.village || 'Not specified' }}</dd>
          </div>
          
          <div>
            <dt class="text-sm font-medium text-gray-500">Zone</dt>
            <dd class="mt-1 text-sm text-gray-900">{{ child.zone || 'Not specified' }}</dd>
          </div>
        </div>
      </div>

      <!-- Additional Information -->
      <div class="bg-white shadow rounded-lg p-6" v-if="child.additional_information">
        <h2 class="text-lg font-medium text-gray-900 mb-6">Additional Information</h2>
        <p class="text-sm text-gray-900">{{ child.additional_information }}</p>
      </div>

      <!-- Timestamps -->
      <div class="bg-white shadow rounded-lg p-6">
        <h2 class="text-lg font-medium text-gray-900 mb-6">Record Information</h2>
        
        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <dt class="text-sm font-medium text-gray-500">Created</dt>
            <dd class="mt-1 text-sm text-gray-900">{{ formatDateTime(child.created_at) }}</dd>
          </div>
          
          <div>
            <dt class="text-sm font-medium text-gray-500">Last Updated</dt>
            <dd class="mt-1 text-sm text-gray-900">{{ formatDateTime(child.updated_at) }}</dd>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { childrenAPI } from '../../services/api'

const route = useRoute()
const child = ref({})
const loading = ref(true)
const error = ref(null)

const fetchChild = async () => {
  loading.value = true
  error.value = null
  
  try {
    const response = await childrenAPI.getById(route.params.id)
    child.value = response.data
  } catch (err) {
    console.error('Error fetching child:', err)
    error.value = err.response?.data?.message || 'Failed to load child details'
  } finally {
    loading.value = false
  }
}

const formatDate = (dateString) => {
  if (!dateString) return 'Not specified'
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const formatDateTime = (dateString) => {
  if (!dateString) return 'Not specified'
  return new Date(dateString).toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

onMounted(() => {
  fetchChild()
})
</script>
