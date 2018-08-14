// This is your plugin object. It can be exported to be used anywhere.
import axios from 'axios'

const MQLRequest = {
  install (Vue, options) {
    // ------------ Do Not Change it-------------- //
    var version = process.env.VUE_APP_VERSION
    var region = process.env.VUE_APP_REGION
    const POST = 'post'
    var mqlBaseURL = options.mqlBaseURL
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
    const generateURL = (mqlServiceName) => {
      return mqlBaseURL + getVersion() + getRegion() + getServiceURL(mqlServiceName)
    }
    // baseURL/ version/ region/ restrictType/mql
    const getServiceURL = (mqlServiceName) => {
      return (mqlServiceName.split('.').length > 1
      // length > 0
        ? (mqlServiceName.split('.')[0].toLowerCase() === 'c' ? 'r/' + mqlServiceName.split('.')[0].toLowerCase() + '/' : mqlServiceName.split('.')[0].toLowerCase() + '/')
      // length < 0 default to restrict 'r'
        : 'r/') +
        // mql
        'mql'
    }

    const generateHeaders = (mqlServiceName, headers = {}) => {
      headers['Service-Header'] = mqlServiceName.split('.').length > 0 ? mqlServiceName.split('.')[1] : mqlServiceName
      if (mqlServiceName.split('.').length > 1 && mqlServiceName.split('.')[0].toLowerCase() !== 'o') {
        headers['Authorization'] = 'Bearer ' + sessionStorage.getItem('user-token')
      }
      return headers
    }

    // Return mql base axios request of type 'POST'
    const prepareMQLRequest = (requestType, mqlServiceName, postParam = null) => {
      return axios({
        url: generateURL(mqlServiceName),
        method: requestType,
        headers: generateHeaders(mqlServiceName),
        data: postParam
      })
    }
    Vue.setVersion = function (newVersion) {
      version = newVersion
    }
    Vue.setRegion = function (newRegion) {
      region = newRegion
    }
    const getVersion = function () {
      return options.versionEnable ? version + '/' : ''
    }
    const getRegion = function () {
      return options.regionEnable ? region + '/' : ''
    }

    /* Post MQLFetch method */
    const MQLFetch = (serviceKey, postData = null, localStore = false, mutableKey = null) => {
      return new Promise((resolve, reject) => {
        if (localStore && Vue.localStorage.get(serviceKey) !== null) {
          resolve(JSON.parse(Vue.localStorage.get(serviceKey)))
        } else {
          prepareMQLRequest(POST, serviceKey, postData)
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
              reject(error.response.data.error)
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
          prepareMQLRequest(POST, serviceKey, postData)
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
              reject(error.response.data.error)
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
  }
}

export default MQLRequest
