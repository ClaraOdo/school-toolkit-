<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
    <div class="bg-white shadow rounded-lg">
      <div class="px-6 py-4 border-b border-gray-200">
        <h1 class="text-2xl font-bold text-gray-900">Child Assessment - Education and Development</h1>
        <p class="mt-1 text-sm text-gray-600">Step 1 of 5 for {{ childData.childName }}</p>
      </div>

      <form @submit.prevent="submitSection" class="p-6 space-y-8">
        <!-- Education and Development -->
        <div class="bg-gray-50 p-4 rounded-lg">
          <h2 class="text-lg font-semibold text-gray-900 mb-4">Education and Development</h2>
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Is the child currently enrolled and attending school?</label>
              <div class="space-y-2">
                <label class="flex items-center">
                  <input v-model="form.currentlyEnrolled" type="radio" value="yes" class="mr-2">
                  Yes
                </label>
                <label class="flex items-center">
                  <input v-model="form.currentlyEnrolled" type="radio" value="no" class="mr-2">
                  No
                </label>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Is the child attending school/class, vocational training, or an apprenticeship regularly (At least 4 days a week on average) in the past 12 months?</label>
              <div class="space-y-2">
                <label class="flex items-center">
                  <input v-model="form.attendingRegularly" type="radio" value="yes" class="mr-2">
                  Yes
                </label>
                <label class="flex items-center">
                  <input v-model="form.attendingRegularly" type="radio" value="no" class="mr-2">
                  No
                </label>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Has the child successfully progressed from one level to another at school, during the last academic year?</label>
              <div class="space-y-2">
                <label class="flex items-center">
                  <input v-model="form.progressedLastYear" type="radio" value="yes" class="mr-2">
                  Yes
                </label>
                <label class="flex items-center">
                  <input v-model="form.progressedLastYear" type="radio" value="no" class="mr-2">
                  No
                </label>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Class teacher's opinion about the child's education progress</label>
              <div class="space-y-2">
                <label class="flex items-center">
                  <input v-model="form.teacherOpinion" type="radio" value="excellent" class="mr-2">
                  Excellent
                </label>
                <label class="flex items-center">
                  <input v-model="form.teacherOpinion" type="radio" value="good" class="mr-2">
                  Good
                </label>
                <label class="flex items-center">
                  <input v-model="form.teacherOpinion" type="radio" value="fair" class="mr-2">
                  Fair
                </label>
                <label class="flex items-center">
                  <input v-model="form.teacherOpinion" type="radio" value="poor" class="mr-2">
                  Poor
                </label>
                <label class="flex items-center">
                  <input v-model="form.teacherOpinion" type="radio" value="very-poor" class="mr-2">
                  Very poor
                </label>
                <label class="flex items-center">
                  <input v-model="form.teacherOpinion" type="radio" value="no-comment" class="mr-2">
                  No comment
                </label>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Is the child's behaviour in classroom appropriate?</label>
              <div class="space-y-2">
                <label class="flex items-center">
                  <input v-model="form.classroomBehaviour" type="radio" value="very-appropriate" class="mr-2">
                  Yes, very appropriate
                </label>
                <label class="flex items-center">
                  <input v-model="form.classroomBehaviour" type="radio" value="somewhat-appropriate" class="mr-2">
                  Yes, somewhat appropriate
                </label>
                <label class="flex items-center">
                  <input v-model="form.classroomBehaviour" type="radio" value="inappropriate" class="mr-2">
                  No, inappropriate
                </label>
              </div>
            </div>
          </div>
        </div>

        <div class="flex justify-between">
          <button type="button" @click="$router.go(-1)" class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
            Back
          </button>
          <button type="submit" class="btn-primary">
            Save & Continue to Care and Protection
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChildEducation',
  data() {
    return {
      childData: { childName: 'Loading...' },
      form: {
        currentlyEnrolled: '',
        attendingRegularly: '',
        progressedLastYear: '',
        teacherOpinion: '',
        classroomBehaviour: ''
      }
    }
  },
  async mounted() {
    await this.loadChildData()
  },
  methods: {
    async loadChildData() {
      const childId = this.$route.params.childId
      // Load child data (same as before)
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
        console.log('Saving education section:', this.form)
        
        // Save to API
        // await saveAssessmentSection(childId, 'education', this.form)
        
        this.$router.push(`/assessments/child/${childId}/care-protection`)
      } catch (error) {
        console.error('Error saving section:', error)
      }
    }
  }
}
</script>
