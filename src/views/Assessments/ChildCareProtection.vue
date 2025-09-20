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
              <label class="block text-sm font-medium text-gray-700 mb-2">In the past 12 months, have you been under the care of and lived with the same adult primary Caregiver?</label>
              <div class="space-y-2">
                <label class="flex items-center">
                  <input v-model="form.sameCaregiverPast12Months" type="radio" value="yes" class="mr-2">
                  Yes
                </label>
                <label class="flex items-center">
                  <input v-model="form.sameCaregiverPast12Months" type="radio" value="no" class="mr-2">
                  No
                </label>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">In the past 6 months have you been feeling withdrawn or consistently sad, unhappy, or depressed?</label>
              <div class="space-y-2">
                <label class="flex items-center">
                  <input v-model="form.feelingWithdrawn" type="radio" value="yes" class="mr-2">
                  Yes
                </label>
                <label class="flex items-center">
                  <input v-model="form.feelingWithdrawn" type="radio" value="no" class="mr-2">
                  No
                </label>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">What would you do if you experienced or became a victim of abuse or violence?</label>
              <div class="space-y-2">
                <label class="flex items-center">
                  <input v-model="form.reportingMechanism" type="radio" value="primary-caregiver" class="mr-2">
                  Report to the primary caregiver
                </label>
                <label class="flex items-center">
                  <input v-model="form.reportingMechanism" type="radio" value="family-member" class="mr-2">
                  Report to another family member
                </label>
                <label class="flex items-center">
                  <input v-model="form.reportingMechanism" type="radio" value="teacher" class="mr-2">
                  Report to a teacher
                </label>
                <label class="flex items-center">
                  <input v-model="form.reportingMechanism" type="radio" value="police" class="mr-2">
                  Report to police
                </label>
                <label class="flex items-center">
                  <input v-model="form.reportingMechanism" type="radio" value="nothing" class="mr-2">
                  Nothing
                </label>
              </div>
            </div>

            <!-- Experience Table -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">In the past 6 months, have any of the following happened to you?</label>
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
                        <input v-model="form.experiences.physicalAbuse" type="radio" value="yes">
                      </td>
                      <td class="border border-gray-300 px-4 py-2 text-center">
                        <input v-model="form.experiences.physicalAbuse" type="radio" value="no">
                      </td>
                    </tr>
                    <tr>
                      <td class="border border-gray-300 px-4 py-2">Sexual abuse or inappropriate touching</td>
                      <td class="border border-gray-300 px-4 py-2 text-center">
                        <input v-model="form.experiences.sexualAbuse" type="radio" value="yes">
                      </td>
                      <td class="border border-gray-300 px-4 py-2 text-center">
                        <input v-model="form.experiences.sexualAbuse" type="radio" value="no">
                      </td>
                    </tr>
                    <tr>
                      <td class="border border-gray-300 px-4 py-2">Meal withheld as punishment</td>
                      <td class="border border-gray-300 px-4 py-2 text-center">
                        <input v-model="form.experiences.mealWithheld" type="radio" value="yes">
                      </td>
                      <td class="border border-gray-300 px-4 py-2 text-center">
                        <input v-model="form.experiences.mealWithheld" type="radio" value="no">
                      </td>
                    </tr>
                    <tr>
                      <td class="border border-gray-300 px-4 py-2">Involved in child labour</td>
                      <td class="border border-gray-300 px-4 py-2 text-center">
                        <input v-model="form.experiences.childLabour" type="radio" value="yes">
                      </td>
                      <td class="border border-gray-300 px-4 py-2 text-center">
                        <input v-model="form.experiences.childLabour" type="radio" value="no">
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div class="flex justify-between">
          <button type="button" @click="$router.push(`/assessments/child/${$route.params.childId}`)" class="btn btn-secondary">
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
export default {
  name: 'ChildCareProtection',
  data() {
    return {
      childData: { childName: 'Loading...' },
      form: {
        sameCaregiverPast12Months: '',
        feelingWithdrawn: '',
        reportingMechanism: '',
        experiences: {
          physicalAbuse: '',
          sexualAbuse: '',
          mealWithheld: '',
          childLabour: ''
        }
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
        console.log('Saving care protection section:', this.form)
        this.$router.push(`/assessments/child/${childId}/health`)
      } catch (error) {
        console.error('Error saving section:', error)
      }
    }
  }
}
</script>
