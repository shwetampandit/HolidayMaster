import axios from 'axios'
import Vue from 'vue'
import Response from '@/plugins/response.js'

class MQL {
  constructor(str_activities = null) {
    let cancel, CancelToken = axios.CancelToken;
    this.str_activities = str_activities;
    this.isQuery = false;
    this.isActivity = false;
    this.fetchableMap = new Map();
    this.version = Vue.getVersion();
    this.region = Vue.getRegion();
    this.appCode = Vue.getAppCode();
    this.activityType = 'o';
    this.isConfirm = false;
    const QueryActivityKey = 'QueryFetch', QuerySeperator = 'query_', ActivitySplitter = '.[', ObjActivityNameKey = 'ActivityName', ObjActivityData = 'Data';
    const mqlInstance = axios.create({
      baseURL: Vue.getBaseURL()
    });
    mqlInstance.interceptors.request.use(function (config) {
      if (config.url.indexOf('r/') !== -1) { // Check for restricted request
        if (sessionStorage.getItem('user-token') === null) {
          cancel("Operation canceled by the MQL interceptor.");
          //TODO: Uncomment below code for dispatch
          // window.app.$store.dispatch('AUTH_LOGOUT')
        }
      }
      return config;
    }, function (error) {
      return Promise.reject(error);
    });
    mqlInstance.interceptors.response.use(function (config) {
      if (config.url.indexOf('r/') !== -1) { // Check for restricted request
        if (sessionStorage.getItem('user-token') === null) {
          cancel("Operation canceled by the MQL interceptor.");
          //TODO: Uncomment below code for dispatch
          // window.app.$store.dispatch('AUTH_LOGOUT')
        }
      }
      return config;
    }, function (error) {
      return Promise.reject(error);
    });
    this.formatActivity = function (activity_str) {
      let activityArray = [];
      this.activityType = activity_str.split(ActivitySplitter)[0];
      this.fetchableMap.set('ActivityType', this.activityType);
      activityArray = ((activity_str.split(ActivitySplitter)[1]).substring(0, (activity_str.split(ActivitySplitter)[1]).length - 1)).split(',');
      activityArray.map(item => {
        let obj = {}, srvName;
        obj[ObjActivityData] = null;
        if (item.match(/query_/) !== null && item.match(/query_/).length > 0) {
          obj[item] = item.trim();
          srvName = item.trim();
          this.isQuery = true;
        }
        else {
          obj[ObjActivityNameKey] = item.trim();
          srvName = item.trim();
          this.isActivity = true;
        }
        this.fetchableMap.set(srvName, obj);
      });
    };
    this.deepFreeze = (object) => {
      // Retrieve the property names defined on object
      var propNames = Object.getOwnPropertyNames(object);
      // Freeze properties before freezing self
      for (let name of propNames) {
        let value = object[name];
        object[name] = value && typeof value === 'object'
          ? this.deepFreeze(value) : value;
      }
      return Object.freeze(object);
    };
    this.generateURL = (activityType, customURL) => {
      if (customURL != null && customURL !== undefined) {
        return customURL + this.getVersion() + this.getRegion() + this.getAppCode() + this.getServiceURL(activityType);
      }
      else {
        return this.getVersion() + this.getRegion() + this.getAppCode() + this.getServiceURL(activityType);
      }
    };
    this.getServiceURL = (activityType) => {
      return (activityType.toLowerCase() === 'c'
        ? 'r/' + activityType.toLowerCase() + '/'
        : activityType.toLowerCase() + '/')
        +
        'mql';
    };
    this.generateHeaders = (activityType, activities, headers = {}, isQuery = false) => {
      headers['Service-Header'] = isQuery ? QueryActivityKey : activities;
      if (activityType !== 'o') {
        headers['Authorization'] = 'Bearer ' + sessionStorage.getItem('user-token');
      }
      return headers;
    };
    this.getVersion = function () {
      return this.version != null || this.version != undefined ? this.version + '/' : '';
    };
    this.getRegion = function () {
      return null != this.region || undefined != this.region ? this.region + '/' : '';
    };
    this.getAppCode = function () {
      return this.appCode != null || this.appCode != undefined ? this.appCode + '/' : '';
    };
    /* Setter methods */
    this.setActivity = function (str_activities = null) {
      this.str_activities = str_activities;
      this.formatActivity(this.str_activities);
      return this;
    };
    this.setData = function (str_activity = null, str_data_obj = null) {
      if (null === str_activity) {
        console.error('Data cannot be null');
      }
      else if (null === str_data_obj) {
        // common data
        for (let [key, value] of this.fetchableMap) {
          if (null === value[ObjActivityData]) {
            value[ObjActivityData] = str_activity;
            this.fetchableMap.set(key, value);
          }
        }
      }
      else {
        // service specific
        let activityValue = this.fetchableMap.get(str_activity);
        activityValue[ObjActivityData] = str_data_obj;
        this.fetchableMap.set(str_activity, activityValue);
      }
      return this;
    };
    this.setHeader = function (obj_header = {}) {
      this.fetchableMap.set('Header', obj_header);
      return this;
    };
    this.setCustomURL = function (str_customURL = null) {
      this.fetchableMap.set('CustomURL', str_customURL);
      return this;
    };
    this.showConfirmDialog = function (bool_confirmation = false) {
      this.isConfirm = bool_confirmation;
      return this;
    };
    this.fetch = function (docId = null) {
      return new Promise((resolve, reject) => {
        let self = this;
        if (this.isConfirm) {
          Vue.dialog
            .confirm('Please confirm to continue')
            .then(function (dialog) {
              let rs = self.run(docId, self.isQuery, self.isActivity, self.fetchableMap, self.activityType);
              resolve(rs);
            })
            .catch(function () {
              // TODO: create result format
              reject('cancel by user');
            });
        }
        else {
          let rs = self.run(docId, self.isQuery, self.isActivity, self.fetchableMap, self.activityType);
          resolve(rs);
        }
      });
    };
    this.run = function (docId = null, isQuery = false, isActivity = false, fetchableMap = null, activityType = 'o') {
      return new Promise((resolve, reject) => {
        let txt = document.getElementById(docId).innerHTML;
        let postParamObject = {};
        let activities = new String();
        document.getElementById(docId).disabled = true;
        document.getElementById(docId).innerHTML = 'Processing';
        if (isQuery && isActivity) {
          console.error('Can not support query and activity in a single execution');
          //TODO: check for return working
          return;
        }
        else {
          fetchableMap.set('isQuery', isQuery);
        }
        for (var [key, value] of fetchableMap) {
          if (key.search('ActivityType') < 0 && key.search('Header') < 0 && key.search('CustomURL') < 0 && key.search('isQuery') < 0) {
            activities = activities + ',' + key;
            postParamObject[key.match(/query_/) !== null && key.match(/query_/).length > 0 ? key.substring('query_'.length, key.length) : key] = value.Data;
          }
        }
        mqlInstance({
          url: this.generateURL(activityType, fetchableMap.get('CustomURL')),
          method: 'Post',
          headers: this.generateHeaders(activityType, activities.substring(1, activities.length), fetchableMap.get('Header'), isQuery),
          data: postParamObject,
          cancelToken: new CancelToken(function executor(c) {
            cancel = c;
          })
        }).then(res => {
          // TODO: Handel res and remove obj code
          let obj = {};
          for (var [key, value] of fetchableMap) {
            obj[key] = value;
          }
          // TODO: remove setTimeout: it is for testing
          setTimeout(function () {
            document.getElementById(docId).disabled = false;
            document.getElementById(docId).innerHTML = txt;
          }, 3000);
          // TODO: return handeled response
          resolve(new Response(obj));
        }).catch(error => {
          // TODO: Handel res and remove obj code
          let obj = {};
          for (var [key, value] of fetchableMap) {
            obj[key] = value;
          }
          // TODO: remove setTimeout: it is for testing
          setTimeout(function () {
            document.getElementById(docId).disabled = false;
            document.getElementById(docId).innerHTML = txt;
          }, 3000);
          // TODO: return handeled response
          resolve(new Response(obj));
        });
      });
    };
  }
}

export default MQL