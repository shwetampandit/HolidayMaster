

export default {
 
  install: (Vue, options) => {console.log(options)
    let baseURL = options.baseURL
    let version = options.version
    let region = options.region
    let appCode = options.appCode

    Vue.getBaseURL = () => {
      return baseURL
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
};