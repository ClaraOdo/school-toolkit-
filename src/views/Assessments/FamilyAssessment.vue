<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
    <div class="bg-white shadow rounded-lg">
      <div class="px-6 py-4 border-b border-gray-200">
        <h1 class="text-2xl font-bold text-gray-900">Family Assessment Tool</h1>
        <p class="mt-1 text-sm text-gray-600">Background Information & Household Composition for {{ childData.childName }}'s family</p>
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
          </div>
        </div>

        <!-- Household Members Table -->
        <div class="bg-gray-50 p-4 rounded-lg">
          <h2 class="text-lg font-semibold text-gray-900 mb-4">Household Members</h2>
          <div class="overflow-x-auto">
            <table class="min-w-full border border-gray-300">
              <thead class="bg-gray-100">
                <tr>
                  <th class="border border-gray-300 px-4 py-2 text-left">Names</th>
                  <th class="border border-gray-300 px-4 py-2 text-left">Age</th>
                  <th class="border border-gray-300 px-4 py-2 text-left">Relationship</th>
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
            <button type="button" @click="addHouseholdMember" class="mt-2 btn btn-secondary">
              Add Household Member
            </button>
          </div>
        </div>

        <div class="flex justify-end space-x-4">
          <button type="button" @click="$router.go(-1)" class="btn btn-secondary">
            Cancel
          </button>
          <button type="submit" class="btn btn-primary">
            Save & Continue to Economic Situation
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
      childData: { childName: 'Loading...' },
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
        householdMembers: [
          { name: '', age: '', relationship: '', occupation: '' }
        ]
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
    addHouseholdMember() {
      this.form.householdMembers.push({ name: '', age: '', relationship: '', occupation: '' })
    },
    removeHouseholdMember(index) {
      this.form.householdMembers.splice(index, 1)
    },
    async submitAssessment() {
      try {
        const childId = this.$route.params.childId
        console.log('Saving family background section for child:', childId, this.form)
        this.$router.push(`/assessments/family/${childId}/economic`)
      } catch (error) {
        console.error('Error saving section:', error)
      }
    }
  }
}
</script>
