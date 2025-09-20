<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
    <div class="bg-white shadow rounded-lg">
      <div class="px-6 py-4 border-b border-gray-200">
        <h1 class="text-2xl font-bold text-gray-900">Family Assessment - Survival & Health</h1>
        <p class="mt-1 text-sm text-gray-600">Step 3 of 4</p>
      </div>

      <form @submit.prevent="submitSection" class="p-6 space-y-8">
        <!-- Survival and Health -->
        <div class="bg-gray-50 p-4 rounded-lg">
          <h2 class="text-lg font-semibold text-gray-900 mb-4">Survival and Health</h2>
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">What is the main source of food consumed by the members of your household?</label>
              <div class="space-y-2">
                <label class="flex items-center">
                  <input v-model="form.mainFoodSource" type="radio" value="own-garden" class="mr-2">
                  Own garden (produced by the household)
                </label>
                <label class="flex items-center">
                  <input v-model="form.mainFoodSource" type="radio" value="bought-market" class="mr-2">
                  Bought from the market/shop
                </label>
                <label class="flex items-center">
                  <input v-model="form.mainFoodSource" type="radio" value="both" class="mr-2">
                  Both from own garden and the market
                </label>
                <label class="flex items-center">
                  <input v-model="form.mainFoodSource" type="radio" value="aid-donations" class="mr-2">
                  Aid/donations
                </label>
                <label class="flex items-center">
                  <input v-model="form.mainFoodSource" type="radio" value="other" class="mr-2">
                  Other (specify)
                </label>
                <input v-if="form.mainFoodSource === 'other'" v-model="form.mainFoodSourceOther" type="text" placeholder="Specify other" class="form-input ml-6">
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">How many meals does the household have in a day?</label>
              <div class="space-y-2">
                <label class="flex items-center">
                  <input v-model="form.mealsPerDay" type="radio" value="one" class="mr-2">
                  One meal
                </label>
                <label class="flex items-center">
                  <input v-model="form.mealsPerDay" type="radio" value="two" class="mr-2">
                  Two meals
                </label>
                <label class="flex items-center">
                  <input v-model="form.mealsPerDay" type="radio" value="three" class="mr-2">
                  Three meals
                </label>
                <label class="flex items-center">
                  <input v-model="form.mealsPerDay" type="radio" value="four" class="mr-2">
                  Four meals
                </label>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">In the past month, has any member of the household gone a whole day and night without eating anything at all due to lack of food?</label>
              <div class="space-y-2">
                <label class="flex items-center">
                  <input v-model="form.wentWithoutFood" type="radio" value="yes" class="mr-2">
                  Yes
                </label>
                <label class="flex items-center">
                  <input v-model="form.wentWithoutFood" type="radio" value="no" class="mr-2">
                  No
                </label>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Does the household have a latrine/toilet facility used by the members?</label>
              <div class="space-y-2">
                <label class="flex items-center">
                  <input v-model="form.hasLatrine" type="radio" value="yes" class="mr-2">
                  Yes
                </label>
                <label class="flex items-center">
                  <input v-model="form.hasLatrine" type="radio" value="no" class="mr-2">
                  No
                </label>
              </div>
            </div>

            <div v-if="form.hasLatrine === 'yes'">
              <label class="block text-sm font-medium text-gray-700 mb-2">Is the latrine/toilet accessible by members of the household with a disability?</label>
              <div class="space-y-2">
                <label class="flex items-center">
                  <input v-model="form.latrineAccessible" type="radio" value="yes" class="mr-2">
                  Yes
                </label>
                <label class="flex items-center">
                  <input v-model="form.latrineAccessible" type="radio" value="no" class="mr-2">
                  No
                </label>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Do the following apply to this household?</label>
              <div class="overflow-x-auto">
                <table class="min-w-full border border-gray-300">
                  <thead class="bg-gray-100">
                    <tr>
                      <th class="border border-gray-300 px-4 py-2 text-left">Item</th>
                      <th class="border border-gray-300 px-4 py-2">Yes</th>
                      <th class="border border-gray-300 px-4 py-2">No</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="border border-gray-300 px-4 py-2">HH harvests rain water or has access to safe water within 30 minutes</td>
                      <td class="border border-gray-300 px-4 py-2 text-center">
                        <input v-model="form.healthItems.safeWater" type="radio" value="yes">
                      </td>
                      <td class="border border-gray-300 px-4 py-2 text-center">
                        <input v-model="form.healthItems.safeWater" type="radio" value="no">
                      </td>
                    </tr>
                    <tr>
                      <td class="border border-gray-300 px-4 py-2">HH has access to a public health facility within 5 kilometers</td>
                      <td class="border border-gray-300 px-4 py-2 text-center">
                        <input v-model="form.healthItems.healthFacility" type="radio" value="yes">
                      </td>
                      <td class="border border-gray-300 px-4 py-2 text-center">
                        <input v-model="form.healthItems.healthFacility" type="radio" value="no">
                      </td>
                    </tr>
                    <tr>
                      <td class="border border-gray-300 px-4 py-2">All HH members sleep under a mosquito net</td>
                      <td class="border border-gray-300 px-4 py-2 text-center">
                        <input v-model="form.healthItems.mosquitoNet" type="radio" value="yes">
                      </td>
                      <td class="border border-gray-300 px-4 py-2 text-center">
                        <input v-model="form.healthItems.mosquitoNet" type="radio" value="no">
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <!-- Education and Development -->
        <div class="bg-gray-50 p-4 rounded-lg">
          <h2 class="text-lg font-semibold text-gray-900 mb-4">Education and Development</h2>
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Are all the children aged 6–17 years in this household enrolled in school, vocational training or apprenticeship?</label>
              <div class="space-y-2">
                <label class="flex items-center">
                  <input v-model="form.childrenEnrolled" type="radio" value="yes" class="mr-2">
                  Yes
                </label>
                <label class="flex items-center">
                  <input v-model="form.childrenEnrolled" type="radio" value="no" class="mr-2">
                  No
                </label>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Do all the children aged 6–17 years that are in school attend regularly (At least 4 days a week on average)?</label>
              <div class="space-y-2">
                <label class="flex items-center">
                  <input v-model="form.childrenAttendRegularly" type="radio" value="yes" class="mr-2">
                  Yes
                </label>
                <label class="flex items-center">
                  <input v-model="form.childrenAttendRegularly" type="radio" value="no" class="mr-2">
                  No
                </label>
                <label class="flex items-center">
                  <input v-model="form.childrenAttendRegularly" type="radio" value="sometimes" class="mr-2">
                  Sometimes
                </label>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Are all children aged 3-5 years in this household enrolled in Pre-School?</label>
              <div class="space-y-2">
                <label class="flex items-center">
                  <input v-model="form.preschoolEnrolled" type="radio" value="yes" class="mr-2">
                  Yes
                </label>
                <label class="flex items-center">
                  <input v-model="form.preschoolEnrolled" type="radio" value="no" class="mr-2">
                  No
                </label>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Have the children successfully progressed from one level to another at school compared to last academic year?</label>
              <div class="space-y-2">
                <label class="flex items-center">
                  <input v-model="form.childrenProgressed" type="radio" value="yes" class="mr-2">
                  Yes
                </label>
                <label class="flex items-center">
                  <input v-model="form.childrenProgressed" type="radio" value="no" class="mr-2">
                  No
                </label>
              </div>
            </div>
          </div>
        </div>

        <div class="flex justify-between">
          <button type="button" @click="$router.push(`/assessments/family/${$route.params.childId}/economic`)" class="btn btn-secondary">
            Back to Economic
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
export default {
  name: 'FamilyHealth',
  data() {
    return {
      form: {
        mainFoodSource: '',
        mainFoodSourceOther: '',
        mealsPerDay: '',
        wentWithoutFood: '',
        hasLatrine: '',
        latrineAccessible: '',
        healthItems: {
          safeWater: '',
          healthFacility: '',
          mosquitoNet: ''
        },
        childrenEnrolled: '',
        childrenAttendRegularly: '',
        preschoolEnrolled: '',
        childrenProgressed: ''
      }
    }
  },
  methods: {
    async submitSection() {
      try {
        const childId = this.$route.params.childId
        console.log('Saving family health section for child:', childId, this.form)
        this.$router.push(`/assessments/family/${childId}/care-protection`)
      } catch (error) {
        console.error('Error saving section:', error)
      }
    }
  }
}
</script>
