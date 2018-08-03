// This is your plugin object. It can be exported to be used anywhere.
import axios from 'axios'

const MQLRequest = {
  install (Vue, options) {
    // ------------ Do Not Change it-------------- //
    var version = process.env.VUE_APP_VERSION
    var region = options.region
    const POST = 'post'
    // ------------ Do Not Change it-------------- //
    const deepFreeze = (object) => {
      // Retrieve the property names defined on object
      var propNames = Object.getOwnPropertyNames(object)
      // Freeze properties before freezing self

      for (let name of propNames) {
        let value = object[name]

        object[name] = value && typeof value === 'object'
          ? deepFreeze(value) : value
      }

      return Object.freeze(object)
    }
    const prepareAxiosRequest = (requestType, serviceKey, postParam = null, queryParams = null) => {
      return axios({
        url: process.env.NODE_ENV !== 'development'
          ? serviceKey.split('.').length > 0
            ? version + (region.trim() !== ''
              ? '/' + region : '') + '/' + serviceKey.split('.')[0].toLowerCase() + '/mql'
            : serviceKey
          : serviceKey.split('.')[0].toLowerCase() + '/mql',
        // url: serviceKey.split('.')[1],
        method: requestType,
        headers: { 'Service-Header': serviceKey.split('.')[1] },
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

    /* Post MQLFetch method */
    const MQLFetch = (serviceKey, postData = null, localStore = false, mutableKey = null) => {
      return new Promise((resolve, reject) => {
        if (localStore && Vue.localStorage.get(serviceKey) !== null) {
          resolve(JSON.parse(Vue.localStorage.get(serviceKey)))
        } else {
          prepareAxiosRequest(POST, serviceKey, postData)
            .then(function (response) {
              var data = deepFreeze(response.data)
              if (localStore) {
                Vue.localStorage.set(serviceKey, JSON.stringify(data))
              }
              if (mutableKey !== null) {
                window.app.$store.commit(mutableKey, data)
              }
              resolve(data)
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
    /** ******* SLOW MQL Fetch ****************/
    const SlowMQLFetch = (serviceKey, postData = null, localStore = false, mutableKey = null) => {
      return new Promise((resolve, reject) => {
        if (localStore && Vue.localStorage.get(serviceKey) !== null) {
          resolve(JSON.parse(Vue.localStorage.get(serviceKey)))
        } else {
          prepareAxiosRequest(POST, serviceKey, postData)
            .then(function (response) {
              var data = response.data
              if (localStore) {
                Vue.localStorage.set(serviceKey, JSON.stringify(data))
              }
              if (mutableKey !== null) {
                window.app.$store.commit(mutableKey, data)
              }
              resolve(data)
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
    const MQLGet = (serviceKey, postData = null, localStore = false, mutableKey = null) => {
      return new Promise((resolve, reject) => {
        if (localStore && Vue.localStorage.get(serviceKey) !== null) {
          resolve(JSON.parse(Vue.localStorage.get(serviceKey)))
        } else {
          prepareAxiosRequest('get', serviceKey, postData)
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
    Vue.prototype.$MQLFetch = MQLFetch
    Vue.MQLFetch = MQLFetch
    Vue.prototype.$SlowMQLFetch = SlowMQLFetch
    Vue.SlowMQLFetch = SlowMQLFetch
    Vue.MQLGet = MQLGet
  }
}

export default MQLRequest
