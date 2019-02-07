import router from "@/router.js";
import Vue from "vue";
class Response {
  constructor(obj_raw) {
    this.raw = obj_raw.data;
    this.headers = obj_raw.headers
    this.isReactive = false;

    if (this.headers !== undefined) {
      if(this.headers.authorization !== undefined ) {
         sessionStorage.setItem('user-token', this.headers.authorization)
       }
    }

    this.setReactivity = isReactive => {
      this.isReactive = isReactive;
    };
    this.deepFreeze = object => {
      // Retrieve the property names defined on object
      if (object === undefined || object === null) {
        return object
      }
      var propNames = Object.getOwnPropertyNames(object);
      // Freeze properties before freezing self
      for (let name of propNames) {
        let value = object[name];
        object[name] =
          value && typeof value === "object" ? this.deepFreeze(value) : value;
      }
      return Object.freeze(object);
    };
    this.getRaw = function (isReactive = false) {
      return isReactive ? this.raw : this.deepFreeze(this.raw);
    };
    this.getHeaders = function () {
      return this.headers
    };
    this.showElement = function (str_docId) {
      if (null != str_docId) {
        var x = document.getElementById(str_docId);
        if (x.style.display === "none") {
          x.style.display = "block";
        }
      }
    };
    this.hideElement = function (str_docId) {
      console.log(str_docId)
      if (null != str_docId) {
        var x = document.getElementById(str_docId);
        x.style.display = "none";
      }
    };
    this.getActivity = function (str_activity, bool_isReactive = false) {
      // TODO: if calling auto set the local cache property

      if (str_activity.split("_").length > 1) {
        //     alert('query')
        return bool_isReactive
          ? this.raw.FetchQueryData.result[
          str_activity.substring("query_".length, str_activity.length)
          ]
          : this.deepFreeze(
            this.raw.FetchQueryData.result[
            str_activity.substring("query_".length, str_activity.length)
            ]
          );
      } else {
        return bool_isReactive
          ? this.raw[str_activity]
          : this.deepFreeze(this.raw[str_activity]);
      }
    };
    this.Navigate = function (
      str_routeName = null,
      str_activityData = null,
      str_key = null
    ) {
      router.push({
        name: str_routeName,
        params: { [str_key]: this.getActivity(str_activityData, true) }
      });
    };

    this.isValid = function (str_activity = null) {
      // TODO: check global error and activity specific error
      if (str_activity === null) {
        // check for global errorCode
        return !!(this.raw.errorCode === 1000 || this.raw.errorCode === 0)
      } else {
        // check for specific
        if (str_activity.split('_').length > 1) {
          // console.log('1', this.raw['FetchQueryData'].errorCode)
          // query activity
          return !!(
            this.raw['FetchQueryData'].errorCode === 1000 ||
            this.raw['FetchQueryData'].errorCode === 0
          )
        } else {
          return !!(
            this.raw[str_activity].errorCode === 1000 ||
            this.raw[str_activity].errorCode === 0
          )
        }
      }
    };
    this.showErrorToast = function (str_activity = null) {
      // // TODO: fetch error from
      // if (str_activity != null) {
      //   // TODO: check for error and fetch error key or message in case
      // }
      // // Vue.toasted.error(i18n? window.app.$t(str_activity) : str_activity).goAway(3000);
      // Vue.toasted
      //   .error(str_activity != null ? str_activity : 'my error')
      //   .goAway(3000)
      // TODO: check global error and activity specific error
      if (str_activity === null) {
        // check for global errorCode
        Vue.toasted
          .error(this.raw.error)
          .goAway(3000)
      } else {
        // check for specific
        if (str_activity.split('_').length > 1) {
          // console.log('1', this.raw['FetchQueryData'].errorCode)
          // query activity
          Vue.toasted
            .error(this.raw["FetchQueryData"].error)
            .goAway(3000);

        } else {
          Vue.toasted
            .error(this.raw[str_activity].error)
            .goAway(3000);
        }
      }
      return this
    };
  }
}

export default Response;
