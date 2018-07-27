import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: { title: 'Home' }
    },
    {
      path: '/about',
      name: 'about',
      component: About,
      meta: { title: 'About' }
    },
    {
      path: '/login',
      name: 'login',
      // TODO: Change login.vue to Login.vue
      component: () => import('@/views/login/login'),
      meta: { title: 'Login', lang: 'mr' }
    },
    {
      path: '/mqlRequestDemo',
      name: 'mqlRequestDemo',
      component: () => import('@/views/MQLRequestDemo'),
      meta: { title: 'MQLRequestDemo' }
    },
    {
      path: '/i18Demo',
      name: 'i18Demo',
      component: () => import('@/views/I18Demo'),
      meta: { title: 'Language Demo' }
    },
    {
      path: '/validator',
      name: 'validator',
      component: () => import('@/views/Validator'),
      meta: { title: 'Validator' }
    },
    {
      path: '/browserCompatibility',
      name: 'browserCompatibility',
      component: () => import('@/views/BrowserCompatibility'),
      meta: { title: 'Browser Compatibility' }
    }
  ]
})
