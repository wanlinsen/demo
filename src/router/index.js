import Vue from 'vue'
import VueRouter from 'vue-router'
// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },

  {
    path: '/login',
    name: 'Login',
    meta: {
      title: '登录页面',
      activation: true
    },
    component: () => import('@/views/base/login/Login.vue')
  },
  {
    path: '/home',
    name: 'Home',
    redirect: '/homepage',
    component: () => import('@/views/base/Home.vue'),
    children: [
      {
        path: '/homepage',
        name: 'HomePage',
        component: () => import('@/views/base/homepage/HomePage'),
      },
      {
        path: '/order/query',
        component: () => import('@/components/order/Query'),
      },
      {
        path: '/order/addorder',
        component: () => import('@/components/order/AddOrder'),
      },
      {
        path: '/order/detail',
        component: () => import('@/components/order/Detail'),
      },
      {
        path: '/equipment/addequipment',
        component: () => import('@/components/Equipment/AddEquipment'),
      }
    ]

  },


]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
//利用导航守卫阻止用户的访问权限
router.beforeEach((to, from, next) => {
  if (to.path == '/login') return next()
  //判断用户请求时是否携带了token
  const tokenStr = sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})

export default router
