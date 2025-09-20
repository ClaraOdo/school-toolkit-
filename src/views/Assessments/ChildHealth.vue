<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
    <div class="bg-white shadow rounded-lg">
      <div class="px-6 py-4 border-b border-gray-200">
        <h1 class="text-2xl font-bold text-gray-900">Child Assessment - Health & Nutrition</h1>
        <p class="mt-1 text-sm text-gray-600">Step 3 of 4 for {{ childData.childName }}</p>
      </div>

      <form @submit.prevent="submitSection" class="p-6 space-y-8">
        <!-- Food and Nutrition -->
        <div class="bg-gray-50 p-4 rounded-lg">
          <h2 class="text-lg font-semibold text-gray-900 mb-4">Food and Nutrition</h2>
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Does the child have access to adequate food at school?</label>
              <div class="space-y-2">
                <label class="flex items-center">
                  <input v-model="form.adequateFoodAtSchool" type="radio" value="yes" class="mr-2">
                  Yes
                </label>
                <label class="flex items-center">
                  <input v-model="form.adequateFoodAtSchool" type="radio" value="no" class="mr-2">
                  No
                </label>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Does the child have access to adequate food at home?</label>
              <div class="space-y-2">
                <label class="flex items-center">
                  <input v-model="form.adequateFoodAtHome" type="radio" value="yes" class="mr-2">
                  Yes
                </label>
                <label class="flex items-center">
                  <input v-model="form.adequateFoodAtHome" type="radio" value="no" class="mr-2">
                  No
                </label>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Does the child have access to safe drinking water?</label>
              <div class="space-y-2">
                <label class="flex items-center">
                  <input v-model="form.safeDrinkingWater" type="radio" value="yes" class="mr-2">
                  Yes
                </label>
                <label class="flex items-center">
                  <input v-model="form.safeDrinkingWater" type="radio" value="no" class="mr-2">
                  No
                </label>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Does the child eat well?</label>
              <div class="space-y-2">
                <label class="flex items-center">
                  <input v-model="form.eatsWell" type="radio" value="yes" class="mr-2">
                  Yes
                </label>
                <label class="flex items-center">
                  <input v-model="form.eatsWell" type="radio" value="no" class="mr-2">
                  No
                </label>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Does the child have eating disorders/food allergies?</label>
              <div class="space-y-2">
                <label class="flex items-center">
                  <input v-model="form.eatingDisorders" type="radio" value="yes" class="mr-2">
                  Yes
                </label>
                <label class="flex items-center">
                  <input v-model="form.eatingDisorders" type="radio" value="no" class="mr-2">
                  No
                </label>
              </div>
            </div>
          </div>
        </div>

        <!-- Health -->
        <div class="bg-gray-50 p-4 rounded-lg">
          <h2 class="text-lg font-semibold text-gray-900 mb-4">Health</h2>
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Is the child with any chronic disease?</label>
              <div class="space-y-2">
                <label class="flex items-center">
                  <input v-model="form.hasChronicDisease" type="radio" value="yes" class="mr-2">
                  Yes
                </label>
                <label class="flex items-center">
                  <input v-model="form.hasChronicDisease" type="radio" value="no" class="mr-2">
                  No
                </label>
              </div>
            </div>

            <div v-if="form.hasChronicDisease === 'yes'">
              <label class="block text-sm font-medium text-gray-700 mb-2">What is the chronic illness?</label>
              <div class="space-y-2">
                <label class="flex items-center">
                  <input v-model="form.chronicIllness" type="radio" value="hiv" class="mr-2">
                  HIV
                </label>
                <label class="flex items-center">
                  <input v-model="form.chronicIllness" type="radio" value="diabetes" class="mr-2">
                  Diabetes
                </label>
                <label class="flex items-center">
                  <input v-model="form.chronicIllness" type="radio" value="cancer" class="mr-2">
                  Cancer
                </label>
                <label class="flex items-center">
                  <input v-model="form.chronicIllness" type="radio" value="epilepsy" class="mr-2">
                  Epilepsy
                </label>
                <label class="flex items-center">
                  <input v-model="form.chronicIllness" type="radio" value="sickle-cell" class="mr-2">
                  Sickle cell disease
                </label>
                <label class="flex items-center">
                  <input v-model="form.chronicIllness" type="radio" value="asthma" class="mr-2">
                  Asthma
                </label>
                <label class="flex items-center">
                  <input v-model="form.chronicIllness" type="radio" value="other" class="mr-2">
                  Other (specify)
                </label>
                <input v-if="form.chronicIllness === 'other'" v-model="form.chronicIllnessOther" type="text" placeholder="Specify other illness" class="form-input ml-6">
              </div>
            </div>

            <div v-if="form.hasChronicDisease === 'yes'">
              <label class="block text-sm font-medium text-gray-700 mb-2">How is it usually handled?</label>
              <div class="space-y-2">
                <label class="flex items-center">
                  <input v-model="form.chronicIllnessHandling" type="radio" value="specialist" class="mr-2">
                  Accesses medical attention from a specific specialist
                </label>
                <label class="flex items-center">
                  <input v-model="form.chronicIllnessHandling" type="radio" value="any-facility" class="mr-2">
                  Accesses medical care from any facility
                </label>
                <label class="flex items-center">
                  <input v-model="form.chronicIllnessHandling" type="radio" value="school-medication" class="mr-2">
                  Reports to school with medication
                </label>
                <label class="flex items-center">
                  <input v-model="form.chronicIllnessHandling" type="radio" value="other" class="mr-2">
                  Other (specify)
                </label>
                <input v-if="form.chronicIllnessHandling === 'other'" v-model="form.chronicIllnessHandlingOther" type="text" placeholder="Specify other handling" class="form-input ml-6">
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Is the child up to date on recommended immunizations?</label>
              <div class="space-y-2">
                <label class="flex items-center">
                  <input v-model="form.upToDateImmunizations" type="radio" value="yes" class="mr-2">
                  Yes
                </label>
                <label class="flex items-center">
                  <input v-model="form.upToDateImmunizations" type="radio" value="no" class="mr-2">
                  No
                </label>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">If female, does the child have access to any needed menstrual sanitation?</label>
              <div class="space-y-2">
                <label class="flex items-center">
                  <input v-model="form.menstrualSanitation" type="radio" value="yes" class="mr-2">
                  Yes
                </label>
                <label class="flex items-center">
                  <input v-model="form.menstrualSanitation" type="radio" value="no" class="mr-2">
                  No
                </label>
                <label class="flex items-center">
                  <input v-model="form.menstrualSanitation" type="radio" value="na" class="mr-2">
                  Not applicable
                </label>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Has the child fallen sick in the last two months?</label>
              <div class="space-y-2">
                <label class="flex items-center">
                  <input v-model="form.sickLastTwoMonths" type="radio" value="yes" class="mr-2">
                  Yes
                </label>
                <label class="flex items-center">
                  <input v-model="form.sickLastTwoMonths" type="radio" value="no" class="mr-2">
                  No
                </label>
              </div>
            </div>

            <div v-if="form.sickLastTwoMonths === 'yes'">
              <label class="block text-sm font-medium text-gray-700">What was the illness about?</label>
              <textarea v-model="form.illnessDescription" rows="3" class="form-input"></textarea>
            </div>
          </div>
        </div>

        <div class="flex justify-between">
          <button type="button" @click="$router.push(`/assessments/child/${$route.params.childId}/care-protection`)" class="btn btn-secondary">
            Back to Care & Protection
          </button>
          <button type="submit" class="btn btn-primary">
            Save & Continue to Emotional
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChildHealth',
  data() {
    return {
      childData: { childName: 'Loading...' },
      form: {
        adequateFoodAtSchool: '',
        adequateFoodAtHome: '',
        safeDrinkingWater: '',
        eatsWell: '',
        eatingDisorders: '',
        hasChronicDisease: '',
        chronicIllness: '',
        chronicIllnessOther: '',
        chronicIllnessHandling: '',
        chronicIllnessHandlingOther: '',
        upToDateImmunizations: '',
        menstrualSanitation: '',
        sickLastTwoMonths: '',
        illnessDescription: ''
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
        console.log('Saving health section:', this.form)
        this.$router.push(`/assessments/child/${childId}/emotional`)
      } catch (error) {
        console.error('Error saving section:', error)
      }
    }
  }
}
</script>
