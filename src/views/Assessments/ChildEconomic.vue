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
                  <input v-model="form.reliableLivelihood" type="radio" value="yes" class="mr-2">
                  Yes
                </label>
                <label class="flex items-center">
                  <input v-model="form.reliableLivelihood" type="radio" value="no" class="mr-2">
                  No
                </label>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">What is the livelihood source?</label>
              <div class="space-y-2">
                <label class="flex items-center">
                  <input v-model="form.livelihoodSource" type="radio" value="formal-employment" class="mr-2">
                  Formal employment
                </label>
                <label class="flex items-center">
                  <input v-model="form.livelihoodSource" type="radio" value="informal-employment" class="mr-2">
                  Informal employment/self-employment
                </label>
                <label class="flex items-center">
                  <input v-model="form.livelihoodSource" type="radio" value="household-business" class="mr-2">
                  Household/personal business
                </label>
                <label class="flex items-center">
                  <input v-model="form.livelihoodSource" type="radio" value="other" class="mr-2">
                  Other (specify)
                </label>
                <input v-if="form.livelihoodSource === 'other'" v-model="form.livelihoodSourceOther" type="text" placeholder="Specify other source" class="form-input ml-6">
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Is the household/primary caregiver able to pay the child's school fees and other requirements?</label>
              <div class="space-y-2">
                <label class="flex items-center">
                  <input v-model="form.ableToPaySchoolFees" type="radio" value="yes" class="mr-2">
                  Yes
                </label>
                <label class="flex items-center">
                  <input v-model="form.ableToPaySchoolFees" type="radio" value="no" class="mr-2">
                  No
                </label>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Is the household/primary caregiver able to meet the child's basic needs at school?</label>
              <div class="space-y-2">
                <label class="flex items-center">
                  <input v-model="form.ableToMeetBasicNeeds" type="radio" value="yes" class="mr-2">
                  Yes
                </label>
                <label class="flex items-center">
                  <input v-model="form.ableToMeetBasicNeeds" type="radio" value="no" class="mr-2">
                  No
                </label>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">What is your rating of the primary caregivers' commitment to cover the child's school dues and personal requirements?</label>
              <div class="space-y-2">
                <label class="flex items-center">
                  <input v-model="form.caregiverCommitment" type="radio" value="very-committed" class="mr-2">
                  Very committed
                </label>
                <label class="flex items-center">
                  <input v-model="form.caregiverCommitment" type="radio" value="somehow-committed" class="mr-2">
                  Somehow committed
                </label>
                <label class="flex items-center">
                  <input v-model="form.caregiverCommitment" type="radio" value="not-committed" class="mr-2">
                  Not committed at all
                </label>
                <label class="flex items-center">
                  <input v-model="form.caregiverCommitment" type="radio" value="dont-know" class="mr-2">
                  Don't know
                </label>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">How would you rate the economic situation of the child's household?</label>
              <div class="space-y-2">
                <label class="flex items-center">
                  <input v-model="form.economicSituation" type="radio" value="economically-stable" class="mr-2">
                  Economically stable
                </label>
                <label class="flex items-center">
                  <input v-model="form.economicSituation" type="radio" value="somewhat-struggling" class="mr-2">
                  Somewhat struggling
                </label>
                <label class="flex items-center">
                  <input v-model="form.economicSituation" type="radio" value="critically-vulnerable" class="mr-2">
                  Critically vulnerable
                </label>
                <label class="flex items-center">
                  <input v-model="form.economicSituation" type="radio" value="destitute" class="mr-2">
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
            <textarea v-model="form.futurePlans" rows="4" class="form-input" placeholder="Describe the child's future plans and aspirations..."></textarea>
          </div>
        </div>

        <!-- Additional Notes -->
        <div class="bg-gray-50 p-4 rounded-lg">
          <h2 class="text-lg font-semibold text-gray-900 mb-4">Additional Notes</h2>
          <div>
            <label class="block text-sm font-medium text-gray-700">Add any additional observations or notes</label>
            <textarea v-model="form.additionalNotes" rows="4" class="form-input" placeholder="Any additional observations, concerns, or recommendations..."></textarea>
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
export default {
  name: 'ChildEconomic',
  data() {
    return {
      childData: { childName: 'Loading...' },
      form: {
        reliableLivelihood: '',
        livelihoodSource: '',
        livelihoodSourceOther: '',
        ableToPaySchoolFees: '',
        ableToMeetBasicNeeds: '',
        caregiverCommitment: '',
        economicSituation: '',
        futurePlans: '',
        additionalNotes: ''
      }
    }
  },
  async mounted() {
    await this.loadChildData()
  },
  methods: {
    async loadChildData() {
      const childId = this.$route.params.childId
      const mockChildren = {
        1: { childName: 'John Doe' },
        2: { childName: 'Jane Smith' },
        3: { childName: 'Mary Johnson' }
      }
      this.childData = mockChildren[childId] || { childName: 'Unknown Child' }
    },
    async submitSection() {
      try {
        const childId = this.$route.params.childId
        console.log('Completing assessment:', this.form)
        
        // Final submission to API
        // await completeAssessment(childId, this.form)
        
        // Redirect to assessments with success message
        this.$router.push('/assessments?success=child-assessment-completed')
      } catch (error) {
        console.error('Error completing assessment:', error)
      }
    }
  }
}
</script>
