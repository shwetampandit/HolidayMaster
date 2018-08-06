import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from '@/store'
import './registerServiceWorker'
import axios from 'axios'
import VueLogger from 'vuejs-logger'
import mql from './plugins/mql.js'
import VueLocalStorage from 'vue-localstorage'
import { loadLanguageAsync, i18n } from './setup/i18n-setup.js'

import '../public/assets/plugins/bootstrap-4.1.2-dist/css/bootstrap.min.css'

Vue.config.productionTip = false
const isProduction = process.env.NODE_ENV === 'production'

const options = {
  isEnabled: true,
  logLevel: isProduction ? 'error' : 'debug',
  stringifyArguments: false,
  showLogLevel: true,
  showMethodName: true,
  separator: '|',
  showConsoleColors: true
}
Vue.use(VueLogger, options)

var baseURL = 'http://localhost:8080/server/'

// TODO: set axios header on login  to session storage
// axios.defaults.headers.common['Authorization'] = 'Bearer ' + token

// TODO: delete axios header on logout and clear session storage
// delete axios.defaults.headers.common['Authorization']
Vue.use(mql, {
  mqlBaseURL: baseURL,
  versionEnable: false,
  regionEnable: false
})

Vue.use(VueLocalStorage)

router.beforeEach((to, from, next) => {
  loadLanguageAsync(to.meta.lang).then(() => next())

  const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title)
  const nearestWithMeta = to.matched.slice().reverse().find(r => r.meta && r.meta.metaTags)

  if (nearestWithTitle) document.title = nearestWithTitle.meta.title

  Array.from(document.querySelectorAll('[data-vue-router-controlled]')).map(el => el.parentNode.removeChild(el))

  if (!nearestWithMeta) return next()
  nearestWithMeta.meta.metaTags.map(tagDef => {
    const tag = document.createElement('meta')
    Object.keys(tagDef).forEach(key => {
      tag.setAttribute(key, tagDef[key])
    })
    tag.setAttribute('data-vue-router-controlled', '')
    return tag
  })
    .forEach(tag => document.head.appendChild(tag))
  next()
})

axios.interceptors.request.use(function (config) {
  // if (config.url.indexOf('/r/') !== -1) {  // Check for restricted request
  if (config.headers.common['Authorization']) {
    console.log('autorize!')
  } else {
    console.log('not authorize')
  }
  // }
  return config
}, function (error) {
  return Promise.reject(error)
})


var vm = new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')

window.app = vm
