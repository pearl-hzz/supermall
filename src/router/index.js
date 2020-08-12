// 此页面配置相关路由的信息
import Vue from 'vue'
import VueRouter from 'vue-router'

// 安装插件
Vue.use(VueRouter)

const routes = [{
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    meta: {
      title: '首页'
    },
    component: () => import('../views/home/home.vue'),
    children: [],
    beforeEach: (to, form, next) => {
      // document.title = to.matched[0].meta.title
      // next()//必须执行，否则不知道下一步需要干什么
    }
  },
  {
    path: '/class',
    name: 'class',
    meta: {
      title: '分类'
    },
    component: () => import( /* webpackChunkName: "about" */ '../views/class/class.vue')
  },
  {
    path: '/shopCar',
    name: 'shopCar',
    meta: {
      title: '购物车'
    },
    component: () => import('../views/shopCar/shopCar.vue')
  },
  {
    path: '/my',
    name: 'my',
    meta: {
      title: '个人中心'
    },
    component: () => import('../views/myPersonal/person.vue')
  },
  {
    path: '/detail/:iid/',
    name: 'detail',
    meta: {
      title: '详情页'
    },
    component: () => import('../views/detail/detail.vue')
  }
]

// 创建VueRoouter对象
const router = new VueRouter({
  mode: 'history', //修改为h5得history模式，不设置就会使hash /#/
  base: process.env.BASE_URL,
  routes,
  linkActiveClass: 'active' //修改路由的激活类名
})

// 前置钩子  /（守卫）
router.beforeEach((to, form, next) => {
  document.title = to.matched[0].meta.title
  next() //必须执行，否则不知道下一步需要干什么
})
export default router