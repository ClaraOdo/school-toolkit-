<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
    <div class="bg-white shadow rounded-lg">
      <div class="px-6 py-4 border-b border-gray-200">
        <h1 class="text-2xl font-bold text-gray-900">Child Assessment - Economic & Future Plans</h1>
        <p class="mt-1 text-sm text-gray-600">Final Step for {{ childData.childName }}</p>
      </div>

      <form @submit.prevent="submitSection" class="p-6 space-y-8">
        <!-- Economic situation of the child's household -->
        <div class="bg-gray-50 p-4 rounded-lg">
          <h2 class="text-lg font-semibold text-gray-900 mb-4">Economic Situation of the Child's Household (caregivers)</h2>
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Does the household/primary caregiver have a reliable source of livelihood?</label>
              <div class="space-y-2">
                <label class="flex items-center">
                  <input v-model="form.reliable_livelihood" type="radio" value="yes" class="mr-2">
                  Yes
                </label>
                <label class="flex items-center">
                  <input v-model="form.reliable_livelihood" type="radio" value="no" class="mr-2">
                  No
                </label>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">What is the livelihood source?</label>
              <div class="space-y-2">
                <label class="flex items-center">
                  <input v-model="form.livelihood_source" type="radio" value="formal-employment" class="mr-2">
                  Formal employment
                </label>
                <label class="flex items-center">
                  <input v-model="form.livelihood_source" type="radio" value="informal-employment" class="mr-2">
                  Informal employment/self-employment
                </label>
                <label class="flex items-center">
                  <input v-model="form.livelihood_source" type="radio" value="household-business" class="mr-2">
                  Household/personal business
                </label>
                <label class="flex items-center">
                  <input v-model="form.livelihood_source" type="radio" value="other" class="mr-2">
                  Other (specify)
                </label>
                <input v-if="form.livelihood_source === 'other'" v-model="form.livelihood_source_other" type="text" placeholder="Specify other source" class="form-input ml-6">
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Is the household/primary caregiver able to pay the child's school fees and other requirements?</label>
              <div class="space-y-2">
                <label class="flex items-center">
                  <input v-model="form.able_to_pay_school_fees" type="radio" value="yes" class="mr-2">
                  Yes
                </label>
                <label class="flex items-center">
                  <input v-model="form.able_to_pay_school_fees" type="radio" value="no" class="mr-2">
                  No
                </label>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Is the household/primary caregiver able to meet the child's basic needs at school?</label>
              <div class="space-y-2">
                <label class="flex items-center">
                  <input v-model="form.able_to_meet_basic_needs" type="radio" value="yes" class="mr-2">
                  Yes
                </label>
                <label class="flex items-center">
                  <input v-model="form.able_to_meet_basic_needs" type="radio" value="no" class="mr-2">
                  No
                </label>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">What is your rating of the primary caregivers' commitment to cover the child's school dues and personal requirements?</label>
              <div class="space-y-2">
                <label class="flex items-center">
                  <input v-model="form.caregiver_commitment" type="radio" value="very_committed" class="mr-2">
                  Very committed
                </label>
                <label class="flex items-center">
                  <input v-model="form.caregiver_commitment" type="radio" value="somehow_committed" class="mr-2">
                  Somehow committed
                </label>
                <label class="flex items-center">
                  <input v-model="form.caregiver_commitment" type="radio" value="not_committed" class="mr-2">
                  Not committed at all
                </label>
                <label class="flex items-center">
                  <input v-model="form.caregiver_commitment" type="radio" value="dont_know" class="mr-2">
                  Don't know
                </label>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">How would you rate the economic situation of the child's household?</label>
              <div class="space-y-2">
                <label class="flex items-center">
                  <input v-model="form.economic_situation" type="radio" value="economically_stable" class="mr-2">
                  Economically stable
                </label>
                <label class="flex items-center">
                  <input v-model="form.economic_situation" type="radio" value="somewhat_struggling" class="mr-2">
                  Somewhat struggling
                </label>
                <label class="flex items-center">
                  <input v-model="form.economic_situation" type="radio" value="critically_vulnerable" class="mr-2">
                  Critically vulnerable
                </label>
                <label class="flex items-center">
                  <input v-model="form.economic_situation" type="radio" value="destitute" class="mr-2">
                  Destitute
                </label>
              </div>
            </div>
          </div>
        </div>

        <!-- Child's future plans -->
        <div class="bg-gray-50 p-4 rounded-lg">
          <h2 class="text-lg font-semibold text-gray-900 mb-4">Child's Future Plans</h2>
          <div>
            <label class="block text-sm font-medium text-gray-700">What are your future plans?</label>
            <textarea v-model="form.future_plans" rows="4" class="form-input" placeholder="Describe the child's future plans and aspirations..."></textarea>
          </div>
        </div>

        <!-- Additional Notes -->
        <div class="bg-gray-50 p-4 rounded-lg">
          <h2 class="text-lg font-semibold text-gray-900 mb-4">Additional Notes</h2>
          <div>
            <label class="block text-sm font-medium text-gray-700">Add any additional observations or notes</label>
            <textarea v-model="form.notes" rows="4" class="form-input" placeholder="Any additional observations, concerns, or recommendations..."></textarea>
          </div>
        </div>

        <div class="flex justify-between">
          <button type="button" @click="$router.push(`/assessments/child/${$route.params.childId}/emotional`)" class="btn btn-secondary">
            Back to Emotional
          </button>
          <button type="submit" class="btn btn-primary">
            Complete Assessment
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import api from '../../services/api'

export default {
  name: 'ChildEconomic',
  data() {
    return {
      childData: { childName: 'Loading...' },
      form: {
        reliable_livelihood: '',
        livelihood_source: '',
        livelihood_source_other: '',
        able_to_pay_school_fees: '',
        able_to_meet_basic_needs: '',
        caregiver_commitment: '',
        economic_situation: '',
        future_plans: '',
        notes: ''
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
        const response = await this.$api.get(`/children/${childId}`)
        if (response.data?.data) {
          this.childData = { childName: response.data.data.name }
        } else {
          this.childData = { childName: 'Unknown Child' }
        }
        
        // Load existing assessment data
        const assessmentResponse = await this.$api.get(`/children/${childId}/assessments`)
        if (assessmentResponse.data?.data?.length > 0) {
          const latest = assessmentResponse.data.data[0]
          this.form = {
            reliable_livelihood: latest.reliable_livelihood === true || latest.reliable_livelihood === 1 || latest.reliable_livelihood === '1' || latest.reliable_livelihood === 'yes' ? 'yes' : 
                                latest.reliable_livelihood === false || latest.reliable_livelihood === 0 || latest.reliable_livelihood === '0' || latest.reliable_livelihood === 'no' ? 'no' : '',
            livelihood_source: latest.livelihood_source || '',
            able_to_pay_school_fees: latest.able_to_pay_school_fees === true || latest.able_to_pay_school_fees === 1 || latest.able_to_pay_school_fees === '1' || latest.able_to_pay_school_fees === 'yes' ? 'yes' : 
                                    latest.able_to_pay_school_fees === false || latest.able_to_pay_school_fees === 0 || latest.able_to_pay_school_fees === '0' || latest.able_to_pay_school_fees === 'no' ? 'no' : '',
            able_to_meet_basic_needs: latest.able_to_meet_basic_needs === true || latest.able_to_meet_basic_needs === 1 || latest.able_to_meet_basic_needs === '1' || latest.able_to_meet_basic_needs === 'yes' ? 'yes' : 
                                     latest.able_to_meet_basic_needs === false || latest.able_to_meet_basic_needs === 0 || latest.able_to_meet_basic_needs === '0' || latest.able_to_meet_basic_needs === 'no' ? 'no' : '',
            caregiver_commitment: latest.caregiver_commitment || '',
            economic_situation: latest.economic_situation || '',
            future_plans: latest.future_plans || '',
            notes: latest.notes || ''
          }
        }
      } catch (error) {
        console.error('Error loading child data:', error)
        this.childData = { childName: 'Unknown Child' }
      }
    },
    async submitSection() {
      try {
        const childId = this.$route.params.childId
        
        const payload = {
          section: 'economic',
          reliable_livelihood: this.form.reliable_livelihood || null,
          livelihood_source: this.form.livelihood_source || null,
          able_to_pay_school_fees: this.form.able_to_pay_school_fees || null,
          able_to_meet_basic_needs: this.form.able_to_meet_basic_needs || null,
          caregiver_commitment: this.form.caregiver_commitment || null,
          economic_situation: this.form.economic_situation || null,
          future_plans: this.form.future_plans || null,
          notes: this.form.notes || null
        }
        
        console.log('Sending payload:', payload)
        const response = await this.$api.post(`/children/${childId}/assessments`, payload)
        console.log('Response received:', response.data)
        this.$router.push('/assessments?success=child-assessment-completed')
      } catch (error) {
        console.error('Error completing assessment:', error)
        console.error('Error response:', error.response?.data)
        alert('Error saving assessment. Please try again.')
      }
    }
  }
}
</script>
