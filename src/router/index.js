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
import CasePlans from '../views/CasePlans/Index.vue'
import Schools from '../views/Schools/Index.vue'
import Users from '../views/Users/Index.vue'

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
  const requiresAdmin = to.matched.some(record => record.meta.requiresAdmin)
  
  if (requiresAuth && !isAuthenticated.value) {
    next('/login')
  } else if (requiresGuest && isAuthenticated.value) {
    next('/dashboard')
  } else if (requiresAdmin && user.value?.role !== 'admin') {
    next('/dashboard') // Redirect non-admin users
  } else {
    next()
  }
})

export default router
