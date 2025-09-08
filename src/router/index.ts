import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import CVAnalysis from '../views/CVAnalysis.vue'
import JDEvaluation from '../views/JDEvaluation.vue'
import CVDatabase from '../views/CVDatabase.vue'
import Reports from '../views/Reports.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/cv-analysis',
    name: 'CVAnalysis',
    component: CVAnalysis
  },
  {
    path: '/jd-evaluation',
    name: 'JDEvaluation',
    component: JDEvaluation
  },
  {
    path: '/cv-database',
    name: 'CVDatabase',
    component: CVDatabase
  },
  {
    path: '/reports',
    name: 'Reports',
    component: Reports
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
