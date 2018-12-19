export default {
  install: (Vue) => {
    let m
    let n;
    let activityType;
    let activityArray = [] ;
    let fetchableMap = new Map();
    const QueryActivity = 'QueryFetch'
    const QuerySeperator = 'query_'
    const ActivitySplitter = '.['
    const help = (str) => {
      return 'help-' + str
    }
    const formatActivity = (activity_str) => {
      activityType = activity_str.split(ActivitySplitter)[0]
      activityArray = ((activity_str.split(ActivitySplitter)[1]).substring(0, (activity_str.split(ActivitySplitter)[1]).length - 1)).split(',')
      console.log(activityType, activityArray)
      activityArray.map(item => {
        if(item.search(QuerySeperator) > 0) {
          fetchableMap.set(QueryActivity, {'ActivityName': item})
        } else {
          fetchableMap.set(item, {'ActivityName': item})
        }
      })
      console.log(fetchableMap)
    }
    Vue.prototype.$MQL = {  
      testFormatActivity(str) {
        formatActivity(str)
      } ,  
      setActivity(str) {
        m = str
        return this
      },
      setData(str) {
        n = str
        return this
      },
      fetch(str) {
        return new Promise((resolve, reject) => {
         let d = str + m + n + help(str)
         setTimeout(function(){ resolve(d) }, 3000);
        });
      }
    };
  }
};