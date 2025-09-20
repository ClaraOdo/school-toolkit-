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
import api from '../../services/api'

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
            adequateFoodSchool: latest.adequate_food_school === true ? 'yes' : latest.adequate_food_school === false ? 'no' : '',
            adequateFoodHome: latest.adequate_food_home === true ? 'yes' : latest.adequate_food_home === false ? 'no' : '',
            safeDrinkingWater: latest.safe_drinking_water === true ? 'yes' : latest.safe_drinking_water === false ? 'no' : '',
            eatsWell: latest.eats_well === true ? 'yes' : latest.eats_well === false ? 'no' : '',
            eatingDisorders: latest.eating_disorders === true ? 'yes' : latest.eating_disorders === false ? 'no' : '',
            chronicDisease: latest.chronic_disease === true ? 'yes' : latest.chronic_disease === false ? 'no' : '',
            chronicIllnessType: latest.chronic_illness_type || '',
            illnessHandlingMethod: latest.illness_handling_method || '',
            currentImmunizations: latest.current_immunizations === true ? 'yes' : latest.current_immunizations === false ? 'no' : '',
            menstrualSanitationAccess: latest.menstrual_sanitation_access === true ? 'yes' : latest.menstrual_sanitation_access === false ? 'no' : '',
            recentIllness: latest.recent_illness === true ? 'yes' : latest.recent_illness === false ? 'no' : '',
            recentIllnessDetails: latest.recent_illness_details || ''
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
          section: 'health',
          adequate_food_school: this.form.adequateFoodSchool === 'yes',
          adequate_food_home: this.form.adequateFoodHome === 'yes',
          safe_drinking_water: this.form.safeDrinkingWater === 'yes',
          eats_well: this.form.eatsWell === 'yes',
          eating_disorders: this.form.eatingDisorders === 'yes',
          chronic_disease: this.form.chronicDisease === 'yes',
          chronic_illness_type: this.form.chronicIllnessType,
          illness_handling_method: this.form.illnessHandlingMethod,
          current_immunizations: this.form.currentImmunizations === 'yes',
          menstrual_sanitation_access: this.form.menstrualSanitationAccess === 'yes',
          recent_illness: this.form.recentIllness === 'yes',
          recent_illness_details: this.form.recentIllnessDetails
        }
        
        await this.$api.post(`/children/${childId}/assessments`, payload)
        this.$router.push(`/assessments/child/${childId}/emotional`)
      } catch (error) {
        console.error('Error saving section:', error)
        alert('Error saving assessment. Please try again.')
      }
    }
  }
}
</script>
