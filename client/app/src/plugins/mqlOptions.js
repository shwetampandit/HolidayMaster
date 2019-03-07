export default {

  install: (Vue, options) => {
    let baseURL = options.baseURL
    let cdnBaseURL = options.cdnBaseURL
    let version = options.version
    let region = options.region
    let appCode = options.appCode
    let pageLoader = false
    let bucketConfigurations = [
      {
        'bucketKey': 'client1',
        'bucketId': 'client1'
      },
      {
        'bucketKey': 'client2',
        'bucketId': 'client2'
      }

    ]
    Vue.getBucketIdByKey = (bucketKey) => {
      let result = bucketConfigurations.find(bucket => bucket.bucketKey === bucketKey)
      return result
    }
    Vue.prototype.$p = 'hello'
    Vue.prototype.$PageLoader = pageLoader
    Vue.setPageLoader = (show = false) => {
      alert(show)
      pageLoader = show
    }
    Vue.getBaseURL = () => {
      return baseURL
    }
    Vue.getCDNBaseURL = () => {
      return cdnBaseURL
    }
    Vue.setBaseURL = (str) => {
      baseURL = str
    }

    Vue.getVersion = function () {
      return version
    }
    Vue.setVersion = function (str) {
      version = str
    }

    Vue.getRegion = function () {
      return region
    }
    Vue.setRegion = function (str) {
      region = str
    }

    Vue.getAppCode = function () {
      return appCode
    }
    Vue.setAppCode = function (str) {
      appCode = str
    }
  }
}
