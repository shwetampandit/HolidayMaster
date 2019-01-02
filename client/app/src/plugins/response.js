import router from '@/router.js'
import Vue from 'vue'
class Response {
    constructor(obj_raw) {
        this.raw = obj_raw;
        this.isReactive = false;

        this.setReactivity = (isReactive) => {
            this.isReactive = isReactive;
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
        this.getRaw = function (isReactive = false) {
            return isReactive ? this.raw : this.deepFreeze(this.raw);
        };
        this.getActivity = function (str_activity, bool_isReactive = false) {
            // TODO: if calling auto set the local cache property
            return bool_isReactive ? this.raw[str_activity] : this.deepFreeze(this.raw[str_activity]);
        };
        this.Navigate = function (str_routeName = null, str_activityData = null, str_key = null) {
            router.push({ name: str_routeName, params: { [str_key]: this.getActivity(str_activityData, true) } });
        };
        this.isValid = function (str_activity = null) {
            // TODO: check global error and activity specific error
            return null != str_activity ? true : false
        };
        this.showErrorToast = function (str_activity = null) {
            // TODO: fetch error from
            if(null != str_activity) {
            // TODO: check for error and fetch error key or message in case
            }
           // Vue.toasted.error(i18n? window.app.$t(str_activity) : str_activity).goAway(3000);
            Vue.toasted.error(null != str_activity ? str_activity : 'my error').goAway(3000);           
           return this
        };
    }
}

export default Response