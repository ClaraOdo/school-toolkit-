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
                  <input v-model="form.adequate_food_school" type="radio" value="yes" class="mr-2">
                  Yes
                </label>
                <label class="flex items-center">
                  <input v-model="form.adequate_food_school" type="radio" value="no" class="mr-2">
                  No
                </label>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Does the child have access to adequate food at home?</label>
              <div class="space-y-2">
                <label class="flex items-center">
                  <input v-model="form.adequate_food_home" type="radio" value="yes" class="mr-2">
                  Yes
                </label>
                <label class="flex items-center">
                  <input v-model="form.adequate_food_home" type="radio" value="no" class="mr-2">
                  No
                </label>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Does the child have access to safe drinking water?</label>
              <div class="space-y-2">
                <label class="flex items-center">
                  <input v-model="form.safe_drinking_water" type="radio" value="yes" class="mr-2">
                  Yes
                </label>
                <label class="flex items-center">
                  <input v-model="form.safe_drinking_water" type="radio" value="no" class="mr-2">
                  No
                </label>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Does the child eat well?</label>
              <div class="space-y-2">
                <label class="flex items-center">
                  <input v-model="form.eats_well" type="radio" value="yes" class="mr-2">
                  Yes
                </label>
                <label class="flex items-center">
                  <input v-model="form.eats_well" type="radio" value="no" class="mr-2">
                  No
                </label>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Does the child have eating disorders/food allergies?</label>
              <div class="space-y-2">
                <label class="flex items-center">
                  <input v-model="form.eating_disorders" type="radio" value="yes" class="mr-2">
                  Yes
                </label>
                <label class="flex items-center">
                  <input v-model="form.eating_disorders" type="radio" value="no" class="mr-2">
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
                  <input v-model="form.chronic_disease" type="radio" value="yes" class="mr-2">
                  Yes
                </label>
                <label class="flex items-center">
                  <input v-model="form.chronic_disease" type="radio" value="no" class="mr-2">
                  No
                </label>
              </div>
            </div>

            <div v-if="form.hasChronicDisease === 'yes'">
              <label class="block text-sm font-medium text-gray-700 mb-2">What is the chronic illness?</label>
              <div class="space-y-2">
                <label class="flex items-center">
                  <input v-model="form.chronic_illness_type" type="radio" value="hiv" class="mr-2">
                  HIV
                </label>
                <label class="flex items-center">
                  <input v-model="form.chronic_illness_type" type="radio" value="diabetes" class="mr-2">
                  Diabetes
                </label>
                <label class="flex items-center">
                  <input v-model="form.chronic_illness_type" type="radio" value="cancer" class="mr-2">
                  Cancer
                </label>
                <label class="flex items-center">
                  <input v-model="form.chronic_illness_type" type="radio" value="epilepsy" class="mr-2">
                  Epilepsy
                </label>
                <label class="flex items-center">
                  <input v-model="form.chronic_illness_type" type="radio" value="sickle-cell" class="mr-2">
                  Sickle cell disease
                </label>
                <label class="flex items-center">
                  <input v-model="form.chronic_illness_type" type="radio" value="asthma" class="mr-2">
                  Asthma
                </label>
                <label class="flex items-center">
                  <input v-model="form.chronic_illness_type" type="radio" value="other" class="mr-2">
                  Other (specify)
                </label>
                <input v-if="form.chronic_illness_type === 'other'" v-model="form.chronic_illness_other" type="text" placeholder="Specify other illness" class="form-input ml-6">
              </div>
            </div>

            <div v-if="form.hasChronicDisease === 'yes'">
              <label class="block text-sm font-medium text-gray-700 mb-2">How is it usually handled?</label>
              <div class="space-y-2">
                <label class="flex items-center">
                  <input v-model="form.illness_handling_method" type="radio" value="specialist" class="mr-2">
                  Accesses medical attention from a specific specialist
                </label>
                <label class="flex items-center">
                  <input v-model="form.illness_handling_method" type="radio" value="any-facility" class="mr-2">
                  Accesses medical care from any facility
                </label>
                <label class="flex items-center">
                  <input v-model="form.illness_handling_method" type="radio" value="school-medication" class="mr-2">
                  Reports to school with medication
                </label>
                <label class="flex items-center">
                  <input v-model="form.illness_handling_method" type="radio" value="other" class="mr-2">
                  Other (specify)
                </label>
                <input v-if="form.illness_handling_method === 'other'" v-model="form.illness_handling_other" type="text" placeholder="Specify other handling" class="form-input ml-6">
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Is the child up to date on recommended immunizations?</label>
              <div class="space-y-2">
                <label class="flex items-center">
                  <input v-model="form.current_immunizations" type="radio" value="yes" class="mr-2">
                  Yes
                </label>
                <label class="flex items-center">
                  <input v-model="form.current_immunizations" type="radio" value="no" class="mr-2">
                  No
                </label>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">If female, does the child have access to any needed menstrual sanitation?</label>
              <div class="space-y-2">
                <label class="flex items-center">
                  <input v-model="form.menstrual_sanitation_access" type="radio" value="yes" class="mr-2">
                  Yes
                </label>
                <label class="flex items-center">
                  <input v-model="form.menstrual_sanitation_access" type="radio" value="no" class="mr-2">
                  No
                </label>
                <label class="flex items-center">
                  <input v-model="form.menstrual_sanitation_access" type="radio" value="na" class="mr-2">
                  Not applicable
                </label>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Has the child fallen sick in the last two months?</label>
              <div class="space-y-2">
                <label class="flex items-center">
                  <input v-model="form.recent_illness" type="radio" value="yes" class="mr-2">
                  Yes
                </label>
                <label class="flex items-center">
                  <input v-model="form.recent_illness" type="radio" value="no" class="mr-2">
                  No
                </label>
              </div>
            </div>

            <div v-if="form.recent_illness === 'yes'">
              <label class="block text-sm font-medium text-gray-700">What was the illness about?</label>
              <textarea v-model="form.recent_illness_details" rows="3" class="form-input"></textarea>
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
        adequate_food_school: '',
        adequate_food_home: '',
        safe_drinking_water: '',
        eats_well: '',
        eating_disorders: '',
        chronic_disease: '',
        chronic_illness_type: '',
        chronic_illness_other: '',
        illness_handling_method: '',
        illness_handling_other: '',
        current_immunizations: '',
        menstrual_sanitation_access: '',
        recent_illness: '',
        recent_illness_details: ''
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
        console.log('Health assessment response:', assessmentResponse.data)
        if (assessmentResponse.data?.data?.length > 0) {
          const latest = assessmentResponse.data.data[0]
          console.log('Latest health assessment:', latest)
          this.form = {
            adequate_food_school: latest.adequate_food_school === true ? 'yes' : latest.adequate_food_school === false ? 'no' : latest.adequate_food_school || '',
            adequate_food_home: latest.adequate_food_home === true ? 'yes' : latest.adequate_food_home === false ? 'no' : latest.adequate_food_home || '',
            safe_drinking_water: latest.safe_drinking_water === true ? 'yes' : latest.safe_drinking_water === false ? 'no' : latest.safe_drinking_water || '',
            eats_well: latest.eats_well === true ? 'yes' : latest.eats_well === false ? 'no' : latest.eats_well || '',
            eating_disorders: latest.eating_disorders === true ? 'yes' : latest.eating_disorders === false ? 'no' : latest.eating_disorders || '',
            chronic_disease: latest.chronic_disease === true ? 'yes' : latest.chronic_disease === false ? 'no' : latest.chronic_disease || '',
            chronic_illness_type: latest.chronic_illness_type || '',
            illness_handling_method: latest.illness_handling_method || '',
            current_immunizations: latest.current_immunizations === true ? 'yes' : latest.current_immunizations === false ? 'no' : latest.current_immunizations || '',
            menstrual_sanitation_access: latest.menstrual_sanitation_access === true ? 'yes' : latest.menstrual_sanitation_access === false ? 'no' : latest.menstrual_sanitation_access || '',
            recent_illness: latest.recent_illness === true ? 'yes' : latest.recent_illness === false ? 'no' : latest.recent_illness || '',
            recent_illness_details: latest.recent_illness_details || ''
          }
          console.log('Health form after loading:', this.form)
          this.$nextTick(() => {
            this.$forceUpdate()
          })
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
          adequate_food_school: this.form.adequate_food_school,
          adequate_food_home: this.form.adequate_food_home,
          safe_drinking_water: this.form.safe_drinking_water,
          eats_well: this.form.eats_well,
          eating_disorders: this.form.eating_disorders,
          chronic_disease: this.form.chronic_disease,
          chronic_illness_type: this.form.chronic_illness_type,
          illness_handling_method: this.form.illness_handling_method,
          current_immunizations: this.form.current_immunizations,
          menstrual_sanitation_access: this.form.menstrual_sanitation_access,
          recent_illness: this.form.recent_illness,
          recent_illness_details: this.form.recent_illness_details
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
