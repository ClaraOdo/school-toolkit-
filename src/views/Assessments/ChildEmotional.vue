<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
    <div class="bg-white shadow rounded-lg">
      <div class="px-6 py-4 border-b border-gray-200">
        <h1 class="text-2xl font-bold text-gray-900">Child Assessment - Emotional/Psychosocial</h1>
        <p class="mt-1 text-sm text-gray-600">Step 4 of 4 for {{ childData.childName }}</p>
      </div>

      <form @submit.prevent="submitSection" class="p-6 space-y-8">
        <!-- Emotional / Psychosocial well being -->
        <div class="bg-gray-50 p-4 rounded-lg">
          <h2 class="text-lg font-semibold text-gray-900 mb-4">Emotional / Psychosocial Well Being</h2>
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">How does the child interact with fellow children?</label>
              <div class="space-y-2">
                <label class="flex items-center">
                  <input v-model="form.interactionWithChildren" type="radio" value="perfectly-well" class="mr-2">
                  Perfectly well
                </label>
                <label class="flex items-center">
                  <input v-model="form.interactionWithChildren" type="radio" value="somewhat-well" class="mr-2">
                  Somewhat well
                </label>
                <label class="flex items-center">
                  <input v-model="form.interactionWithChildren" type="radio" value="with-reservations" class="mr-2">
                  With reservations
                </label>
                <label class="flex items-center">
                  <input v-model="form.interactionWithChildren" type="radio" value="poorly" class="mr-2">
                  Poorly
                </label>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">How does the child interact with adults?</label>
              <div class="space-y-2">
                <label class="flex items-center">
                  <input v-model="form.interactionWithAdults" type="radio" value="perfectly-well" class="mr-2">
                  Perfectly well
                </label>
                <label class="flex items-center">
                  <input v-model="form.interactionWithAdults" type="radio" value="somewhat-well" class="mr-2">
                  Somewhat well
                </label>
                <label class="flex items-center">
                  <input v-model="form.interactionWithAdults" type="radio" value="with-reservations" class="mr-2">
                  With reservations
                </label>
                <label class="flex items-center">
                  <input v-model="form.interactionWithAdults" type="radio" value="poorly" class="mr-2">
                  Poorly
                </label>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">How does the child deal with and handle stress?</label>
              <div class="space-y-2">
                <label class="flex items-center">
                  <input v-model="form.stressHandling" type="checkbox" value="play" class="mr-2">
                  Through play
                </label>
                <label class="flex items-center">
                  <input v-model="form.stressHandling" type="checkbox" value="prayers" class="mr-2">
                  Prayers
                </label>
                <label class="flex items-center">
                  <input v-model="form.stressHandling" type="checkbox" value="sharing-peers" class="mr-2">
                  Sharing with peers
                </label>
                <label class="flex items-center">
                  <input v-model="form.stressHandling" type="checkbox" value="sharing-teachers" class="mr-2">
                  Sharing with teachers/adults in school
                </label>
                <label class="flex items-center">
                  <input v-model="form.stressHandling" type="checkbox" value="sharing-parents" class="mr-2">
                  Sharing with parents
                </label>
                <label class="flex items-center">
                  <input v-model="form.stressHandling" type="checkbox" value="sharing-relatives" class="mr-2">
                  Sharing with a trusted relative
                </label>
                <label class="flex items-center">
                  <input v-model="form.stressHandling" type="checkbox" value="sharing-community" class="mr-2">
                  Sharing with neighbours, community leaders
                </label>
                <label class="flex items-center">
                  <input v-model="form.stressHandling" type="checkbox" value="watching-tv" class="mr-2">
                  Watching TV
                </label>
                <label class="flex items-center">
                  <input v-model="form.stressHandling" type="checkbox" value="other" class="mr-2">
                  Other (specify)
                </label>
                <input v-if="form.stressHandling.includes('other')" v-model="form.stressHandlingOther" type="text" placeholder="Specify other" class="form-input ml-6">
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Who are the child's best friends and why?</label>
              <div class="space-y-2">
                <label class="flex items-center">
                  <input v-model="form.bestFriends" type="checkbox" value="siblings" class="mr-2">
                  Siblings
                </label>
                <label class="flex items-center">
                  <input v-model="form.bestFriends" type="checkbox" value="mother" class="mr-2">
                  Mother
                </label>
                <label class="flex items-center">
                  <input v-model="form.bestFriends" type="checkbox" value="father" class="mr-2">
                  Father
                </label>
                <label class="flex items-center">
                  <input v-model="form.bestFriends" type="checkbox" value="other-relatives" class="mr-2">
                  Other relatives
                </label>
                <label class="flex items-center">
                  <input v-model="form.bestFriends" type="checkbox" value="peers-same-sex" class="mr-2">
                  Peers of the same sex
                </label>
                <label class="flex items-center">
                  <input v-model="form.bestFriends" type="checkbox" value="peers-opposite-sex" class="mr-2">
                  Peers of the opposite sex
                </label>
                <label class="flex items-center">
                  <input v-model="form.bestFriends" type="checkbox" value="neighbour" class="mr-2">
                  Neighbour
                </label>
                <label class="flex items-center">
                  <input v-model="form.bestFriends" type="checkbox" value="teachers" class="mr-2">
                  Teachers
                </label>
                <label class="flex items-center">
                  <input v-model="form.bestFriends" type="checkbox" value="matron-patron" class="mr-2">
                  Matron/patron
                </label>
                <label class="flex items-center">
                  <input v-model="form.bestFriends" type="checkbox" value="school-community" class="mr-2">
                  Other members of the school community
                </label>
                <label class="flex items-center">
                  <input v-model="form.bestFriends" type="checkbox" value="other" class="mr-2">
                  Other (specify)
                </label>
                <input v-if="form.bestFriends.includes('other')" v-model="form.bestFriendsOther" type="text" placeholder="Specify other" class="form-input ml-6">
              </div>
            </div>
          </div>
        </div>

        <div class="flex justify-between">
          <button type="button" @click="$router.push(`/assessments/child/${$route.params.childId}/health`)" class="btn btn-secondary">
            Back to Health
          </button>
          <button type="submit" class="btn btn-primary">
            Save & Continue to Economic
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChildEmotional',
  data() {
    return {
      childData: { childName: 'Loading...' },
      form: {
        interactionWithChildren: '',
        interactionWithAdults: '',
        stressHandling: [],
        stressHandlingOther: '',
        bestFriends: [],
        bestFriendsOther: ''
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
        console.log('Saving emotional section:', this.form)
        this.$router.push(`/assessments/child/${childId}/economic`)
      } catch (error) {
        console.error('Error saving section:', error)
      }
    }
  }
}
</script>
