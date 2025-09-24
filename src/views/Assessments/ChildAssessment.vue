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
                  <input v-model="form.currently_enrolled" type="radio" value="yes" class="mr-2">
                  Yes
                </label>
                <label class="flex items-center">
                  <input v-model="form.currently_enrolled" type="radio" value="no" class="mr-2">
                  No
                </label>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Is the child attending school regularly (At least 4 days a week on average) in the past 12 months?</label>
              <div class="space-y-2">
                <label class="flex items-center">
                  <input v-model="form.attending_regularly" type="radio" value="yes" class="mr-2">
                  Yes
                </label>
                <label class="flex items-center">
                  <input v-model="form.attending_regularly" type="radio" value="no" class="mr-2">
                  No
                </label>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Has the child successfully progressed from one level to another at school, during the last academic year?</label>
              <div class="space-y-2">
                <label class="flex items-center">
                  <input v-model="form.progressed_last_year" type="radio" value="yes" class="mr-2">
                  Yes
                </label>
                <label class="flex items-center">
                  <input v-model="form.progressed_last_year" type="radio" value="no" class="mr-2">
                  No
                </label>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Class teacher's opinion about the child's education progress</label>
              <div class="space-y-2">
                <label class="flex items-center">
                  <input v-model="form.teacher_opinion" type="radio" value="excellent" class="mr-2">
                  Excellent
                </label>
                <label class="flex items-center">
                  <input v-model="form.teacher_opinion" type="radio" value="good" class="mr-2">
                  Good
                </label>
                <label class="flex items-center">
                  <input v-model="form.teacher_opinion" type="radio" value="fair" class="mr-2">
                  Fair
                </label>
                <label class="flex items-center">
                  <input v-model="form.teacher_opinion" type="radio" value="poor" class="mr-2">
                  Poor
                </label>
                <label class="flex items-center">
                  <input v-model="form.teacher_opinion" type="radio" value="very_poor" class="mr-2">
                  Very poor
                </label>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Is the child's behaviour in classroom appropriate?</label>
              <div class="space-y-2">
                <label class="flex items-center">
                  <input v-model="form.classroom_behavior" type="radio" value="very_appropriate" class="mr-2">
                  Yes, very appropriate
                </label>
                <label class="flex items-center">
                  <input v-model="form.classroom_behavior" type="radio" value="somewhat_appropriate" class="mr-2">
                  Yes, somewhat appropriate
                </label>
                <label class="flex items-center">
                  <input v-model="form.classroom_behavior" type="radio" value="inappropriate" class="mr-2">
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
        currently_enrolled: '',
        attending_regularly: '',
        progressed_last_year: '',
        teacher_opinion: '',
        classroom_behavior: ''
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
        console.log('Education API response:', currentAssessment)
        console.log('Education API response data:', currentAssessment.data)
        if (currentAssessment.data) {
          // Handle both array and object responses
          let latest
          if (Array.isArray(currentAssessment.data)) {
            latest = currentAssessment.data[0]
          } else if (currentAssessment.data.data && Array.isArray(currentAssessment.data.data)) {
            latest = currentAssessment.data.data[0]
          } else {
            latest = currentAssessment.data
          }
          
          console.log('Education latest assessment:', latest)
          console.log('currently_enrolled raw:', latest.currently_enrolled, typeof latest.currently_enrolled)
          console.log('attending_regularly raw:', latest.attending_regularly, typeof latest.attending_regularly)
          console.log('progressed_last_year raw:', latest.progressed_last_year, typeof latest.progressed_last_year)
          // Pre-fill form with existing data
          this.form = {
            currently_enrolled: latest.currently_enrolled === true || latest.currently_enrolled === 1 || latest.currently_enrolled === '1' || latest.currently_enrolled === 'yes' ? 'yes' : 
                               latest.currently_enrolled === false || latest.currently_enrolled === 0 || latest.currently_enrolled === '0' || latest.currently_enrolled === 'no' ? 'no' : '',
            attending_regularly: latest.attending_regularly === true || latest.attending_regularly === 1 || latest.attending_regularly === '1' || latest.attending_regularly === 'yes' ? 'yes' : 
                                latest.attending_regularly === false || latest.attending_regularly === 0 || latest.attending_regularly === '0' || latest.attending_regularly === 'no' ? 'no' : '',
            progressed_last_year: latest.progressed_last_year === true || latest.progressed_last_year === 1 || latest.progressed_last_year === '1' || latest.progressed_last_year === 'yes' ? 'yes' : 
                                 latest.progressed_last_year === false || latest.progressed_last_year === 0 || latest.progressed_last_year === '0' || latest.progressed_last_year === 'no' ? 'no' : '',
            teacher_opinion: latest.teacher_opinion || '',
            classroom_behavior: latest.classroom_behavior || ''
          }
          console.log('Education form after loading:', this.form)
          // Force Vue to update the radio buttons
          this.$nextTick(() => {
            this.$forceUpdate()
          })
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
          currently_enrolled: this.form.currently_enrolled,
          attending_regularly: this.form.attending_regularly,
          progressed_last_year: this.form.progressed_last_year,
          teacher_opinion: this.form.teacher_opinion,
          classroom_behavior: this.form.classroom_behavior
        }
        
        console.log('Sending assessment data:', assessmentData)
        await assessmentsAPI.create(childId, assessmentData)
        
        this.$router.push(`/assessments/child/${childId}/care-protection`)
      } catch (error) {
        console.error('Error saving assessment:', error)
        console.error('Error response:', error.response?.data)
        console.error('Error status:', error.response?.status)
        
        let errorMessage = 'Error saving assessment. Please try again.'
        if (error.response?.status === 401) {
          errorMessage = 'Please log in to continue.'
          this.$router.push('/login')
        } else if (error.response?.data?.message) {
          errorMessage = error.response.data.message
        }
        
        alert(errorMessage)
      }
    }
  }
}
</script>
