import {
    createRouter, 
    createWebHistory 
  } from 'vue-router'
  import IndexPage from '@/views/IndexPage/index.vue'
  
  const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
      {
        path: '/',
        name: 'index',
        component: IndexPage
      },
      {
        path: '/:pathMatch(.*)*',
        redirect: {
          name: 'index',
          params: {} 
        } 
      }
    ]
  })
  
  export default router