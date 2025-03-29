import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/fetch',
      name: 'fetch',
      component: () => import('../views/FetchView.vue'),
    },
    {
      path: '/ecpay',
      name: 'ecpay',
      component: () => import('../views/EcpayView.vue'),
    },
    {
      path: '/ecpayresult',
      name: 'ecpayresult',
      component: () => import('../views/EcpayResultView.vue'),
    },
    {
      path: '/linepay',
      name: 'linepay',
      component: () => import('../views/LinepayView.vue'),
      children: [
        {
          // 当 /user/:id/profile 匹配成功
          // UserProfile 将被渲染到 User 的 <router-view> 内部
          path: 'confirm',
          component: () => import('../components/payment/LinepayConfirm.vue'),
        },
        {
          // 当 /user/:id/posts 匹配成功
          // UserPosts 将被渲染到 User 的 <router-view> 内部
          path: 'cancel',
          component: () => import('../components/payment/LinepayCancel.vue'),
        },
      ],
    },
  ],
})

export default router
