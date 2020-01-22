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
      meta: { title: 'Home', icon : 'mdi mdi-home-outline' }
    },
    {
      path: '/about',
      name: 'about',
      component: loadView('About'),
      meta: { title: 'About', icon : 'mdi mdi-information-variant' }
    },
    {
      path: '/login',
      name: 'login',
      component: loadView('Login'),
      meta: { title: 'Login', lang: 'mr', icon : 'mdi mdi-account' }
    },
    {
      path: '/registration',
      name: 'registration',
      component: loadView('Registration'),
      meta: { title: 'Registration', lang: 'mr', icon : 'mdi mdi-account-edit' }
    },
    {
      path: '/mqlRequestDemo',
      name: 'mqlRequestDemo',
      component: loadView('MQLRequestDemo'),
      meta: { title: 'MQLRequestDemo', icon : 'mdi mdi-presentation-play' }
    },
    {
      path: '/i18Demo',
      name: 'i18Demo',
      component: loadView('I18Demo'),
      meta: { title: 'Language Demo' , icon : 'mdi mdi-eject-outline'}
    },
    {
      path: '/validator',
      name: 'validator',
      component: loadView('Validator'),
      meta: { title: 'Validator', icon : 'mdi mdi-check-all' }
    },
    {
      path: '/encryption',
      name: 'encryption',
      component: loadView('Encryption'),
      meta: { title: 'Encrypt', icon : 'mdi mdi-laptop' }
    },
    {
      path: '/cdnUpload',
      name: 'cdnUpload',
      component: loadView('CdnUpload'),
      meta: { title: 'Cdn Upload' , icon : 'mdi mdi-upload'}
    },
    {
      path: '/tableDemo',
      name: 'tableDemo',
      component: loadView('TableDemo'),
      meta: { title: 'Table Demo', icon : 'mdi mdi-file-table-outline' }
    },
    {
      path: '/veuMetaExample/:title',
      name: 'veuMetaExample',
      component: loadView('VeuMetaExample'),
      meta: { title: 'veuMetaExample', icon : 'mdi mdi-arrow-expand' }
    },
    {
      path: '/MqlAssetFDBDemo',
      name: 'MqlAssetFDBDemo',
      component: loadView('MqlAssetFDBDemo'),
      meta: { title: 'Mql Request For Asset FDB Demo', icon : 'mdi mdi-database-plus' }
    }
  ]
})
