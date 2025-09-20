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
                <option v-for="child in children" :key="child.id" :value="child.id">
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
            <div class="space-y-3">
              <label class="block text-sm font-medium text-gray-700">Select Child for Family Assessment:</label>
              <select v-model="selectedFamilyChildId" class="form-input">
                <option value="">Choose a child...</option>
                <option v-for="child in children" :key="child.id" :value="child.id">
                  {{ child.name }} - {{ child.caseNumber }}
                </option>
              </select>
              <button 
                @click="startFamilyAssessment"
                :disabled="!selectedFamilyChildId"
                class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-gray-400"
              >
                Start Family Assessment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Recent Assessments -->
    <div class="mt-8">
      <h2 class="text-lg font-medium text-gray-900 mb-4">Recent Assessments</h2>
      <div class="bg-white shadow overflow-hidden sm:rounded-md">
        <div class="px-4 py-5 sm:p-6">
          <p class="text-sm text-gray-500">No assessments completed yet.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AssessmentsIndex',
  data() {
    return {
      selectedChildId: '',
      selectedFamilyChildId: '',
      children: [
        { id: 1, name: 'John Doe', caseNumber: 'CH001' },
        { id: 2, name: 'Jane Smith', caseNumber: 'CH002' },
        { id: 3, name: 'Mary Johnson', caseNumber: 'CH003' }
      ]
    }
  },
  computed: {
    selectedChild() {
      return this.children.find(child => child.id == this.selectedChildId)
    }
  },
  async mounted() {
    await this.loadChildren()
  },
  methods: {
    async loadChildren() {
      try {
        // Replace with actual API call
        // const response = await childrenAPI.getAll()
        // this.children = response.data
        console.log('Loading children...')
      } catch (error) {
        console.error('Error loading children:', error)
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
    }
  }
}
</script>
