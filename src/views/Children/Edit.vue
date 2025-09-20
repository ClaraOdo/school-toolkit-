<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
    <!-- Header -->
    <div class="mb-8">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-gray-900">Edit Child</h1>
          <p class="mt-2 text-gray-600" v-if="form.name">{{ form.name }}</p>
        </div>
        <router-link 
          :to="`/children/${$route.params.id}`"
          class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <svg class="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          Back to Details
        </router-link>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="initialLoading" class="text-center py-8">
      <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      <p class="mt-2 text-gray-600">Loading child data...</p>
    </div>

    <!-- Form -->
    <form v-else @submit.prevent="handleSubmit" class="space-y-8">
      <!-- Basic Information -->
      <div class="bg-white shadow rounded-lg p-6">
        <h2 class="text-lg font-medium text-gray-900 mb-6">Basic Information</h2>
        
        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div class="sm:col-span-2">
            <label for="name" class="block text-sm font-medium text-gray-700">Full Name *</label>
            <input
              id="name"
              v-model="form.name"
              type="text"
              required
              class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter child's full name"
            />
          </div>

          <div>
            <label for="date_of_birth" class="block text-sm font-medium text-gray-700">Date of Birth *</label>
            <input
              id="date_of_birth"
              v-model="form.date_of_birth"
              type="date"
              required
              class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              @change="calculateAge"
            />
          </div>

          <div>
            <label for="age" class="block text-sm font-medium text-gray-700">Age *</label>
            <input
              id="age"
              v-model="form.age"
              type="number"
              min="0"
              max="18"
              required
              class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Age in years"
            />
          </div>

          <div>
            <label for="gender" class="block text-sm font-medium text-gray-700">Gender *</label>
            <select
              id="gender"
              v-model="form.gender"
              required
              class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          <div>
            <label for="birth_position" class="block text-sm font-medium text-gray-700">Birth Position</label>
            <input
              id="birth_position"
              v-model="form.birth_position"
              type="number"
              min="1"
              class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Position among siblings"
            />
          </div>
        </div>
      </div>

      <!-- Disability Information -->
      <div class="bg-white shadow rounded-lg p-6">
        <h2 class="text-lg font-medium text-gray-900 mb-6">Disability Information</h2>
        
        <div class="space-y-6">
          <div>
            <label class="block text-sm font-medium text-gray-700">Disability Status *</label>
            <div class="mt-2 space-y-2">
              <label class="inline-flex items-center">
                <input
                  v-model="form.disability_status"
                  type="radio"
                  value="without_disability"
                  class="form-radio h-4 w-4 text-blue-600"
                />
                <span class="ml-2">Without Disability</span>
              </label>
              <label class="inline-flex items-center">
                <input
                  v-model="form.disability_status"
                  type="radio"
                  value="with_disability"
                  class="form-radio h-4 w-4 text-blue-600"
                />
                <span class="ml-2">With Disability</span>
              </label>
            </div>
          </div>

          <div v-if="form.disability_status === 'with_disability'" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">Disability Types</label>
              <div class="mt-2 space-y-2">
                <label v-for="type in disabilityTypes" :key="type.value" class="inline-flex items-center mr-6">
                  <input
                    v-model="form.disability_types"
                    type="checkbox"
                    :value="type.value"
                    class="form-checkbox h-4 w-4 text-blue-600"
                  />
                  <span class="ml-2">{{ type.label }}</span>
                </label>
              </div>
            </div>

            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label class="inline-flex items-center">
                  <input
                    v-model="form.has_sign_language_competence"
                    type="checkbox"
                    class="form-checkbox h-4 w-4 text-blue-600"
                  />
                  <span class="ml-2">Has Sign Language Competence</span>
                </label>
              </div>
              <div>
                <label class="inline-flex items-center">
                  <input
                    v-model="form.family_knows_sign_language"
                    type="checkbox"
                    class="form-checkbox h-4 w-4 text-blue-600"
                  />
                  <span class="ml-2">Family Knows Sign Language</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Cultural & Religious Information -->
      <div class="bg-white shadow rounded-lg p-6">
        <h2 class="text-lg font-medium text-gray-900 mb-6">Cultural & Religious Information</h2>
        
        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label for="religion" class="block text-sm font-medium text-gray-700">Religion</label>
            <select
              id="religion"
              v-model="form.religion"
              class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="">Select religion</option>
              <option value="catholic">Catholic</option>
              <option value="anglican">Anglican</option>
              <option value="pentecostal">Pentecostal</option>
              <option value="muslim">Muslim</option>
              <option value="orthodox">Orthodox</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div v-if="form.religion === 'other'">
            <label for="other_religion" class="block text-sm font-medium text-gray-700">Other Religion</label>
            <input
              id="other_religion"
              v-model="form.other_religion"
              type="text"
              class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Specify religion"
            />
          </div>

          <div>
            <label for="tribe" class="block text-sm font-medium text-gray-700">Tribe</label>
            <input
              id="tribe"
              v-model="form.tribe"
              type="text"
              class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter tribe"
            />
          </div>

          <div>
            <label for="language_spoken" class="block text-sm font-medium text-gray-700">Language Spoken</label>
            <input
              id="language_spoken"
              v-model="form.language_spoken"
              type="text"
              class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Primary language"
            />
          </div>
        </div>
      </div>

      <!-- Education Information -->
      <div class="bg-white shadow rounded-lg p-6">
        <h2 class="text-lg font-medium text-gray-900 mb-6">Education Information</h2>
        
        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label for="current_education_level" class="block text-sm font-medium text-gray-700">Current Education Level</label>
            <input
              id="current_education_level"
              v-model="form.current_education_level"
              type="text"
              class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="e.g., Primary 5, Secondary 2"
            />
          </div>

          <div>
            <label for="date_of_admission" class="block text-sm font-medium text-gray-700">Date of Admission</label>
            <input
              id="date_of_admission"
              v-model="form.date_of_admission"
              type="date"
              class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
        </div>
      </div>

      <!-- Origin Information -->
      <div class="bg-white shadow rounded-lg p-6">
        <h2 class="text-lg font-medium text-gray-900 mb-6">Origin Information</h2>
        
        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label for="origin_district" class="block text-sm font-medium text-gray-700">Origin District</label>
            <input
              id="origin_district"
              v-model="form.origin_district"
              type="text"
              class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="District of origin"
            />
          </div>

          <div>
            <label for="origin_sub_county" class="block text-sm font-medium text-gray-700">Origin Sub County</label>
            <input
              id="origin_sub_county"
              v-model="form.origin_sub_county"
              type="text"
              class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Sub county of origin"
            />
          </div>

          <div>
            <label for="origin_parish" class="block text-sm font-medium text-gray-700">Origin Parish</label>
            <input
              id="origin_parish"
              v-model="form.origin_parish"
              type="text"
              class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Parish of origin"
            />
          </div>

          <div>
            <label for="origin_village" class="block text-sm font-medium text-gray-700">Origin Village</label>
            <input
              id="origin_village"
              v-model="form.origin_village"
              type="text"
              class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Village of origin"
            />
          </div>
        </div>
      </div>

      <!-- Admission Details -->
      <div class="bg-white shadow rounded-lg p-6">
        <h2 class="text-lg font-medium text-gray-900 mb-6">Admission Details</h2>
        
        <div class="space-y-6">
          <div>
            <label for="brought_by" class="block text-sm font-medium text-gray-700">Brought By</label>
            <select
              id="brought_by"
              v-model="form.brought_by"
              class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="">Select who brought the child</option>
              <option value="biological_father">Biological Father</option>
              <option value="biological_mother">Biological Mother</option>
              <option value="sister">Sister</option>
              <option value="brother">Brother</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label for="date_of_admission" class="block text-sm font-medium text-gray-700">Date of Admission</label>
            <input
              id="date_of_admission"
              v-model="form.date_of_admission"
              type="date"
              class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">Reason for Admission</label>
            <div class="mt-2 grid grid-cols-2 gap-2">
              <label v-for="reason in admissionReasons" :key="reason.value" class="inline-flex items-center">
                <input
                  v-model="form.reason_for_admission"
                  type="checkbox"
                  :value="reason.value"
                  class="form-checkbox h-4 w-4 text-blue-600"
                />
                <span class="ml-2 text-sm">{{ reason.label }}</span>
              </label>
            </div>
          </div>

          <div v-if="form.reason_for_admission && form.reason_for_admission.includes('other')">
            <label for="other_reason" class="block text-sm font-medium text-gray-700">Other Reason</label>
            <textarea
              id="other_reason"
              v-model="form.other_reason"
              rows="3"
              class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Specify other reason for admission"
            ></textarea>
          </div>
        </div>
      </div>

      <!-- Health Status -->
      <div class="bg-white shadow rounded-lg p-6">
        <h2 class="text-lg font-medium text-gray-900 mb-6">Health Status</h2>
        
        <div>
          <label class="block text-sm font-medium text-gray-700">Health Conditions</label>
          <div class="mt-2 grid grid-cols-2 gap-2">
            <label v-for="condition in healthConditions" :key="condition.value" class="inline-flex items-center">
              <input
                v-model="form.health_status"
                type="checkbox"
                :value="condition.value"
                class="form-checkbox h-4 w-4 text-blue-600"
              />
              <span class="ml-2 text-sm">{{ condition.label }}</span>
            </label>
          </div>
        </div>
      </div>

      <!-- Error Display -->
      <div v-if="error" class="bg-red-50 border border-red-200 rounded-md p-4">
        <div class="flex">
          <svg class="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path>
          </svg>
          <div class="ml-3">
            <h3 class="text-sm font-medium text-red-800">Error</h3>
            <div class="mt-2 text-sm text-red-700">{{ error }}</div>
          </div>
        </div>
      </div>

      <!-- Success Message -->
      <div v-if="successMessage" class="bg-green-50 border border-green-200 rounded-md p-4">
        <div class="flex">
          <svg class="h-5 w-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
          </svg>
          <div class="ml-3">
            <h3 class="text-sm font-medium text-green-800">Success</h3>
            <div class="mt-2 text-sm text-green-700">{{ successMessage }}</div>
          </div>
        </div>
      </div>

      <!-- Submit Button -->
      <div class="flex justify-end space-x-3">
        <router-link
          :to="`/children/${$route.params.id}`"
          class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Cancel
        </router-link>
        <button
          type="submit"
          :disabled="loading"
          class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg v-if="loading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          {{ loading ? 'Updating...' : 'Update Child' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { childrenAPI } from '../../services/api'

const route = useRoute()
const router = useRouter()
const loading = ref(false)
const initialLoading = ref(true)
const error = ref('')
const successMessage = ref('')

const form = reactive({
  name: '',
  age: '',
  date_of_birth: '',
  gender: '',
  birth_position: '',
  disability_status: '',
  disability_types: [],
  has_sign_language_competence: false,
  family_knows_sign_language: false,
  religion: '',
  other_religion: '',
  tribe: '',
  language_spoken: '',
  current_education_level: '',
  date_of_admission: '',
  brought_by: '',
  brought_by_details: [],
  origin_district: '',
  origin_sub_county: '',
  origin_parish: '',
  origin_village: '',
  reason_for_admission: [],
  other_reason: '',
  health_status: []
})

const disabilityTypes = [
  { value: 'physical', label: 'Physical' },
  { value: 'intellectual', label: 'Intellectual' },
  { value: 'sensory', label: 'Sensory' },
  { value: 'mental_health', label: 'Mental Health' },
  { value: 'multiple', label: 'Multiple' }
]

const admissionReasons = [
  { value: 'abuse', label: 'Abuse' },
  { value: 'neglect', label: 'Neglect' },
  { value: 'abandonment', label: 'Abandonment' },
  { value: 'poverty', label: 'Poverty' },
  { value: 'family_breakdown', label: 'Family Breakdown' },
  { value: 'disability_support', label: 'Disability Support' },
  { value: 'education_access', label: 'Education Access' },
  { value: 'other', label: 'Other' }
]

const healthConditions = [
  { value: 'healthy', label: 'Healthy' },
  { value: 'chronic_illness', label: 'Chronic Illness' },
  { value: 'mental_health_issues', label: 'Mental Health Issues' },
  { value: 'malnutrition', label: 'Malnutrition' },
  { value: 'developmental_delays', label: 'Developmental Delays' },
  { value: 'requires_medication', label: 'Requires Medication' }
]

const fetchChild = async () => {
  initialLoading.value = true
  error.value = ''
  
  try {
    const response = await childrenAPI.getById(route.params.id)
    const child = response.data
    
    // Populate form with existing data
    Object.keys(form).forEach(key => {
      if (child[key] !== undefined && child[key] !== null) {
        // Handle array fields
        if (Array.isArray(child[key])) {
          form[key] = [...child[key]]
        } else {
          form[key] = child[key]
        }
      }
    })
    
    // Format dates for input fields
    if (child.date_of_birth) {
      form.date_of_birth = child.date_of_birth.split('T')[0]
    }
    
    if (child.date_of_admission) {
      form.date_of_admission = child.date_of_admission.split('T')[0]
    }
    
    // Ensure array fields are arrays
    if (!Array.isArray(form.disability_types)) {
      form.disability_types = []
    }
    if (!Array.isArray(form.brought_by_details)) {
      form.brought_by_details = []
    }
    if (!Array.isArray(form.reason_for_admission)) {
      form.reason_for_admission = []
    }
    if (!Array.isArray(form.health_status)) {
      form.health_status = []
    }
    
  } catch (err) {
    console.error('Error fetching child:', err)
    error.value = err.response?.data?.message || 'Failed to load child data'
  } finally {
    initialLoading.value = false
  }
}

const calculateAge = () => {
  if (form.date_of_birth) {
    const birthDate = new Date(form.date_of_birth)
    const today = new Date()
    const age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      form.age = age - 1
    } else {
      form.age = age
    }
  }
}

const handleSubmit = async () => {
  loading.value = true
  error.value = ''
  successMessage.value = ''
  
  try {
    await childrenAPI.update(route.params.id, form)
    
    successMessage.value = 'Child information updated successfully!'
    
    // Redirect to child details after a short delay
    setTimeout(() => {
      router.push(`/children/${route.params.id}`)
    }, 1500)
    
  } catch (err) {
    console.error('Error updating child:', err)
    error.value = err.response?.data?.message || 'Failed to update child information. Please try again.'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchChild()
})
</script>
