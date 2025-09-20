<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-gray-900">Assessments</h1>
      <p class="mt-2 text-gray-600">Manage child and family assessments.</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Child Assessment Card -->
      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <svg class="h-8 w-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">Child Assessment</dt>
                <dd class="text-lg font-medium text-gray-900">Individual Child Profile</dd>
              </dl>
            </div>
          </div>
          <div class="mt-4">
            <p class="text-sm text-gray-600">
              Complete comprehensive assessment for individual children including background information, 
              education status, health, care and protection, and future plans.
            </p>
          </div>
          <div class="mt-6">
            <div class="space-y-3">
              <label class="block text-sm font-medium text-gray-700">Select Child:</label>
              <select v-model="selectedChildId" class="form-input">
                <option value="">Choose a child...</option>
                <option v-for="child in availableChildren" :key="child.id" :value="child.id">
                  {{ child.name }} - {{ child.caseNumber }}
                </option>
              </select>
              <button 
                @click="startChildAssessment"
                :disabled="!selectedChildId"
                class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400"
              >
                Start Child Assessment
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Family Assessment Card -->
      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <svg class="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">Family Assessment</dt>
                <dd class="text-lg font-medium text-gray-900">Household & Family Profile</dd>
              </dl>
            </div>
          </div>
          <div class="mt-4">
            <p class="text-sm text-gray-600">
              Comprehensive family assessment including household composition, economic situation, 
              survival and health, education, care and protection, and community connections.
            </p>
          </div>
          <div class="mt-6">
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Family Assessment Options:</label>
                <div class="space-y-2">
                  <label class="flex items-center">
                    <input v-model="familyAssessmentType" type="radio" value="new" class="mr-2">
                    Start new family assessment for a child
                  </label>
                  <label class="flex items-center">
                    <input v-model="familyAssessmentType" type="radio" value="existing" class="mr-2">
                    Update existing household assessment
                  </label>
                </div>
              </div>

              <!-- New Family Assessment -->
              <div v-if="familyAssessmentType === 'new'" class="space-y-3">
                <label class="block text-sm font-medium text-gray-700">Select Child for New Family Assessment:</label>
                <select v-model="selectedFamilyChildId" @change="checkExistingFamilyAssessment" class="form-input">
                  <option value="">Choose a child...</option>
                  <option v-for="child in availableFamilyChildren" :key="child.id" :value="child.id">
                    {{ child.name }} - {{ child.caseNumber }}
                  </option>
                </select>
                
                <!-- Show existing family assessment warning if found -->
                <div v-if="existingFamilyAssessment" class="p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                  <p class="text-sm text-yellow-800">
                    <strong>⚠️ Family assessment already exists</strong> for this household (completed for {{ existingFamilyAssessment.childName }}).
                  </p>
                  <p class="text-xs text-yellow-700 mt-1">
                    Consider updating the existing assessment instead of creating a new one.
                  </p>
                </div>
                
                <button 
                  @click="startFamilyAssessment"
                  :disabled="!selectedFamilyChildId"
                  class="btn btn-primary bg-green-600 hover:bg-green-700 disabled:bg-gray-400"
                >
                  {{ existingFamilyAssessment ? 'Create New Assessment Anyway' : 'Start Family Assessment' }}
                </button>
              </div>

              <!-- Existing Household Assessment -->
              <div v-if="familyAssessmentType === 'existing'" class="space-y-3">
                <label class="block text-sm font-medium text-gray-700">Select Existing Household:</label>
                <select v-model="selectedExistingHousehold" class="form-input">
                  <option value="">Choose a household...</option>
                  <option v-for="household in existingHouseholds" :key="household.id" :value="household.id">
                    {{ household.householdHead }} - {{ household.address }} ({{ household.childrenCount }} children)
                  </option>
                </select>
                
                <div v-if="selectedExistingHousehold" class="p-3 bg-blue-50 border border-blue-200 rounded-md">
                  <p class="text-sm text-blue-800">
                    <strong>Household Details:</strong>
                  </p>
                  <ul class="text-xs text-blue-700 mt-1 space-y-1">
                    <li v-for="child in getHouseholdChildren(selectedExistingHousehold)" :key="child.id">
                      • {{ child.name }} ({{ child.caseNumber }})
                    </li>
                  </ul>
                </div>
                
                <div class="space-x-2">
                  <button 
                    @click="viewExistingAssessment"
                    :disabled="!selectedExistingHousehold"
                    class="btn btn-secondary"
                  >
                    View Assessment
                  </button>
                  <button 
                    @click="updateExistingAssessment"
                    :disabled="!selectedExistingHousehold"
                    class="btn btn-primary bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400"
                  >
                    Update Assessment
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Recent Assessments -->
    <div class="mt-8">
      <h2 class="text-lg font-medium text-gray-900 mb-4">Recent Assessments</h2>
      <div class="bg-white shadow overflow-hidden sm:rounded-md">
        <div v-if="uniqueAssessments.length === 0" class="px-4 py-5 sm:p-6">
          <p class="text-sm text-gray-500">No assessments started yet.</p>
        </div>
        <div v-else class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Child Name</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Section</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="assessment in uniqueAssessments" :key="assessment.id">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 h-10 w-10">
                      <div class="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <span class="text-sm font-medium text-blue-600">{{ assessment.child.name.charAt(0) }}</span>
                      </div>
                    </div>
                    <div class="ml-4">
                      <div class="text-sm font-medium text-gray-900">{{ assessment.child.name }}</div>
                      <div class="text-sm text-gray-500">{{ assessment.child.case_number }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <div class="flex items-center space-x-2">
                    <span>{{ getSectionDisplay(assessment.section) }}</span>
                    <span class="text-xs text-gray-500">({{ getSectionProgress(assessment) }})</span>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span :class="getStatusClass(assessment.status)" class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium">
                    {{ assessment.status.replace('_', ' ').toUpperCase() }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ formatDate(assessment.assessment_date) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button @click="continueAssessment(assessment)" class="text-blue-600 hover:text-blue-900">
                    {{ assessment.status === 'completed' ? 'View' : 'Continue' }}
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { childrenAPI, householdAssessmentsAPI, assessmentsAPI } from '../../services/api'

export default {
  name: 'AssessmentsIndex',
  data() {
    return {
      selectedChildId: '',
      selectedFamilyChildId: '',
      selectedExistingHousehold: '',
      familyAssessmentType: 'new',
      existingFamilyAssessment: null,
      children: [],
      assessments: [],
      householdAssessments: [],
      loading: true,
      familyAssessments: [],
      existingHouseholds: []
    }
  },
  async mounted() {
    await this.loadChildren()
    await this.loadAssessments()
    await this.loadHouseholdAssessments()
    await this.loadExistingHouseholds()
  },
  computed: {
    availableChildren() {
      // Filter out children who already have assessments (since only one per child allowed)
      const childrenWithAssessments = this.assessments.map(a => a.child_id)
      return this.children.filter(child => !childrenWithAssessments.includes(child.id))
    },
    uniqueAssessments() {
      // Remove duplicates by child_id, keeping the most recent
      const seen = new Set()
      return this.assessments.filter(assessment => {
        if (seen.has(assessment.child_id)) {
          return false
        }
        seen.add(assessment.child_id)
        return true
      })
    },
    availableFamilyChildren() {
      // Filter out children who already have household assessments
      const childrenWithHouseholdAssessments = this.householdAssessments.map(ha => ha.child_id)
      return this.children.filter(child => !childrenWithHouseholdAssessments.includes(child.id))
    }
  },
  methods: {
    async loadChildren() {
      try {
        const response = await childrenAPI.getAll()
        
        if (response.data && response.data.data) {
          this.children = response.data.data.map(child => ({
            id: child.id,
            name: child.name,
            caseNumber: child.case_number,
            caregiverName: child.primary_caregiver_name,
            caregiverPhone: child.primary_caregiver_phone,
            address: child.address
          }))
        }
        this.loading = false
      } catch (error) {
        console.error('Error loading children:', error)
        this.loading = false
      }
    },
    async loadAssessments() {
      try {
        const response = await assessmentsAPI.getAll()
        this.assessments = response.data.data || []
      } catch (error) {
        console.error('Error loading assessments:', error)
        this.assessments = []
      }
    },
    async loadHouseholdAssessments() {
      try {
        const response = await householdAssessmentsAPI.getAll()
        this.householdAssessments = response.data.data || []
      } catch (error) {
        console.error('Error loading household assessments:', error)
        this.householdAssessments = []
      }
    },
    async loadExistingHouseholds() {
      try {
        const response = await householdAssessmentsAPI.getAll()
        this.existingHouseholds = response.data.data || []
      } catch (error) {
        console.error('Error loading existing households:', error)
      }
    },
    async loadChildren() {
      try {
        console.log('Loading children...')
        const response = await childrenAPI.getAll()
        console.log('API response:', response)
        
        if (response.data && response.data.data) {
          this.children = response.data.data.map(child => ({
            id: child.id,
            name: child.name,
            caseNumber: child.case_number,
            caregiverName: child.primary_caregiver_name,
            caregiverPhone: child.primary_caregiver_phone,
            address: child.address
          }))
          console.log('Children loaded:', this.children)
        }
        this.loading = false
      } catch (error) {
        console.error('Error loading children:', error)
        this.loading = false
      }
    },
    startChildAssessment() {
      if (this.selectedChildId) {
        this.$router.push(`/assessments/child/${this.selectedChildId}`)
      }
    },
    startFamilyAssessment() {
      if (this.selectedFamilyChildId) {
        this.$router.push(`/assessments/family/${this.selectedFamilyChildId}`)
      }
    },
    checkExistingFamilyAssessment() {
      if (!this.selectedFamilyChildId) {
        this.existingFamilyAssessment = null
        return
      }
      
      const selectedChild = this.children.find(c => c.id == this.selectedFamilyChildId)
      if (!selectedChild) return
      
      // Check if family assessment exists for same household using:
      // 1. Same caregiver name AND phone, OR
      // 2. Same address (indicating same household)
      const existing = this.familyAssessments.find(fa => {
        const assessedChild = this.children.find(c => c.id === fa.childId)
        if (!assessedChild) return false
        
        // Same caregiver (name + phone match)
        const sameCaregiverName = selectedChild.caregiverName === assessedChild.caregiverName
        const sameCaregiverPhone = selectedChild.caregiverPhone === assessedChild.caregiverPhone
        const sameCaregiver = sameCaregiverName && sameCaregiverPhone
        
        // Same address
        const sameAddress = selectedChild.address === assessedChild.address
        
        return fa.completed && (sameCaregiver || sameAddress)
      })
      
      this.existingFamilyAssessment = existing
    },
    viewFamilyAssessment() {
      if (this.existingFamilyAssessment) {
        // Navigate to view existing assessment
        this.$router.push(`/assessments/family/${this.existingFamilyAssessment.childId}/view`)
      }
    },
    updateFamilyAssessment() {
      if (this.existingFamilyAssessment) {
        // Navigate to update existing assessment
        this.$router.push(`/assessments/family/${this.existingFamilyAssessment.childId}`)
      }
    },
    getHouseholdChildren(householdId) {
      const household = this.existingHouseholds.find(h => h.id === householdId)
      if (!household) return []
      
      return this.children.filter(child => 
        child.caregiverName === household.householdHead && 
        child.address === household.address
      )
    },
    viewExistingAssessment() {
      if (this.selectedExistingHousehold) {
        const household = this.existingHouseholds.find(h => h.id === this.selectedExistingHousehold)
        const firstChild = this.getHouseholdChildren(this.selectedExistingHousehold)[0]
        if (firstChild) {
          this.$router.push(`/assessments/family/${firstChild.id}/view`)
        }
      }
    },
    updateExistingAssessment() {
      if (this.selectedExistingHousehold) {
        const firstChild = this.getHouseholdChildren(this.selectedExistingHousehold)[0]
        if (firstChild) {
          this.$router.push(`/assessments/family/${firstChild.id}`)
        }
      }
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString()
    },
    getStatusClass(status) {
      const classes = {
        'draft': 'bg-gray-100 text-gray-800',
        'in_progress': 'bg-yellow-100 text-yellow-800',
        'completed': 'bg-green-100 text-green-800'
      }
      return classes[status] || 'bg-gray-100 text-gray-800'
    },
    continueAssessment(assessment) {
      if (assessment.status === 'completed') {
        // View completed assessment
        this.$router.push(`/assessments/child/${assessment.child_id}/view`)
      } else {
        // Continue in-progress assessment
        const sectionRoutes = {
          'education': '',
          'care_protection': '/care-protection',
          'health': '/health',
          'emotional': '/emotional',
          'economic': '/economic'
        }
        const route = sectionRoutes[assessment.section] || ''
        this.$router.push(`/assessments/child/${assessment.child_id}${route}`)
      }
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString()
    },
    getStatusClass(status) {
      const classes = {
        'draft': 'bg-gray-100 text-gray-800',
        'in_progress': 'bg-yellow-100 text-yellow-800',
        'completed': 'bg-green-100 text-green-800'
      }
      return classes[status] || 'bg-gray-100 text-gray-800'
    },
    getSectionDisplay(section) {
      const sections = {
        'education': 'Education',
        'care_protection': 'Care & Protection',
        'health': 'Health',
        'emotional': 'Emotional',
        'economic': 'Economic'
      }
      return sections[section] || 'Started'
    },
    getSectionProgress(assessment) {
      const sections = ['education', 'care_protection', 'health', 'emotional', 'economic']
      const currentIndex = sections.indexOf(assessment.section)
      if (assessment.status === 'completed') {
        return '5/5'
      }
      return `${currentIndex + 1}/5`
    }
  }
}
</script>
