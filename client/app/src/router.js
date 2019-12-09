import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
function loadView (view) {
  return () => import(/* webpackChunkName: "view-[request]" */ `@/views/${view}.vue`)
}
export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: loadView('Home'),
      meta: { title: 'Home' }
    },
    {
      path: '/about',
      name: 'about',
      component: loadView('About'),
      meta: { title: 'About' }
    },
    {
      path: '/login',
      name: 'login',
      component: loadView('Login'),
      meta: { title: 'Login', lang: 'mr' }
    },
    {
      path: '/registration',
      name: 'registration',
      component: loadView('Registration'),
      meta: { title: 'Registration', lang: 'mr' }
    },
    {
      path: '/mqlRequestDemo',
      name: 'mqlRequestDemo',
      component: loadView('MQLRequestDemo'),
      meta: { title: 'MQLRequestDemo' }
    },
    {
      path: '/i18Demo',
      name: 'i18Demo',
      component: loadView('I18Demo'),
      meta: { title: 'Language Demo' }
    },
    {
      path: '/validator',
      name: 'validator',
      component: loadView('Validator'),
      meta: { title: 'Validator' }
    },
    {
      path: '/encryption',
      name: 'encryption',
      component: loadView('Encryption'),
      meta: { title: 'Encrypt' }
    },
    {
      path: '/cdnUpload',
      name: 'cdnUpload',
      component: loadView('CdnUpload'),
      meta: { title: 'Cdn Upload' }
    },
    {
      path: '/tableDemo',
      name: 'tableDemo',
      component: loadView('TableDemo'),
      meta: { title: 'Table Demo' }
    },
    {
      path: '/veuMetaExample/:title',
      name: 'veuMetaExample',
      component: loadView('VeuMetaExample')
    }
  ]
})
