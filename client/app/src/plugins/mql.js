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
      //console.log('1' + mqlBaseURL)
      if (customURL != null && customURL !== undefined) {
        return customURL + getVersion() + getRegion() + getServiceURL(activityType)
      } else {
        return getVersion() + getRegion() + getServiceURL(activityType)
      }
    }
    // baseURL/ version/ region/ restrictType/mql
    const getServiceURL = (activityType) => {
      return (
        activityType.toLowerCase() === 'c' 
        ? 'r/' + activityType.toLowerCase() + '/' 
        : activityType.toLowerCase() + '/')
         +
        'mql'
    }

     const generateHeaders = (activityType, activities, headers = {}) => {
      headers['Service-Header'] = isQuery ? QueryActivityKey : activities
      if (activityType !== 'o') {
        headers['Authorization'] = 'Bearer ' + sessionStorage.getItem('user-token')
      }
      return headers
    }

    // Return mql base axios request of type 'POST'
    const prepareMQLRequest = (activityType, activities, postParamObj, customURL = null, headers = null) => {
      return mqlInstance({
        url: generateURL(activityType, customURL),
        method: Post,
        headers: generateHeaders(activityType, activities, headers),
        data: postParamObj,
        cancelToken: new CancelToken(function executor(c) {
          // An executor function receives a cancel function as a parameter
          cancel = c;
        })
      })
    }

    const formatActivity = (activity_str) => {
      fetchableMap = new Map()
      activityType = activity_str.split(ActivitySplitter)[0]
      fetchableMap.set('ActivityType', activityType)
      activityArray = ((activity_str.split(ActivitySplitter)[1]).substring(0, (activity_str.split(ActivitySplitter)[1]).length - 1)).split(',')      
      activityArray.map(item => {
        let obj = {},srvName;
        obj[ObjActivityData] = null
        if(item.search(QuerySeperator) > 0) {
          obj[ObjActivityNameKey] = item.trim()
          srvName = item.trim()
          isQuery = true;
        } else {
          obj[ObjActivityNameKey] = item.trim()
          srvName = item.trim()
          isActivity = true;
        }
        fetchableMap.set(srvName, obj)

      })
      return{'isQuery': isQuery, 'isActivity': isActivity}
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

    Vue.prototype.$MQL = {   
      setActivity(str) {
        let formattedResult = formatActivity(str)
        if(formattedResult.isQuery && formattedResult.isActivity) {
          console.error('Can not support query and activity in a single execution')
          return
        } else {
          return this
        }       
      },
      setData(activity = null, data = null) {
        if (null === activity) {
          console.error('Data cannot be null')
        } else if(null === data) {
          // common data
          for (let [key, value] of fetchableMap) {
            if (null === value[ObjActivityData]) {
              value[ObjActivityData] = activity
              fetchableMap.set(key, value )
            }
          }
        } else {
          // service specific
          let activityValue = fetchableMap.get(activity)
          activityValue[ObjActivityData] = data
              fetchableMap.set(activity, activityValue )
        }
        return this
      },
      setHeader(header = {}) {
        fetchableMap.set('Header', header )
        return this
      },
      setCustomURL(url = null) {
        fetchableMap.set('CustomURL', url )        
        return this
      },
      fetch() {
        return new Promise((resolve, reject) => {
          let activities = new String()
          let postParamObject = {}
          for (var [key, value] of fetchableMap) {
            console.log(key)
           console.log(key.search('ActivityType') < 0)
           console.log(key.search('Header') < 0)
           console.log( key.search('CustomURL') < 0)
            if (key.search('ActivityType') < 0 && key.search('Header') < 0 && key.search('CustomURL') < 0){
              activities = activities + ',' + key
              postParamObject[key] = value.Data
            }
          }
          console.log(activities.substring(1, activities.length))
         
          prepareMQLRequest(fetchableMap.get('ActivityType'), activities.substring(1, activities.length), postParamObject, fetchableMap.get('CustomURL'), fetchableMap.get('Header'))
            .then(function (response) {
              var data = deepFreeze(response.data)
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
                // "{\"result\":null,\"error\":\"ERROR_KEY\",\"reponseHeader\":null}"
                var data = {}
                data.result = null
                data.error = error.response.status
                reject(data)
              } else {
                var data = {}
                data.result = null
                data.error = error.message
                reject(data)
                // reject(error.response.data.error)
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