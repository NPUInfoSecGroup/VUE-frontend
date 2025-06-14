import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'

const routes = [
    {
        path: '/',
        redirect: '/dashboard'
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard
    },
    {
        path: '/scan-history',
        name: 'ScanHistory',
        component: () => import('../views/ScanHistory.vue')
    },
    {
        path: '/report-templates',
        name: 'ReportTemplates',
        component: () => import('../views/ReportTemplate.vue')
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

// 完全移除路由守卫
export default router