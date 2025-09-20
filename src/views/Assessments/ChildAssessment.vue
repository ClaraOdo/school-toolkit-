<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
    <div class="bg-white shadow rounded-lg">
      <div class="px-6 py-4 border-b border-gray-200">
        <h1 class="text-2xl font-bold text-gray-900">Child Profile/Assessment Form</h1>
        <p class="mt-1 text-sm text-gray-600">For {{ childData.childName }}</p>
      </div>

      <form @submit.prevent="submitAssessment" class="p-6 space-y-8">
        <!-- Background Information - Read Only Display -->
        <div class="bg-gray-50 p-4 rounded-lg">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-lg font-semibold text-gray-900">Background Information About the Child</h2>
            <router-link to="/children/edit" class="text-blue-600 hover:text-blue-800 text-sm">Edit Basic Info</router-link>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">Name of school</label>
              <p class="mt-1 text-sm text-gray-900 bg-white p-2 border rounded">{{ childData.schoolName || 'Not specified' }}</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Child's Name</label>
              <p class="mt-1 text-sm text-gray-900 bg-white p-2 border rounded">{{ childData.childName || 'Not specified' }}</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Date of Birth</label>
              <p class="mt-1 text-sm text-gray-900 bg-white p-2 border rounded">{{ childData.dateOfBirth || 'Not specified' }}</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Child case Number</label>
              <p class="mt-1 text-sm text-gray-900 bg-white p-2 border rounded">{{ childData.caseNumber || 'Not specified' }}</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Gender</label>
              <p class="mt-1 text-sm text-gray-900 bg-white p-2 border rounded">{{ childData.gender || 'Not specified' }}</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Religion</label>
              <p class="mt-1 text-sm text-gray-900 bg-white p-2 border rounded">{{ childData.religion || 'Not specified' }}</p>
            </div>
          </div>
        </div>

        <!-- Education and Development -->
        <div class="bg-gray-50 p-4 rounded-lg">
          <h2 class="text-lg font-semibold text-gray-900 mb-4">Education and Development</h2>
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Is the child currently enrolled and attending school?</label>
              <div class="space-y-2">
                <label class="flex items-center">
                  <input v-model="form.currentlyEnrolled" type="radio" value="yes" class="mr-2">
                  Yes
                </label>
                <label class="flex items-center">
                  <input v-model="form.currentlyEnrolled" type="radio" value="no" class="mr-2">
                  No
                </label>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Is the child attending school regularly (At least 4 days a week on average) in the past 12 months?</label>
              <div class="space-y-2">
                <label class="flex items-center">
                  <input v-model="form.attendingRegularly" type="radio" value="yes" class="mr-2">
                  Yes
                </label>
                <label class="flex items-center">
                  <input v-model="form.attendingRegularly" type="radio" value="no" class="mr-2">
                  No
                </label>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Has the child successfully progressed from one level to another at school, during the last academic year?</label>
              <div class="space-y-2">
                <label class="flex items-center">
                  <input v-model="form.progressedLastYear" type="radio" value="yes" class="mr-2">
                  Yes
                </label>
                <label class="flex items-center">
                  <input v-model="form.progressedLastYear" type="radio" value="no" class="mr-2">
                  No
                </label>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Class teacher's opinion about the child's education progress</label>
              <div class="space-y-2">
                <label class="flex items-center">
                  <input v-model="form.teacherOpinion" type="radio" value="excellent" class="mr-2">
                  Excellent
                </label>
                <label class="flex items-center">
                  <input v-model="form.teacherOpinion" type="radio" value="good" class="mr-2">
                  Good
                </label>
                <label class="flex items-center">
                  <input v-model="form.teacherOpinion" type="radio" value="fair" class="mr-2">
                  Fair
                </label>
                <label class="flex items-center">
                  <input v-model="form.teacherOpinion" type="radio" value="poor" class="mr-2">
                  Poor
                </label>
                <label class="flex items-center">
                  <input v-model="form.teacherOpinion" type="radio" value="very-poor" class="mr-2">
                  Very poor
                </label>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Is the child's behaviour in classroom appropriate?</label>
              <div class="space-y-2">
                <label class="flex items-center">
                  <input v-model="form.classroomBehaviour" type="radio" value="very-appropriate" class="mr-2">
                  Yes, very appropriate
                </label>
                <label class="flex items-center">
                  <input v-model="form.classroomBehaviour" type="radio" value="somewhat-appropriate" class="mr-2">
                  Yes, somewhat appropriate
                </label>
                <label class="flex items-center">
                  <input v-model="form.classroomBehaviour" type="radio" value="inappropriate" class="mr-2">
                  No, inappropriate
                </label>
              </div>
            </div>
          </div>
        </div>

        <div class="flex justify-end space-x-4">
          <button type="button" @click="$router.go(-1)" class="btn btn-secondary">
            Cancel
          </button>
          <button type="submit" class="btn btn-primary">
            Save & Continue to Care & Protection
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { childrenAPI, assessmentsAPI } from '../../services/api'

export default {
  name: 'ChildAssessment',
  data() {
    return {
      childData: {
        schoolName: 'Kampala Primary School',
        childName: 'Loading...',
        dateOfBirth: '2010-05-15',
        caseNumber: 'CH001',
        gender: 'Male',
        religion: 'Catholic'
      },
      form: {
        currentlyEnrolled: '',
        attendingRegularly: '',
        progressedLastYear: '',
        teacherOpinion: '',
        classroomBehaviour: ''
      }
    }
  },
  async mounted() {
    await this.loadChildData()
  },
  methods: {
    async loadChildData() {
      try {
        const childId = this.$route.params.childId
        console.log('Loading child data for ID:', childId)
        
        // Load child data from API
        const response = await childrenAPI.getById(childId)
        this.childData = {
          schoolName: response.data.school?.name || 'Not specified',
          childName: response.data.name || 'Not specified',
          dateOfBirth: response.data.date_of_birth || 'Not specified',
          caseNumber: response.data.case_number || 'Not specified',
          gender: response.data.gender || 'Not specified',
          religion: response.data.religion || 'Not specified'
        }
        
        // Load existing assessment data if available
        const currentAssessment = await assessmentsAPI.getByChild(childId)
        if (currentAssessment.data && currentAssessment.data.length > 0) {
          const latest = currentAssessment.data[0]
          if (latest.status === 'in_progress') {
            // Pre-fill form with existing data
            this.form = {
              currently_enrolled: latest.currently_enrolled || '',
              attending_regularly: latest.attending_regularly || '',
              progressed_last_year: latest.progressed_last_year || '',
              teacher_opinion: latest.teacher_opinion || '',
              classroom_behavior: latest.classroom_behavior || ''
            }
          }
        }
      } catch (error) {
        console.error('Error loading child data:', error)
        // Fallback to show error message
        this.childData = {
          schoolName: 'Error loading data',
          childName: 'Error loading data',
          dateOfBirth: 'Error loading data',
          caseNumber: 'Error loading data',
          gender: 'Error loading data',
          religion: 'Error loading data'
        }
      }
    },
    async submitAssessment() {
      try {
        const childId = this.$route.params.childId
        console.log('Saving education section:', this.form)
        
        // Save education section to API
        const assessmentData = {
          section: 'education',
          assessment_type: 'initial',
          currently_enrolled: this.form.currently_enrolled === 'yes',
          attending_regularly: this.form.attending_regularly === 'yes',
          progressed_last_year: this.form.progressed_last_year === 'yes',
          teacher_opinion: this.form.teacher_opinion,
          classroom_behavior: this.form.classroom_behavior
        }
        
        await assessmentsAPI.create(childId, assessmentData)
        
        this.$router.push(`/assessments/child/${childId}/care-protection`)
      } catch (error) {
        console.error('Error saving assessment:', error)
        // Show error message to user
        alert('Error saving assessment. Please try again.')
      }
    }
  }
}
</script>
