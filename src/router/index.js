import { createRouter, createWebHistory } from 'vue-router'
import { isAuthenticated, user } from '../stores/auth'

// Import views (we'll create these)
import Login from '../views/Login.vue'
import Dashboard from '../views/Dashboard.vue'
import Children from '../views/Children/Index.vue'
import ChildDetail from '../views/Children/Detail.vue'
import CreateChild from '../views/Children/Create.vue'
import EditChild from '../views/Children/Edit.vue'
import Assessments from '../views/Assessments/Index.vue'
import CreateAssessment from '../views/Assessments/Create.vue'
import ChildAssessment from '../views/Assessments/ChildAssessment.vue'
import ChildEducation from '../views/Assessments/ChildEducation.vue'
import ChildCareProtection from '../views/Assessments/ChildCareProtection.vue'
import ChildHealth from '../views/Assessments/ChildHealth.vue'
import ChildEmotional from '../views/Assessments/ChildEmotional.vue'
import ChildEconomic from '../views/Assessments/ChildEconomic.vue'
import FamilyAssessment from '../views/Assessments/FamilyAssessment.vue'
import FamilyEconomic from '../views/Assessments/FamilyEconomic.vue'
import FamilyHealth from '../views/Assessments/FamilyHealth.vue'
import FamilyCareProtection from '../views/Assessments/FamilyCareProtection.vue'
import CasePlans from '../views/CasePlans/Index.vue'
import Schools from '../views/Schools/Index.vue'
import Users from '../views/Users/Index.vue'
import ChildAssessmentView from '../views/Assessments/ChildAssessmentView.vue'

const routes = [
  {
    path: '/',
    redirect: '/dashboard'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { requiresGuest: true }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true }
  },
  {
    path: '/children',
    name: 'Children',
    component: Children,
    meta: { requiresAuth: true }
  },
  {
    path: '/children/create',
    name: 'CreateChild',
    component: CreateChild,
    meta: { requiresAuth: true }
  },
  {
    path: '/children/:id',
    name: 'ChildDetail',
    component: ChildDetail,
    meta: { requiresAuth: true }
  },
  {
    path: '/children/:id/edit',
    name: 'EditChild',
    component: EditChild,
    meta: { requiresAuth: true }
  },
  {
    path: '/assessments',
    name: 'Assessments',
    component: Assessments,
    meta: { requiresAuth: true }
  },
  {
    path: '/assessments/child/:childId',
    name: 'ChildAssessment',
    component: ChildAssessment,
    meta: { requiresAuth: true }
  },
  {
    path: '/assessments/child/:childId/view',
    name: 'ChildAssessmentView',
    component: ChildAssessmentView,
    meta: { requiresAuth: true }
  },
  {
    path: '/assessments/child/:childId/care-protection',
    name: 'ChildCareProtection',
    component: ChildCareProtection,
    meta: { requiresAuth: true }
  },
  {
    path: '/assessments/child/:childId/health',
    name: 'ChildHealth',
    component: ChildHealth,
    meta: { requiresAuth: true }
  },
  {
    path: '/assessments/child/:childId/emotional',
    name: 'ChildEmotional',
    component: ChildEmotional,
    meta: { requiresAuth: true }
  },
  {
    path: '/assessments/child/:childId/economic',
    name: 'ChildEconomic',
    component: ChildEconomic,
    meta: { requiresAuth: true }
  },
  {
    path: '/assessments/family/:childId',
    name: 'FamilyAssessment',
    component: FamilyAssessment,
    meta: { requiresAuth: true }
  },
  {
    path: '/assessments/family/:childId/economic',
    name: 'FamilyEconomic',
    component: FamilyEconomic,
    meta: { requiresAuth: true }
  },
  {
    path: '/assessments/family/:childId/health',
    name: 'FamilyHealth',
    component: FamilyHealth,
    meta: { requiresAuth: true }
  },
  {
    path: '/assessments/family/:childId/care-protection',
    name: 'FamilyCareProtection',
    component: FamilyCareProtection,
    meta: { requiresAuth: true }
  },
  {
    path: '/children/:childId/assessments/create',
    name: 'CreateAssessment',
    component: CreateAssessment,
    meta: { requiresAuth: true }
  },
  {
    path: '/case-casePlans',
    name: 'CasePlans',
    component: CasePlans,
    meta: { requiresAuth: true }
  },
  {
    path: '/schools',
    name: 'Schools',
    component: Schools,
    meta: { requiresAuth: true, requiresAdmin: true }
  },
  {
    path: '/users',
    name: 'Users',
    component: Users,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Navigation guards
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const requiresGuest = to.matched.some(record => record.meta.requiresGuest)
  const requiresAdmin = user.value?.role !== 'admin' && to.matched.some(record => record.meta.requiresAdmin)
  
  if (requiresAuth && !isAuthenticated.value) {
    next('/login')
  } else if (requiresGuest && isAuthenticated.value) {
    next('/dashboard')
  } else if (requiresAdmin) {
    next('/dashboard') // Redirect non-admin users
  } else {
    next()
  }
})

export default router
