// This is your plugin object. It can be exported to be used anywhere.
import axios from 'axios'

const MQLRequest = {
  install (Vue, options) {
    // ------------ Do Not Change it-------------- //
    var version = options.version || 'default'
    var region = options.region || 'default'
    const GET = 'get'
    const POST = 'post'
    // ------------ Do Not Change it-------------- //

    const prepareAxiosRequest = (requestType, serviceKey, postParam = null, queryParams = null) => {
      return axios({
        url: serviceKey.split('.').length > 0
          ? version + (region.trim() !== ''
            ? '/' + region : '') + '/' + serviceKey.split('.')[0].toLowerCase() + '/mql' : serviceKey,
        method: requestType,
        headers: { 'Service-Header': serviceKey },
        data: postParam,
        params: queryParams
      })
    }
    Vue.setVersion = function (newVersion) {
      version = newVersion
    }
    Vue.setRegion = function (newRegion) {
      region = newRegion
    }
    Vue.getVersion = function () {
      return version
    }
    Vue.getRegion = function () {
      return region
    }
    /* Get instance method */
    Vue.prototype.$Get = function (serviceKey, postData = null, queryData = null, localStore = false, mutableKey = null) {
      return new Promise((resolve, reject) => {
        if (localStore && Vue.localStorage.get(serviceKey) !== null) {
          resolve(JSON.parse(Vue.localStorage.get(serviceKey)))
        } else {
          prepareAxiosRequest(GET, serviceKey, postData, queryData)
            .then(function (response) {
              if (localStore) {
                Vue.localStorage.set(serviceKey, JSON.stringify(response.data))
              }
              resolve(response.data)
            })
            .catch(function (error) {
              reject(error)
            })
            .then(function () {
              resolve('do something')
            })
        }
      })
    }
    /* Post MQLFetch method */
    Vue.prototype.$MQLFetch = function (serviceKey, postData = null, queryData = null, localStore = false, mutableKey = null) {
      return new Promise((resolve, reject) => {
        if (localStore && Vue.localStorage.get(serviceKey) !== null) {
          resolve(JSON.parse(Vue.localStorage.get(serviceKey)))
        } else {
          prepareAxiosRequest(POST, serviceKey, postData, queryData)
            .then(function (response) {
              if (localStore) {
                Vue.localStorage.set(serviceKey, JSON.stringify(response.data))
              }
              if (mutableKey !== null) {
                window.app.$store.commit(mutableKey, response.data)
              }
              resolve(response.data)
            })
            .catch(function (error) {
              reject(error)
            })
            .then(function () {
              resolve('do something')
            })
        }
      })
    }
  }
}

export default MQLRequest
