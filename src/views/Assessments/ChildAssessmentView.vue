<template>
  <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
    <div class="bg-white shadow rounded-lg">
      <div class="px-6 py-4 border-b border-gray-200 flex flex-wrap items-center justify-between gap-3 print:hidden">
        <div>
          <h1 class="text-2xl font-bold text-gray-900">Child Assessment - View</h1>
          <p class="mt-1 text-sm text-gray-600">For {{ childData.childName }}</p>
        </div>
        <div class="flex items-center gap-2">
          <button type="button" @click="printPage" class="btn btn-secondary">Print</button>
          <router-link :to="`/assessments/child/${$route.params.childId}`" class="btn btn-primary">Edit</router-link>
        </div>
      </div>

      <!-- Print-only header -->
      <div class="hidden print:block p-6 border-b">
        <h1 class="text-2xl font-bold text-gray-900 mb-2">Child Assessment Report</h1>
        <p class="text-lg text-gray-700">{{ childData.childName }}</p>
        <p class="text-sm text-gray-600">Generated on {{ new Date().toLocaleDateString() }}</p>
      </div>

      <div class="p-6 space-y-6 assessment-content">
        <!-- Child Info -->
        <div class="bg-gray-50 p-3 rounded-lg">
          <h2 class="text-base font-semibold text-gray-900 mb-2">Child Info</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
            <div class="flex items-center"><span class="text-gray-500 w-40">School</span><span class="text-gray-900 truncate">: {{ childData.schoolName || 'Not specified' }}</span></div>
            <div class="flex items-center"><span class="text-gray-500 w-40">Child</span><span class="text-gray-900 truncate">: {{ childData.childName || 'Not specified' }}</span></div>
            <div class="flex items-center"><span class="text-gray-500 w-40">Date of Birth</span><span class="text-gray-900 truncate">: {{ childData.dateOfBirth ? `${formatDate(childData.dateOfBirth)} (${calculateAge(childData.dateOfBirth)} yrs)` : 'Not specified' }}</span></div>
            <div class="flex items-center"><span class="text-gray-500 w-40">Case Number</span><span class="text-gray-900 truncate">: {{ childData.caseNumber || 'Not specified' }}</span></div>
            <div class="flex items-center"><span class="text-gray-500 w-40">Gender</span><span class="text-gray-900 truncate">: {{ childData.gender || 'Not specified' }}</span></div>
            <div class="flex items-center"><span class="text-gray-500 w-40">Religion</span><span class="text-gray-900 truncate">: {{ childData.religion || 'Not specified' }}</span></div>
          </div>
        </div>

        <!-- Latest Assessment Summary -->
        <div v-if="latest.id" class="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          <!-- Education -->
          <div v-if="hasEducationData" class="education-section p-4 rounded-lg h-full">
            <h3 class="font-medium text-gray-800 mb-2">Education</h3>
            <ul class="text-sm text-gray-900 space-y-1">
              <li v-if="latest.education.currently_enrolled !== undefined">Currently enrolled: {{ yesNo(latest.education.currently_enrolled) }}</li>
              <li v-if="latest.education.attending_regularly !== undefined">Attending regularly: {{ yesNo(latest.education.attending_regularly) }}</li>
              <li v-if="latest.education.progressed_last_year !== undefined">Progressed last year: {{ yesNo(latest.education.progressed_last_year) }}</li>
              <li v-if="latest.education.teacher_opinion">Teacher opinion: {{ latest.education.teacher_opinion }}</li>
              <li v-if="latest.education.classroom_behavior">Classroom behavior: {{ latest.education.classroom_behavior }}</li>
            </ul>
          </div>

          <!-- Care & Protection -->
          <div v-if="hasCareData" class="care-section p-4 rounded-lg h-full">
            <h3 class="font-medium text-gray-800 mb-2">Care & Protection</h3>
            <ul class="text-sm text-gray-900 space-y-1">
              <li v-if="latest.care.stable_caregiver_12_months !== undefined">Stable caregiver (12 months): {{ yesNo(latest.care.stable_caregiver_12_months) }}</li>
              <li v-if="latest.care.feeling_withdrawn_6_months !== undefined">Feeling withdrawn (6 months): {{ yesNo(latest.care.feeling_withdrawn_6_months) }}</li>
              <li v-if="latest.care.abuse_reporting_knowledge && latest.care.abuse_reporting_knowledge !== '-'">Reporting knowledge: {{ latest.care.abuse_reporting_knowledge }}</li>
              <li v-if="latest.care.physical_abuse">Physical abuse: {{ latest.care.physical_abuse }}</li>
              <li v-if="latest.care.sexual_abuse">Sexual abuse: {{ latest.care.sexual_abuse }}</li>
              <li v-if="latest.care.meal_withheld">Meal withheld: {{ latest.care.meal_withheld }}</li>
              <li v-if="latest.care.child_labour">Child labour: {{ latest.care.child_labour }}</li>
            </ul>
          </div>

          <!-- Health -->
          <div v-if="hasHealthData" class="health-section p-4 rounded-lg h-full">
            <h3 class="font-medium text-gray-800 mb-2">Health</h3>
            <ul class="text-sm text-gray-900 space-y-1">
              <li v-if="latest.health.adequate_food_school !== undefined">Adequate food at school: {{ yesNo(latest.health.adequate_food_school) }}</li>
              <li v-if="latest.health.adequate_food_home !== undefined">Adequate food at home: {{ yesNo(latest.health.adequate_food_home) }}</li>
              <li v-if="latest.health.safe_drinking_water !== undefined">Safe drinking water: {{ yesNo(latest.health.safe_drinking_water) }}</li>
              <li v-if="latest.health.eats_well !== undefined">Eats well: {{ yesNo(latest.health.eats_well) }}</li>
              <li v-if="latest.health.eating_disorders !== undefined">Eating disorders: {{ yesNo(latest.health.eating_disorders) }}</li>
              <li v-if="latest.health.chronic_disease !== undefined">Chronic disease: {{ yesNo(latest.health.chronic_disease) }}</li>
              <li v-if="latest.health.chronic_illness_type">Chronic illness type: {{ latest.health.chronic_illness_type }}</li>
              <li v-if="latest.health.illness_handling_method">Illness handling method: {{ latest.health.illness_handling_method }}</li>
              <li v-if="latest.health.current_immunizations !== undefined">Current immunizations: {{ yesNo(latest.health.current_immunizations) }}</li>
              <li v-if="latest.health.menstrual_sanitation_access !== undefined">Menstrual sanitation access: {{ yesNo(latest.health.menstrual_sanitation_access) }}</li>
              <li v-if="latest.health.recent_illness !== undefined">Recent illness: {{ yesNo(latest.health.recent_illness) }}</li>
              <li v-if="latest.health.recent_illness_details">Recent illness details: {{ latest.health.recent_illness_details }}</li>
            </ul>
          </div>

          <!-- Emotional -->
          <div v-if="hasEmotionalData" class="emotional-section p-4 rounded-lg h-full">
            <h3 class="font-medium text-gray-800 mb-2">Emotional</h3>
            <ul class="text-sm text-gray-900 space-y-1">
              <li v-if="latest.emotional.peer_interaction_rating && latest.emotional.peer_interaction_rating !== '-'">Peer interaction: {{ latest.emotional.peer_interaction_rating }}</li>
              <li v-if="latest.emotional.adult_interaction_rating && latest.emotional.adult_interaction_rating !== '-'">Adult interaction: {{ latest.emotional.adult_interaction_rating }}</li>
              <li v-if="latest.emotional.stress_handling_methods && latest.emotional.stress_handling_methods.length">Stress handling: {{ latest.emotional.stress_handling_methods.join(', ') }}</li>
              <li v-if="latest.emotional.stress_handling_other">Stress handling (other): {{ latest.emotional.stress_handling_other }}</li>
              <li v-if="latest.emotional.best_friends && latest.emotional.best_friends.length">Best friends: {{ latest.emotional.best_friends.join(', ') }}</li>
            </ul>
          </div>

          <!-- Economic -->
          <div v-if="hasEconomicData" class="economic-section p-4 rounded-lg h-full">
            <h3 class="font-medium text-gray-800 mb-2">Economic</h3>
            <ul class="text-sm text-gray-900 space-y-1">
              <li v-if="latest.economic.reliable_livelihood !== undefined">Reliable livelihood: {{ yesNo(latest.economic.reliable_livelihood) }}</li>
              <li v-if="latest.economic.livelihood_source && latest.economic.livelihood_source !== '-'">Livelihood source: {{ latest.economic.livelihood_source }}</li>
              <li v-if="latest.economic.livelihood_source_other">Livelihood source (other): {{ latest.economic.livelihood_source_other }}</li>
              <li v-if="latest.economic.able_to_pay_school_fees !== undefined">Able to pay school fees: {{ yesNo(latest.economic.able_to_pay_school_fees) }}</li>
              <li v-if="latest.economic.able_to_meet_basic_needs !== undefined">Able to meet basic needs: {{ yesNo(latest.economic.able_to_meet_basic_needs) }}</li>
              <li v-if="latest.economic.caregiver_commitment">Caregiver commitment: {{ latest.economic.caregiver_commitment }}</li>
              <li v-if="latest.economic.economic_situation">Economic situation: {{ latest.economic.economic_situation }}</li>
              <li v-if="latest.economic.future_plans">Future plans: {{ latest.economic.future_plans }}</li>
              <li v-if="latest.economic.notes">Notes: {{ latest.economic.notes }}</li>
            </ul>
          </div>
        </div>

        <!-- No assessment message -->
        <div v-if="!latest.id && !loading" class="text-center py-8">
          <p class="text-gray-500">No assessment data available for this child.</p>
          <router-link :to="`/assessments/child/${$route.params.childId}`" class="btn btn-primary mt-4">
            Start Assessment
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
@media print {
  @page {
    margin: 0.5in;
  }
  
  /* Simple print styles for better performance */
  body * {
    visibility: hidden;
  }
  
  .assessment-content, .assessment-content * {
    visibility: visible;
  }
  
  .assessment-content {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
  }
}

/* Add different colors for each section */
.education-section {
  background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%) !important;
  border-left: 4px solid #3b82f6;
}

.care-section {
  background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%) !important;
  border-left: 4px solid #f59e0b;
}

.health-section {
  background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%) !important;
  border-left: 4px solid #10b981;
}

.emotional-section {
  background: linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%) !important;
  border-left: 4px solid #ec4899;
}

.economic-section {
  background: linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%) !important;
  border-left: 4px solid #6366f1;
}

.education-section h3 { color: #1d4ed8; }
.care-section h3 { color: #d97706; }
.health-section h3 { color: #059669; }
.emotional-section h3 { color: #be185d; }
.economic-section h3 { color: #4338ca; }
</style>

<script>
import api, { childrenAPI, assessmentsAPI } from '../../services/api'

export default {
  name: 'ChildAssessmentView',
  data() {
    return {
      childData: {
        schoolName: '',
        childName: '',
        dateOfBirth: '',
        caseNumber: '',
        gender: '',
        religion: ''
      },
      latest: {
        id: null,
        education: {},
        care: {},
        health: {},
        emotional: {},
        economic: {}
      },
      loading: true
    }
  },
  async mounted() {
    await this.loadData()
  },
  computed: {
    hasEducationData() {
      const e = this.latest.education || {}
      return e.currently_enrolled !== undefined || e.attending_regularly !== undefined || 
             e.progressed_last_year !== undefined || e.teacher_opinion || e.classroom_behavior
    },
    hasCareData() {
      const c = this.latest.care || {}
      return c.stable_caregiver_12_months !== undefined && c.stable_caregiver_12_months !== null || 
             c.feeling_withdrawn_6_months !== undefined && c.feeling_withdrawn_6_months !== null ||
             (c.abuse_reporting_knowledge && c.abuse_reporting_knowledge !== null) ||
             (c.physical_abuse && c.physical_abuse !== null) || 
             (c.sexual_abuse && c.sexual_abuse !== null) ||
             (c.meal_withheld && c.meal_withheld !== null) || 
             (c.child_labour && c.child_labour !== null)
    },
    hasHealthData() {
      const h = this.latest.health || {}
      return h.adequate_food_school !== undefined || h.adequate_food_home !== undefined ||
             h.safe_drinking_water !== undefined || h.eats_well !== undefined ||
             h.eating_disorders !== undefined || h.chronic_disease !== undefined ||
             h.chronic_illness_type || h.illness_handling_method ||
             h.current_immunizations !== undefined || h.menstrual_sanitation_access !== undefined ||
             h.recent_illness !== undefined || h.recent_illness_details
    },
    hasEmotionalData() {
      const e = this.latest.emotional || {}
      return (e.peer_interaction_rating && e.peer_interaction_rating !== '-') ||
             (e.adult_interaction_rating && e.adult_interaction_rating !== '-') ||
             (e.stress_handling_methods && e.stress_handling_methods.length) || 
             e.stress_handling_other || 
             (e.best_friends && e.best_friends.length)
    },
    hasEconomicData() {
      const e = this.latest.economic || {}
      return e.reliable_livelihood !== undefined || (e.livelihood_source && e.livelihood_source !== '-') ||
             e.livelihood_source_other || e.able_to_pay_school_fees !== undefined ||
             e.able_to_meet_basic_needs !== undefined || e.caregiver_commitment ||
             e.economic_situation || e.future_plans || e.notes
    }
  },
  methods: {
    async loadData() {
      try {
        const childId = this.$route.params.childId
        console.log('Loading assessment view for child:', childId)
        
        const childRes = await childrenAPI.getById(childId)
        console.log('Child data:', childRes.data)
        
        this.childData = {
          schoolName: childRes.data.school?.name || 'Not specified',
          childName: childRes.data.name || 'Not specified',
          dateOfBirth: childRes.data.date_of_birth || '',
          caseNumber: childRes.data.case_number || 'Not specified',
          gender: childRes.data.gender || 'Not specified',
          religion: childRes.data.religion || 'Not specified'
        }

        const assessRes = await assessmentsAPI.getByChild(childId)
        console.log('Assessment response:', assessRes.data)
        
        // Handle both array and object responses
        let raw = {}
        if (assessRes.data?.data && Array.isArray(assessRes.data.data)) {
          raw = assessRes.data.data[0] || {}
        } else if (Array.isArray(assessRes.data)) {
          raw = assessRes.data[0] || {}
        } else if (assessRes.data?.data) {
          raw = assessRes.data.data
        } else {
          raw = assessRes.data || {}
        }
        
        console.log('Raw assessment data:', raw)
        this.latest.id = raw.id || null

        this.latest.education = {
          currently_enrolled: toBool(raw.currently_enrolled),
          attending_regularly: toBool(raw.attending_regularly),
          progressed_last_year: toBool(raw.progressed_last_year),
          teacher_opinion: raw.teacher_opinion || '',
          classroom_behavior: raw.classroom_behavior || ''
        }
        
        this.latest.care = {
          stable_caregiver_12_months: toBool(raw.stable_caregiver_12_months),
          feeling_withdrawn_6_months: toBool(raw.feeling_withdrawn_6_months),
          abuse_reporting_knowledge: mapReportingKnowledge(raw.abuse_reporting_knowledge),
          physical_abuse: pickExperience(raw.physical_abuse),
          sexual_abuse: pickExperience(raw.sexual_abuse),
          meal_withheld: pickExperience(raw.meal_withheld),
          child_labour: pickExperience(raw.child_labour)
        }
        
        this.latest.health = {
          adequate_food_school: toBool(raw.adequate_food_school),
          adequate_food_home: toBool(raw.adequate_food_home),
          safe_drinking_water: toBool(raw.safe_drinking_water),
          eats_well: toBool(raw.eats_well),
          eating_disorders: toBool(raw.eating_disorders),
          chronic_disease: toBool(raw.chronic_disease),
          chronic_illness_type: raw.chronic_illness_type || '',
          illness_handling_method: raw.illness_handling_method || '',
          current_immunizations: toBool(raw.current_immunizations),
          menstrual_sanitation_access: toBool(raw.menstrual_sanitation_access),
          recent_illness: toBool(raw.recent_illness),
          recent_illness_details: raw.recent_illness_details || ''
        }
        
        this.latest.emotional = {
          peer_interaction_rating: formatInteractionRating(raw.peer_interaction_rating),
          adult_interaction_rating: formatInteractionRating(raw.adult_interaction_rating),
          stress_handling_methods: parseArray(raw.stress_handling_methods),
          stress_handling_other: raw.stress_handling_other || '',
          best_friends: parseArray(raw.best_friends).filter(Boolean)
        }
        
        this.latest.economic = {
          reliable_livelihood: toBool(raw.reliable_livelihood),
          livelihood_source: formatLivelihoodSource(raw.livelihood_source),
          livelihood_source_other: raw.livelihood_source_other || '',
          able_to_pay_school_fees: toBool(raw.able_to_pay_school_fees),
          able_to_meet_basic_needs: toBool(raw.able_to_meet_basic_needs),
          caregiver_commitment: raw.caregiver_commitment || '',
          economic_situation: raw.economic_situation || '',
          future_plans: raw.future_plans || '',
          notes: raw.notes || ''
        }
        
        console.log('Processed assessment data:', this.latest)
      } catch (e) {
        console.error('Error loading view data:', e)
        alert('Failed to load assessment data')
      } finally {
        this.loading = false
      }
    },
    yesNo(val) {
      if (val === true) return 'Yes'
      if (val === false) return 'No'
      return '-'
    },
    experienceLabel(v) {
      return pickExperience(v)
    },
    labelOrDash(v) {
      return v && String(v).trim().length ? v : '-'
    },
    arrayOrDash(arr) {
      return Array.isArray(arr) && arr.length ? arr.join(', ') : '-'
    },
    formatDate(dateString) {
      try {
        const date = new Date(dateString)
        return date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: '2-digit' })
      } catch (_) {
        return dateString
      }
    },
    calculateAge(dateString) {
      try {
        const dob = new Date(dateString)
        const now = new Date()
        let age = now.getFullYear() - dob.getFullYear()
        const m = now.getMonth() - dob.getMonth()
        if (m < 0 || (m === 0 && now.getDate() < dob.getDate())) {
          age--
        }
        return isNaN(age) ? '-' : age
      } catch (_) {
        return '-'
      }
    },
    printPage() {
      // Hide elements before printing for better performance
      const elementsToHide = document.querySelectorAll('nav, header, .btn, button')
      elementsToHide.forEach(el => el.style.display = 'none')
      
      setTimeout(() => {
        window.print()
        // Restore elements after printing
        elementsToHide.forEach(el => el.style.display = '')
      }, 100)
    }
  }
}

// helpers
function toBool(v) {
  if (v === true || v === 1 || v === '1' || v === 'yes') return true
  if (v === false || v === 0 || v === '0' || v === 'no') return false
  return undefined
}

function parseArray(v) {
  if (Array.isArray(v)) return v
  if (typeof v === 'string') {
    try {
      return JSON.parse(v)
    } catch {
      return v.split(',').map(s => s.trim()).filter(Boolean)
    }
  }
  return []
}

function pickExperience(arr) {
  if (!arr || (Array.isArray(arr) && arr.length === 0)) return null
  const v = Array.isArray(arr) && arr.length ? arr[0] : arr
  if (v === 'experienced') return 'Experienced'
  if (v === 'not_experienced') return 'Not experienced'
  return null
}

function mapReportingKnowledge(v) {
  const map = { 
    'primary-caregiver': 'Primary caregiver',
    'family-member': 'Family member',
    'teacher': 'Teacher',
    'police': 'Police',
    'nothing': 'Nothing',
    'basic': 'Basic', 
    'good': 'Good', 
    'excellent': 'Excellent', 
    'none': 'None' 
  }
  return map[v] || (v ? v : '-')
}

function formatInteractionRating(v) {
  const map = {
    'perfectly-well': 'Perfectly well',
    'somewhat-well': 'Somewhat well',
    'not-well': 'Not well',
    'yes': 'Well',
    'no': 'Not well'
  }
  return map[v] || (v ? v : '-')
}

function formatLivelihoodSource(v) {
  const map = {
    'formal-employment': 'Formal employment',
    'informal-business': 'Informal business',
    'farming': 'Farming',
    'remittances': 'Remittances',
    'government-support': 'Government support',
    'other': 'Other'
  }
  return map[v] || (v ? v : '-')
}
</script> 