<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
    <div class="bg-white shadow rounded-lg">
      <div class="px-6 py-4 border-b border-gray-200">
        <h1 class="text-2xl font-bold text-gray-900">Child Assessment - Care and Protection</h1>
        <p class="mt-1 text-sm text-gray-600">Step 2 of 4 for {{ childData.childName }}</p>
      </div>

      <form @submit.prevent="submitSection" class="p-6 space-y-8">
        <!-- Care and Protection -->
        <div class="bg-gray-50 p-4 rounded-lg">
          <h2 class="text-lg font-semibold text-gray-900 mb-4">Care and Protection</h2>
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">In the past 12 months, have you been under the
                care of and lived with the same adult primary Caregiver?</label>
              <div class="space-y-2">
                <label class="flex items-center">
                  <input v-model="form.stable_caregiver_12_months" type="radio" value="yes" class="mr-2">
                  Yes
                </label>
                <label class="flex items-center">
                  <input v-model="form.stable_caregiver_12_months" type="radio" value="no" class="mr-2">
                  No
                </label>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">In the past 6 months have you been feeling
                withdrawn or consistently sad, unhappy, or depressed?</label>
              <div class="space-y-2">
                <label class="flex items-center">
                  <input v-model="form.feeling_withdrawn_6_months" type="radio" value="yes" class="mr-2">
                  Yes
                </label>
                <label class="flex items-center">
                  <input v-model="form.feeling_withdrawn_6_months" type="radio" value="no" class="mr-2">
                  No
                </label>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">What would you do if you experienced or became
                a victim of abuse or violence?</label>
              <div class="space-y-2">
                <label class="flex items-center">
                  <input v-model="form.abuse_reporting_knowledge" type="radio" value="primary-caregiver" class="mr-2">
                  Report to the primary caregiver
                </label>
                <label class="flex items-center">
                  <input v-model="form.abuse_reporting_knowledge" type="radio" value="family-member" class="mr-2">
                  Report to another family member
                </label>
                <label class="flex items-center">
                  <input v-model="form.abuse_reporting_knowledge" type="radio" value="teacher" class="mr-2">
                  Report to a teacher
                </label>
                <label class="flex items-center">
                  <input v-model="form.abuse_reporting_knowledge" type="radio" value="police" class="mr-2">
                  Report to police
                </label>
                <label class="flex items-center">
                  <input v-model="form.abuse_reporting_knowledge" type="radio" value="nothing" class="mr-2">
                  Nothing
                </label>
              </div>
            </div>

            <!-- Experience Table -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">In the past 6 months, have any of the
                following happened to you?</label>
              <div class="overflow-x-auto">
                <table class="min-w-full border border-gray-300">
                  <thead class="bg-gray-100">
                    <tr>
                      <th class="border border-gray-300 px-4 py-2 text-left">Experience</th>
                      <th class="border border-gray-300 px-4 py-2">Yes</th>
                      <th class="border border-gray-300 px-4 py-2">No</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="border border-gray-300 px-4 py-2">Physical abuse that caused body harm</td>
                      <td class="border border-gray-300 px-4 py-2 text-center">
                        <input v-model="form.experiences.physical_abuse" type="radio" value="yes">
                      </td>
                      <td class="border border-gray-300 px-4 py-2 text-center">
                        <input v-model="form.experiences.physical_abuse" type="radio" value="no">
                      </td>
                    </tr>
                    <tr>
                      <td class="border border-gray-300 px-4 py-2">Sexual abuse or inappropriate touching</td>
                      <td class="border border-gray-300 px-4 py-2 text-center">
                        <input v-model="form.experiences.sexual_abuse" type="radio" value="yes">
                      </td>
                      <td class="border border-gray-300 px-4 py-2 text-center">
                        <input v-model="form.experiences.sexual_abuse" type="radio" value="no">
                      </td>
                    </tr>
                    <tr>
                      <td class="border border-gray-300 px-4 py-2">Meal withheld as punishment</td>
                      <td class="border border-gray-300 px-4 py-2 text-center">
                        <input v-model="form.experiences.meal_withheld" type="radio" value="yes">
                      </td>
                      <td class="border border-gray-300 px-4 py-2 text-center">
                        <input v-model="form.experiences.meal_withheld" type="radio" value="no">
                      </td>
                    </tr>
                    <tr>
                      <td class="border border-gray-300 px-4 py-2">Involved in child labour</td>
                      <td class="border border-gray-300 px-4 py-2 text-center">
                        <input v-model="form.experiences.child_labour" type="radio" value="yes">
                      </td>
                      <td class="border border-gray-300 px-4 py-2 text-center">
                        <input v-model="form.experiences.child_labour" type="radio" value="no">
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div class="flex justify-between">
          <button type="button" @click="$router.push(`/assessments/child/${$route.params.childId}`)"
            class="btn btn-secondary">
            Back to Education
          </button>
          <button type="submit" class="btn btn-primary">
            Save & Continue to Health
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import api from '../../services/api'

export default {
  name: 'ChildCareProtection',
  data() {
    return {
      childData: { childName: 'Loading...' },
      form: {
        stable_caregiver_12_months: '',
        feeling_withdrawn_6_months: '',
        abuse_reporting_knowledge: '',
        experiences: {
          physical_abuse: '',
          sexual_abuse: '',
          meal_withheld: '',
          child_labour: ''
        }
      }
    }
  },
  async mounted() {
    this.$api = api
    await this.loadChildData()
  },
  methods: {
    async loadChildData() {
      try {
        const childId = this.$route.params.childId
        console.log('Loading child ID:', childId)
        const response = await this.$api.get(`/children/${childId}`)
        console.log('Child API response:', response.data)
        if (response.data && response.data.name) {
          this.childData = { childName: response.data.name }
          console.log('Child data set to:', this.childData)
        } else {
          this.childData = { childName: 'Unknown Child' }
        }
        
        // Load existing assessment data
        const assessmentResponse = await this.$api.get(`/children/${childId}/assessments`)
        console.log('Assessment response:', assessmentResponse.data)
        if (assessmentResponse.data?.data?.length > 0) {
          const latest = assessmentResponse.data.data[0]
          console.log('Latest assessment data:', latest)
          console.log('stable_caregiver_12_months raw:', latest.stable_caregiver_12_months)
          console.log('feeling_withdrawn_6_months raw:', latest.feeling_withdrawn_6_months)
          this.form = {
            stable_caregiver_12_months: latest.stable_caregiver_12_months === true || latest.stable_caregiver_12_months === 1 || latest.stable_caregiver_12_months === '1' || latest.stable_caregiver_12_months === 'yes' ? 'yes' : 
                                       latest.stable_caregiver_12_months === false || latest.stable_caregiver_12_months === 0 || latest.stable_caregiver_12_months === '0' || latest.stable_caregiver_12_months === 'no' ? 'no' : '',
            feeling_withdrawn_6_months: latest.feeling_withdrawn_6_months === true || latest.feeling_withdrawn_6_months === 1 || latest.feeling_withdrawn_6_months === '1' || latest.feeling_withdrawn_6_months === 'yes' ? 'yes' : 
                                       latest.feeling_withdrawn_6_months === false || latest.feeling_withdrawn_6_months === 0 || latest.feeling_withdrawn_6_months === '0' || latest.feeling_withdrawn_6_months === 'no' ? 'no' : '',
            abuse_reporting_knowledge: latest.abuse_reporting_knowledge || '',
            experiences: {
              physical_abuse: (latest.physical_abuse || [])[0] === 'experienced' ? 'yes' : (latest.physical_abuse || [])[0] === 'not_experienced' ? 'no' : '',
              sexual_abuse: (latest.sexual_abuse || [])[0] === 'experienced' ? 'yes' : (latest.sexual_abuse || [])[0] === 'not_experienced' ? 'no' : '',
              meal_withheld: (latest.meal_withheld || [])[0] === 'experienced' ? 'yes' : (latest.meal_withheld || [])[0] === 'not_experienced' ? 'no' : '',
              child_labour: (latest.child_labour || [])[0] === 'experienced' ? 'yes' : (latest.child_labour || [])[0] === 'not_experienced' ? 'no' : ''
            }
          }
          console.log('Form after loading:', this.form)
          // Force Vue to re-render the form
          this.$nextTick(() => {
            this.$forceUpdate()
          })
        }
      } catch (error) {
        console.error('Error loading child:', error)
        this.childData = { childName: 'Unknown Child' }
      }
    },
    mapReportingKnowledge(knowledge) {
      const map = {
        'basic': 'primary-caregiver',
        'good': 'teacher',
        'excellent': 'police',
        'none': 'nothing'
      }
      return map[knowledge] || ''
    },
    async submitSection() {
      try {
        const childId = this.$route.params.childId
        
        // Map frontend values to backend enum values
        const reportingMap = {
          'primary-caregiver': 'basic',
          'family-member': 'basic', 
          'teacher': 'good',
          'police': 'excellent',
          'nothing': 'none'
        }
        
        const payload = {
          section: 'care_protection',
          stable_caregiver_12_months: this.form.stable_caregiver_12_months,
          feeling_withdrawn_6_months: this.form.feeling_withdrawn_6_months,
          abuse_reporting_knowledge: this.form.abuse_reporting_knowledge,
          physical_abuse: [this.form.experiences.physical_abuse === 'yes' ? 'experienced' : 'not_experienced'],
          sexual_abuse: [this.form.experiences.sexual_abuse === 'yes' ? 'experienced' : 'not_experienced'],
          meal_withheld: [this.form.experiences.meal_withheld === 'yes' ? 'experienced' : 'not_experienced'],
          child_labour: [this.form.experiences.child_labour === 'yes' ? 'experienced' : 'not_experienced']
        }
        
        console.log('Submitting care protection payload:', payload)
        await this.$api.post(`/children/${childId}/assessments`, payload)
        this.$router.push(`/assessments/child/${childId}/health`)
      } catch (error) {
        console.error('Error saving section:', error)
        console.error('Error response:', error.response?.data)
        alert('Error saving assessment. Please try again.')
      }
    }
  }
}
</script>
