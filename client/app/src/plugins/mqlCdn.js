import axios from 'axios'
import Response from '@/plugins/response.js'
import Vue from 'vue'

class MQLCdn {
  constructor () {
    let cancel
    this.fileName = ''
    this.formData = new FormData()
    this.formData.set('enctype', 'multipart/form-data')

    this.clientID = ''
    this.bucketId = ''
    this.cdnURL = ''
    this.cdnPath = ''
    let CancelToken = axios.CancelToken
    const mqlInstance = axios.create({
      baseURL: Vue.getCDNBaseURL()
      // transformRequest: axios.defaults.transformRequest.concat(
      //   function (data, headers) {
      //     // compress strings if over 1KB
      //     if (typeof data === 'string' && data.length > 10) {
      //       headers['Content-Encoding'] = 'gzip';
      //       return pako.gzip(data);
      //     } else {
      //       // delete is slow apparently, faster to set to undefined
      //       //headers['Content-Encoding'] = undefined;
      //       return data;
      //     }
      //   }
      // )
    })
    mqlInstance.interceptors.request.use(
      function (config) {
        // console.log('config', config.url.indexOf('r/'))
        // TODO check for private bucket
        if (config.url.indexOf('r/') !== -1) {
          // Check for restricted request
          if (sessionStorage.getItem('user-token') === null) {
            cancel('Operation canceled by the MQLCDN interceptor.')
            // TODO: Uncomment below code for dispatch
            // window.app.$store.dispatch('AUTH_LOGOUT')
          }
        }
        return config
      },
      function (error) {
        return Promise.reject(error)
      }
    )

    // TODO:  set headers if any for cdn...
    const setHeaders = (cdnURL, headers = {}) => {
      headers['Authorization'] = 'Bearer ' + sessionStorage.getItem('user-token')
      return headers
    }

    this.uploadFile = (docId = null) => {
      // TODO: Set cdnURL for upload
      // this.cdnURL = Vue.getCDNBaseURL() + this.bucketId + '/uploadFile'
      this.cdnURL = this.bucketId + '/uploadFile'
      console.log('uploadFile Vue.getCDNBaseURL()', Vue.getCDNBaseURL())
      console.log('uploadFile', this.cdnURL)
      let txt = ''
      return new Promise((resolve) => {
        if (docId !== null) {
          txt = document.getElementById(docId).innerHTML
          document.getElementById(docId).disabled = true
          document.getElementById(docId).innerHTML = 'Processing'
        }
        prepareMQLCDNRequest('POST', docId, txt).then(cdnResponse => {
          resolve(cdnResponse)
        })
      })
    }

    this.downloadFile = (docId = null) => {
      if (this.cdnPath.includes('http://') || this.cdnPath.includes('https://')) {
        // if full path is  available
        this.cdnURL = this.cdnPath
      } else {
        // add cdnbase url.
        this.cdnURL = Vue.getCDNBaseURL() + this.cdnPath
      }
      console.log('downloadFile cdnURL', this.cdnURL)
      let txt = ''
      return new Promise((resolve) => {
        if (docId !== null) {
          txt = document.getElementById(docId).innerHTML
          document.getElementById(docId).disabled = true
          document.getElementById(docId).innerHTML = 'Processing'
        }
        // prepareMQLCDNRequest('GET', docId, txt).then(cdnResponse => {
        //   resolve(cdnResponse)
        // })
        let result = window.document.createElement('a')
        result.href = this.cdnURL
        result.download = this.fileName
        result.click()
        if (docId !== null) {
          document.getElementById(docId).disabled = false
          document.getElementById(docId).innerHTML = txt
        }
        resolve()
      })
    }
    this.setFileName = (fileName) => {
      this.fileName = fileName
      if (this.fileName !== '') {
        this.formData.append('fileName', this.fileName)
      }
      return this
    }
    this.setCDNPath = (cdnPath) => {
      // if (cdnPath.includes('http://')) {

      // } else {
      // }
      // this.cdnURL = Vue.getCDNBaseURL() + this.cdnPath
      this.cdnPath = cdnPath
      return this
    }
    this.setFormData = (formData) => {
      this.formData = formData
      return this
    }
    // TODO remove it if not required
    this.setClientId = (clientID) => {
      this.clientID = clientID
      this.cdnURL = 'cdnserver/' + this.clientID + '/uploadFile'
      return this
    }
    // TODO it should be setBucketKey and seperate methode for fetching bucketId
    this.setBucketId = (bucketKey) => {
      let bucketObj = Vue.getBucketIdByKey(bucketKey)
      if (bucketObj === undefined) {
        this.bucketId = undefined
      } else {
        this.bucketId = bucketObj.bucketId
      }
      console.log('setBucketId result', this.bucketId)
      return this
    }
    const prepareMQLCDNRequest = (requestType, docId, txt) => {
      return new Promise((resolve) => {
        if (this.bucketId !== undefined) {
          mqlInstance({
            url: this.cdnURL,
            method: requestType,
            headers: setHeaders(this.cdnURL),
            data: this.formData,
            cancelToken: new CancelToken(function executor (c) {
              cancel = c
            })
          })
            .then(res => {
              // if (this.showPageLoader) {
              //   window.app.$store.dispatch('app/MUTATE_PAGE_BLOCKER', false)
              // }
              if (docId !== null) {
                document.getElementById(docId).disabled = false
                document.getElementById(docId).innerHTML = txt
              }
              let obj = {}
              obj.data = {}
              // obj.data.error = 'Invalid Bucket Key...'
              obj.data.errorCode = 1000
              obj.data.result = res.data
              resolve(new Response(obj))
            })
            .catch(error => {
              console.log('fail error', error.message)
              let obj = {}
              obj.data = {}
              if (docId !== null) {
                document.getElementById(docId).disabled = false
                document.getElementById(docId).innerHTML = txt
              }
              // if (this.showPageLoader) {
              //   window.app.$store.dispatch('app/MUTATE_PAGE_BLOCKER', false)
              // }
              obj.data.error = error.message
              obj.data.errorCode = 1990
              obj.data.result = null
              resolve(new Response(obj))
            })
        } else {
          if (docId !== null) {
            document.getElementById(docId).disabled = false
            document.getElementById(docId).innerHTML = txt
          }
          let obj = {}
          obj.data = {}
          obj.data.error = 'Invalid Bucket Key...'
          obj.data.errorCode = 1990
          obj.data.result = null
          resolve(new Response(obj))
        }
      })
    }
  }
}
// TODO add pageLoader enable method
export default MQLCdn
