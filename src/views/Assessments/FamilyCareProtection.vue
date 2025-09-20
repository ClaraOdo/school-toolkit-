<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
    <div class="bg-white shadow rounded-lg">
      <div class="px-6 py-4 border-b border-gray-200">
        <h1 class="text-2xl font-bold text-gray-900">Family Assessment - Care & Protection + Community</h1>
        <p class="mt-1 text-sm text-gray-600">Final Step</p>
      </div>

      <form @submit.prevent="submitSection" class="p-6 space-y-8">
        <!-- Care and Protection -->
        <div class="bg-gray-50 p-4 rounded-lg">
          <h2 class="text-lg font-semibold text-gray-900 mb-4">Care and Protection</h2>
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">In the past 12 months, have all the children in this household been under the care of and lived with an adult Caregiver?</label>
              <div class="space-y-2">
                <label class="flex items-center">
                  <input v-model="form.childrenWithCaregiver" type="radio" value="yes" class="mr-2">
                  Yes
                </label>
                <label class="flex items-center">
                  <input v-model="form.childrenWithCaregiver" type="radio" value="no" class="mr-2">
                  No
                </label>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">In the past 6 months, are there any children in this household who have been withdrawn or consistently sad, unhappy, or depressed?</label>
              <div class="space-y-2">
                <label class="flex items-center">
                  <input v-model="form.childrenWithdrawn" type="radio" value="yes" class="mr-2">
                  Yes
                </label>
                <label class="flex items-center">
                  <input v-model="form.childrenWithdrawn" type="radio" value="no" class="mr-2">
                  No
                </label>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">What would you do if any of your children experienced or became a victim of child abuse or violence?</label>
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
                  <input v-model="form.reportingMechanism" type="radio" value="neighbor" class="mr-2">
                  Report to a neighbour
                </label>
                <label class="flex items-center">
                  <input v-model="form.reportingMechanism" type="radio" value="community-leader" class="mr-2">
                  Report to a community leader
                </label>
                <label class="flex items-center">
                  <input v-model="form.reportingMechanism" type="radio" value="police" class="mr-2">
                  Report to police
                </label>
                <label class="flex items-center">
                  <input v-model="form.reportingMechanism" type="radio" value="authority" class="mr-2">
                  Report to an authority at the sub county/district
                </label>
                <label class="flex items-center">
                  <input v-model="form.reportingMechanism" type="radio" value="nothing" class="mr-2">
                  Nothing
                </label>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">In the past 6 months, has any child in this household experienced any of the following?</label>
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
                      <td class="border border-gray-300 px-4 py-2">Sexually abused, defiled, or forced to have sex</td>
                      <td class="border border-gray-300 px-4 py-2 text-center">
                        <input v-model="form.experiences.sexualAbuse" type="radio" value="yes">
                      </td>
                      <td class="border border-gray-300 px-4 py-2 text-center">
                        <input v-model="form.experiences.sexualAbuse" type="radio" value="no">
                      </td>
                    </tr>
                    <tr>
                      <td class="border border-gray-300 px-4 py-2">A meal withheld to punish him/her</td>
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

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Do all children in this household have a birth certificate?</label>
              <div class="space-y-2">
                <label class="flex items-center">
                  <input v-model="form.birthCertificates" type="radio" value="all-long" class="mr-2">
                  Yes, all with long birth certificate
                </label>
                <label class="flex items-center">
                  <input v-model="form.birthCertificates" type="radio" value="all-short" class="mr-2">
                  Yes, all with short birth certificate
                </label>
                <label class="flex items-center">
                  <input v-model="form.birthCertificates" type="radio" value="mixed" class="mr-2">
                  Yes, some with short and others with long birth certificate
                </label>
                <label class="flex items-center">
                  <input v-model="form.birthCertificates" type="radio" value="no" class="mr-2">
                  No
                </label>
                <label class="flex items-center">
                  <input v-model="form.birthCertificates" type="radio" value="dont-know" class="mr-2">
                  Don't know
                </label>
              </div>
            </div>
          </div>
        </div>

        <!-- Community and Social Connections -->
        <div class="bg-gray-50 p-4 rounded-lg">
          <h2 class="text-lg font-semibold text-gray-900 mb-4">Community and Social Connections</h2>
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Does the family have access to community services?</label>
              <div class="space-y-2">
                <label class="flex items-center">
                  <input v-model="form.accessToCommunityServices" type="radio" value="yes" class="mr-2">
                  Yes
                </label>
                <label class="flex items-center">
                  <input v-model="form.accessToCommunityServices" type="radio" value="no" class="mr-2">
                  No
                </label>
              </div>
            </div>

            <div v-if="form.accessToCommunityServices === 'yes'">
              <label class="block text-sm font-medium text-gray-700 mb-2">What community services does the family have access to?</label>
              <div class="space-y-2">
                <label class="flex items-center">
                  <input v-model="form.communityServices" type="checkbox" value="education" class="mr-2">
                  Education (schools)
                </label>
                <label class="flex items-center">
                  <input v-model="form.communityServices" type="checkbox" value="church" class="mr-2">
                  Church
                </label>
                <label class="flex items-center">
                  <input v-model="form.communityServices" type="checkbox" value="water" class="mr-2">
                  Water
                </label>
                <label class="flex items-center">
                  <input v-model="form.communityServices" type="checkbox" value="security" class="mr-2">
                  Security
                </label>
                <label class="flex items-center">
                  <input v-model="form.communityServices" type="checkbox" value="protection" class="mr-2">
                  Protection by authorities from crime, land grabbing, etc.
                </label>
                <label class="flex items-center">
                  <input v-model="form.communityServices" type="checkbox" value="other" class="mr-2">
                  Other (specify)
                </label>
                <input v-if="form.communityServices.includes('other')" v-model="form.communityServicesOther" type="text" placeholder="Specify other services" class="form-input ml-6">
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Is the family connected to community leaders, church, neighbours, schools, etc.?</label>
              <div class="space-y-2">
                <label class="flex items-center">
                  <input v-model="form.connectedToCommunity" type="radio" value="yes" class="mr-2">
                  Yes
                </label>
                <label class="flex items-center">
                  <input v-model="form.connectedToCommunity" type="radio" value="no" class="mr-2">
                  No
                </label>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Is the family accepted within the community?</label>
              <div class="space-y-2">
                <label class="flex items-center">
                  <input v-model="form.acceptedInCommunity" type="radio" value="yes" class="mr-2">
                  Yes
                </label>
                <label class="flex items-center">
                  <input v-model="form.acceptedInCommunity" type="radio" value="no" class="mr-2">
                  No
                </label>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Are community risks evident (e.g., high crime, drug use, prostitution)?</label>
              <div class="space-y-2">
                <label class="flex items-center">
                  <input v-model="form.communityRisks" type="radio" value="yes" class="mr-2">
                  Yes
                </label>
                <label class="flex items-center">
                  <input v-model="form.communityRisks" type="radio" value="no" class="mr-2">
                  No
                </label>
              </div>
            </div>
          </div>
        </div>

        <div class="flex justify-between">
          <button type="button" @click="$router.push(`/assessments/family/${$route.params.childId}/health`)" class="btn btn-secondary">
            Back to Health
          </button>
          <button type="submit" class="btn btn-primary">
            Complete Family Assessment
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FamilyCareProtection',
  data() {
    return {
      form: {
        childrenWithCaregiver: '',
        childrenWithdrawn: '',
        reportingMechanism: '',
        experiences: {
          physicalAbuse: '',
          sexualAbuse: '',
          mealWithheld: '',
          childLabour: ''
        },
        birthCertificates: '',
        accessToCommunityServices: '',
        communityServices: [],
        communityServicesOther: '',
        connectedToCommunity: '',
        acceptedInCommunity: '',
        communityRisks: ''
      }
    }
  },
  methods: {
    async submitSection() {
      try {
        console.log('Completing family assessment:', this.form)
        this.$router.push('/assessments?success=family-assessment-completed')
      } catch (error) {
        console.error('Error completing assessment:', error)
      }
    }
  }
}
</script>
