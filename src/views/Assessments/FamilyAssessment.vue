<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
    <div class="bg-white shadow rounded-lg">
      <div class="px-6 py-4 border-b border-gray-200">
        <h1 class="text-2xl font-bold text-gray-900">Family Assessment Tool</h1>
        <p class="mt-1 text-sm text-gray-600">Complete family assessment</p>
      </div>

      <form @submit.prevent="submitAssessment" class="p-6 space-y-8">
        <!-- Background Information -->
        <div class="bg-gray-50 p-4 rounded-lg">
          <h2 class="text-lg font-semibold text-gray-900 mb-4">Background Information</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">Date</label>
              <input v-model="form.date" type="date" class="form-input">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">District</label>
              <input v-model="form.district" type="text" class="form-input">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Sub-County</label>
              <input v-model="form.subCounty" type="text" class="form-input">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Parish</label>
              <input v-model="form.parish" type="text" class="form-input">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Village</label>
              <input v-model="form.village" type="text" class="form-input">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Name of Household Head</label>
              <input v-model="form.householdHeadName" type="text" class="form-input" required>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Gender of HH head</label>
              <div class="space-y-2">
                <label class="flex items-center">
                  <input v-model="form.householdHeadGender" type="radio" value="male" class="mr-2">
                  Male
                </label>
                <label class="flex items-center">
                  <input v-model="form.householdHeadGender" type="radio" value="female" class="mr-2">
                  Female
                </label>
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Age of HH head</label>
              <input v-model="form.householdHeadAge" type="number" class="form-input">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Contacts of the household head</label>
              <input v-model="form.householdHeadContacts" type="text" class="form-input">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Number of People in the Household</label>
              <input v-model="form.numberOfPeople" type="number" class="form-input">
            </div>
          </div>
        </div>

        <!-- Officials Information -->
        <div class="bg-gray-50 p-4 rounded-lg">
          <h2 class="text-lg font-semibold text-gray-900 mb-4">Officials Information</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">Name of area CDO</label>
              <input v-model="form.cdoName" type="text" class="form-input">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Contacts of the CDO</label>
              <input v-model="form.cdoContacts" type="text" class="form-input">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Name of area PSWO</label>
              <input v-model="form.pswoName" type="text" class="form-input">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Contacts of the area PSWO</label>
              <input v-model="form.pswoContacts" type="text" class="form-input">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Name of area L.C 1 Chairperson</label>
              <input v-model="form.lc1Name" type="text" class="form-input">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Contacts of area L.C 1 Chairperson</label>
              <input v-model="form.lc1Contacts" type="text" class="form-input">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Name of Para-social worker</label>
              <input v-model="form.paraSocialWorkerName" type="text" class="form-input">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Contacts of the para-social worker</label>
              <input v-model="form.paraSocialWorkerContacts" type="text" class="form-input">
            </div>
          </div>
        </div>

        <!-- Disability Information -->
        <div class="bg-gray-50 p-4 rounded-lg">
          <h2 class="text-lg font-semibold text-gray-900 mb-4">Disability Information</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">Number of adult household members with a disability</label>
              <input v-model="form.adultsWithDisability" type="number" class="form-input">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Type of disability?</label>
              <input v-model="form.adultDisabilityType" type="text" class="form-input">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Number of children in the household with a disability</label>
              <input v-model="form.childrenWithDisability" type="number" class="form-input">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Type of disability?</label>
              <input v-model="form.childDisabilityType" type="text" class="form-input">
            </div>
          </div>
        </div>

        <!-- Household Members Table -->
        <div class="bg-gray-50 p-4 rounded-lg">
          <h2 class="text-lg font-semibold text-gray-900 mb-4">Household Members</h2>
          <div class="overflow-x-auto">
            <table class="min-w-full border border-gray-300">
              <thead class="bg-gray-100">
                <tr>
                  <th class="border border-gray-300 px-4 py-2 text-left">Names of household members</th>
                  <th class="border border-gray-300 px-4 py-2 text-left">Age</th>
                  <th class="border border-gray-300 px-4 py-2 text-left">Relationship to household head</th>
                  <th class="border border-gray-300 px-4 py-2 text-left">Occupation</th>
                  <th class="border border-gray-300 px-4 py-2 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(member, index) in form.householdMembers" :key="index">
                  <td class="border border-gray-300 px-2 py-2">
                    <input v-model="member.name" type="text" class="form-input w-full">
                  </td>
                  <td class="border border-gray-300 px-2 py-2">
                    <input v-model="member.age" type="number" class="form-input w-full">
                  </td>
                  <td class="border border-gray-300 px-2 py-2">
                    <input v-model="member.relationship" type="text" class="form-input w-full">
                  </td>
                  <td class="border border-gray-300 px-2 py-2">
                    <input v-model="member.occupation" type="text" class="form-input w-full">
                  </td>
                  <td class="border border-gray-300 px-2 py-2 text-center">
                    <button type="button" @click="removeHouseholdMember(index)" class="text-red-600 hover:text-red-800">
                      Remove
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
            <button type="button" @click="addHouseholdMember" class="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Add Household Member
            </button>
          </div>
        </div>

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
                  <input v-model="form.peopleEarningIncome" type="radio" value="four" class="mr-2">
                  Four
                </label>
                <label class="flex items-center">
                  <input v-model="form.peopleEarningIncome" type="radio" value="five" class="mr-2">
                  Five
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
          </div>
        </div>

        <div class="flex justify-end space-x-4">
          <button type="button" @click="$router.go(-1)" class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
            Cancel
          </button>
          <button type="submit" class="btn-primary">
            Save Family Assessment
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FamilyAssessment',
  data() {
    return {
      form: {
        date: '',
        district: '',
        subCounty: '',
        parish: '',
        village: '',
        householdHeadName: '',
        householdHeadGender: '',
        householdHeadAge: '',
        householdHeadContacts: '',
        numberOfPeople: '',
        cdoName: '',
        cdoContacts: '',
        pswoName: '',
        pswoContacts: '',
        lc1Name: '',
        lc1Contacts: '',
        paraSocialWorkerName: '',
        paraSocialWorkerContacts: '',
        adultsWithDisability: '',
        adultDisabilityType: '',
        childrenWithDisability: '',
        childDisabilityType: '',
        householdMembers: [
          { name: '', age: '', relationship: '', occupation: '' }
        ],
        peopleEarningIncome: '',
        reliableLivelihood: '',
        mainIncomeSource: '',
        mainIncomeSourceOther: ''
      }
    }
  },
  methods: {
    addHouseholdMember() {
      this.form.householdMembers.push({ name: '', age: '', relationship: '', occupation: '' })
    },
    removeHouseholdMember(index) {
      this.form.householdMembers.splice(index, 1)
    },
    async submitAssessment() {
      try {
        const assessmentData = {
          ...this.form,
          assessment_type: 'family'
        }
        
        console.log('Submitting family assessment:', assessmentData)
        
        // API call to create household assessment
        // const response = await fetch(`http://localhost:8000/api/children/${childId}/household-assessments`, {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json',
        //     'Authorization': `Bearer ${localStorage.getItem('token')}`
        //   },
        //   body: JSON.stringify(assessmentData)
        // })
        
        // if (!response.ok) {
        //   throw new Error('Failed to submit assessment')
        // }
        
        // const result = await response.json()
        // console.log('Assessment submitted successfully:', result)
        
        // Redirect back to assessments with success message
        this.$router.push('/assessments?success=family-assessment-created')
      } catch (error) {
        console.error('Error submitting assessment:', error)
        // Handle error (show notification, etc.)
      }
    }
  }
}
</script>
