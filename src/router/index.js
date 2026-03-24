import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import NoteDetail from '@/views/NoteDetail.vue'
import Dashboard from '@/views/Dashboard.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: HomeView,
    },
    { path: '/note/:id', component: NoteDetail, props: true },
    { path: '/dashboard', component: Dashboard}
  ],
})

export default router
