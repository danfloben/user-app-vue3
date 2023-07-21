import { createRouter, createWebHistory } from 'vue-router'
import UserView from '../views/UserView.vue'
import UserDetail from '../views/UserDetail.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'users',
      component: UserView
    },
    {
      path: '/users/:id',
      name: 'id',
      component: UserDetail,
      props: true,
    },
  ]
})

export default router
