import axios from 'axios'

export default {
  install: (Vue, options) => {
    const mqlInstance = axios.create({
      baseURL: options.mqlBaseURL
    })
    let activityType, 
        activityArray = [], 
        fetchableMap, isQuery = false, isActivity = false, 
        externalHeader = {}, customURL = null, cancel, version = process.env.VUE_APP_VERSION, 
        region = process.env.VUE_APP_REGION

    const QueryActivityKey = 'QueryFetch', 
          QuerySeperator = 'query_',
          ActivitySplitter = '.[',
          ObjActivityNameKey = 'ActivityName',
          ObjActivityData = 'Data',
          CancelToken = axios.CancelToken, Post = 'post'
    const setVersion = function (newVersion) {
      version = newVersion
    }
    const setRegion = function (newRegion) {
      region = newRegion
    }
    const getVersion = function () {
      return options.versionEnable ? version + '/' : ''
    }
    const getRegion = function () {
      return options.regionEnable ? region + '/' : ''
    }
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
    const generateURL = (activityType, customURL) => {
      if (customURL != null && customURL !== undefined) {
        return customURL + getVersion() + getRegion() + getServiceURL(activityType)
      } else {
        return getVersion() + getRegion() + getServiceURL(activityType)
      }
    }
    // baseURL/ version/ region/ restrictType/mql
    const getServiceURL = (activityType) => {
      //console.log('service url')
      return (
        activityType.toLowerCase() === 'c' 
        ? 'r/' + activityType.toLowerCase() + '/' 
        : activityType.toLowerCase() + '/')
         +
        'mql'
    }

     const generateHeaders = (activityType, activities, headers = {}, isQuery = false) => {
       //console.log(isQuery, headers)
      headers['Service-Header'] = isQuery ? QueryActivityKey : activities
      if (activityType !== 'o') {
        headers['Authorization'] = 'Bearer ' + sessionStorage.getItem('user-token')
      }
      return headers
    }

    // Return mql base axios request of type 'POST'
    const prepareMQLRequest = (activityType, activities, postParamObj, customURL = null, headers = {}, isQuery = false) => {
      return mqlInstance({
        url: generateURL(activityType, customURL),
        method: Post,
        headers: generateHeaders(activityType, activities, headers, isQuery),
        data: postParamObj,
        cancelToken: new CancelToken(function executor(c) {
          // An executor function receives a cancel function as a parameter
          cancel = c;
        })
      })
    }
   
   mqlInstance.interceptors.request.use(function (config) {
      if (config.url.indexOf('r/') !== -1) { // Check for restricted request
        if (sessionStorage.getItem('user-token') === null) {
          cancel("Operation canceled by the MQL interceptor.")
          //TODO: Uncomment below code for dispatch
          // window.app.$store.dispatch('AUTH_LOGOUT')
        }
      }
      return config
    }, function (error) {
      return Promise.reject(error)
    })
    mqlInstance.interceptors.response.use(function (config) {
      if (config.url.indexOf('r/') !== -1) { // Check for restricted request
        if (sessionStorage.getItem('user-token') === null) {
          cancel("Operation canceled by the MQL interceptor.")
          //TODO: Uncomment below code for dispatch
          // window.app.$store.dispatch('AUTH_LOGOUT')
        }
      }
      return config
    }, function (error) {
      return Promise.reject(error)
    })
    Vue.prototype.$MQL = {
      setMap() {
        this.fetchableMap = new Map()
      },
       formatActivity (activity_str) {
        activityType = activity_str.split(ActivitySplitter)[0]
        this.fetchableMap.set('ActivityType', activityType)
        activityArray = ((activity_str.split(ActivitySplitter)[1]).substring(0, (activity_str.split(ActivitySplitter)[1]).length - 1)).split(',')      
        activityArray.map(item => {
          let obj = {},srvName;
          obj[ObjActivityData] = null
          if(item.match(/query_/) !== null && item.match(/query_/).length > 0) {
            obj[item] = item.trim()
            srvName = item.trim()
            isQuery = true;
          } else {
            obj[ObjActivityNameKey] = item.trim()
            srvName = item.trim()
            isActivity = true;
          }
          this.fetchableMap.set(srvName, obj)
  
        })
        return{'isQuery': isQuery, 'isActivity': isActivity}
      },
      setActivity(str) {
        this.setMap()
        let formattedResult = this.formatActivity(str)
        if(formattedResult.isQuery && formattedResult.isActivity) {
          console.error('Can not support query and activity in a single execution')
          return
        } else {
          this.fetchableMap.set('isQuery', formattedResult.isQuery)
          return this
        }       
      },
      setData(activity = null, data = null) {
        //console.log(activity, data, this.fetchableMap)
        if (null === activity) {
          console.error('Data cannot be null')
        } else if(null === data) {
          // common data
          for (let [key, value] of this.fetchableMap) {
            if (null === value[ObjActivityData]) {
              value[ObjActivityData] = activity
              this.fetchableMap.set(key, value )
            }
          }
        } else {
          // service specific
          let activityValue = this.fetchableMap.get(activity)
          activityValue[ObjActivityData] = data
              this.fetchableMap.set(activity, activityValue )
        }
        return this
      },
      setHeader(header = {}) {
        this.fetchableMap.set('Header', header )
        return this
      },
      setCustomURL(url = null) {
        this.fetchableMap.set('CustomURL', url )        
        return this
      },
      fetch() {
        return new Promise((resolve, reject) => {
          let activities = new String()
          let postParamObject = {}
          for (var [key, value] of this.fetchableMap) {
           
            if (key.search('ActivityType') < 0 && key.search('Header') < 0 && key.search('CustomURL') < 0 && key.search('isQuery') < 0){
              activities = activities + ',' + key
              postParamObject[key.match(/query_/) !== null && key.match(/query_/).length > 0? key.substring('query_'.length, key.length): key] = value.Data
            }
          }
          //console.log(this.fetchableMap)
          prepareMQLRequest(this.fetchableMap.get('ActivityType'), activities.substring(1, activities.length), postParamObject, this.fetchableMap.get('CustomURL'), this.fetchableMap.get('Header'), this.fetchableMap.get('isQuery'))
            .then(function (response) {
              var data = deepFreeze(response.data)
              data.fetchablObj = fetch
              resolve(data)
            })
            .catch(function (error) {
               if(error.message === 'Network Error'){
                var data = {}
                data.result = null
                data.error = 'Network Error'
                reject(data)
              }else if(axios.isCancel(error)){
                var data = {}
                data.result = null
                data.error = error.message
                reject(data)
              }
              else if (!error.response.data.error) {
                var data = {}
                data.result = null
                data.error = error.response.status
                reject(data)
              } else {
                var data = {}
                data.result = null
                data.error = error.message
                reject(data)
              }
            })
            .then(function () {
              resolve('do something')
            })
        });
      }
    };
  }
};