<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
    <div class="bg-white shadow rounded-lg">
      <div class="px-6 py-4 border-b border-gray-200">
        <h1 class="text-2xl font-bold text-gray-900">Family Assessment - Economic Situation</h1>
        <p class="mt-1 text-sm text-gray-600">Step 2 of 4</p>
      </div>

      <form @submit.prevent="submitSection" class="p-6 space-y-8">
        <!-- Household Economic Situation -->
        <div class="bg-gray-50 p-4 rounded-lg">
          <h2 class="text-lg font-semibold text-gray-900 mb-4">Household Economic Situation</h2>
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">How many people in this household earn income?</label>
              <div class="space-y-2">
                <label class="flex items-center">
                  <input v-model="form.peopleEarningIncome" type="radio" value="one" class="mr-2">
                  Only one
                </label>
                <label class="flex items-center">
                  <input v-model="form.peopleEarningIncome" type="radio" value="two" class="mr-2">
                  Two
                </label>
                <label class="flex items-center">
                  <input v-model="form.peopleEarningIncome" type="radio" value="three" class="mr-2">
                  Three
                </label>
                <label class="flex items-center">
                  <input v-model="form.peopleEarningIncome" type="radio" value="more-than-five" class="mr-2">
                  More than five
                </label>
                <label class="flex items-center">
                  <input v-model="form.peopleEarningIncome" type="radio" value="none" class="mr-2">
                  None
                </label>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Does the household have a reliable source of livelihood?</label>
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
              <label class="block text-sm font-medium text-gray-700 mb-2">What is the main source of income for the household?</label>
              <div class="space-y-2">
                <label class="flex items-center">
                  <input v-model="form.mainIncomeSource" type="radio" value="formal-employment" class="mr-2">
                  Formal employment
                </label>
                <label class="flex items-center">
                  <input v-model="form.mainIncomeSource" type="radio" value="informal-employment" class="mr-2">
                  Informal employment/self-employment
                </label>
                <label class="flex items-center">
                  <input v-model="form.mainIncomeSource" type="radio" value="household-business" class="mr-2">
                  Household/personal business
                </label>
                <label class="flex items-center">
                  <input v-model="form.mainIncomeSource" type="radio" value="other" class="mr-2">
                  Other (specify)
                </label>
                <input v-if="form.mainIncomeSource === 'other'" v-model="form.mainIncomeSourceOther" type="text" placeholder="Specify other" class="form-input ml-6">
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Current monthly household income (Uganda Shillings)</label>
              <div class="space-y-2">
                <label class="flex items-center">
                  <input v-model="form.monthlyIncome" type="radio" value="less-100k" class="mr-2">
                  Less than 100,000/=
                </label>
                <label class="flex items-center">
                  <input v-model="form.monthlyIncome" type="radio" value="100k-200k" class="mr-2">
                  Between 100,001/= and 200,000/=
                </label>
                <label class="flex items-center">
                  <input v-model="form.monthlyIncome" type="radio" value="200k-500k" class="mr-2">
                  Between 200,001/= and 500,000/=
                </label>
                <label class="flex items-center">
                  <input v-model="form.monthlyIncome" type="radio" value="500k-1m" class="mr-2">
                  Between 500,001/= and 1,000,000/=
                </label>
                <label class="flex items-center">
                  <input v-model="form.monthlyIncome" type="radio" value="above-1m" class="mr-2">
                  Above 1,000,000/=
                </label>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Does the household own the following?</label>
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
                      <td class="border border-gray-300 px-4 py-2">Domestic animals (cow, goat, chicken, etc.)</td>
                      <td class="border border-gray-300 px-4 py-2 text-center">
                        <input v-model="form.assets.domesticAnimals" type="radio" value="yes">
                      </td>
                      <td class="border border-gray-300 px-4 py-2 text-center">
                        <input v-model="form.assets.domesticAnimals" type="radio" value="no">
                      </td>
                    </tr>
                    <tr>
                      <td class="border border-gray-300 px-4 py-2">Household owns land</td>
                      <td class="border border-gray-300 px-4 py-2 text-center">
                        <input v-model="form.assets.ownsLand" type="radio" value="yes">
                      </td>
                      <td class="border border-gray-300 px-4 py-2 text-center">
                        <input v-model="form.assets.ownsLand" type="radio" value="no">
                      </td>
                    </tr>
                    <tr>
                      <td class="border border-gray-300 px-4 py-2">Functional means of transport (bicycle, motorcycle, boat)</td>
                      <td class="border border-gray-300 px-4 py-2 text-center">
                        <input v-model="form.assets.transport" type="radio" value="yes">
                      </td>
                      <td class="border border-gray-300 px-4 py-2 text-center">
                        <input v-model="form.assets.transport" type="radio" value="no">
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">How would you rate the economic situation of the household?</label>
              <div class="space-y-2">
                <label class="flex items-center">
                  <input v-model="form.economicSituation" type="radio" value="stable" class="mr-2">
                  Economically stable
                </label>
                <label class="flex items-center">
                  <input v-model="form.economicSituation" type="radio" value="struggling" class="mr-2">
                  Somewhat struggling
                </label>
                <label class="flex items-center">
                  <input v-model="form.economicSituation" type="radio" value="vulnerable" class="mr-2">
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

        <div class="flex justify-between">
          <button type="button" @click="$router.push(`/assessments/family/${$route.params.childId}`)" class="btn btn-secondary">
            Back to Background
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
  name: 'FamilyEconomic',
  data() {
    return {
      form: {
        peopleEarningIncome: '',
        reliableLivelihood: '',
        mainIncomeSource: '',
        mainIncomeSourceOther: '',
        monthlyIncome: '',
        assets: {
          domesticAnimals: '',
          ownsLand: '',
          transport: ''
        },
        economicSituation: ''
      }
    }
  },
  methods: {
    async submitSection() {
      try {
        const childId = this.$route.params.childId
        console.log('Saving family economic section for child:', childId, this.form)
        this.$router.push(`/assessments/family/${childId}/health`)
      } catch (error) {
        console.error('Error saving section:', error)
      }
    }
  }
}
</script>
