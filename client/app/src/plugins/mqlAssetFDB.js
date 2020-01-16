import axios from 'axios'
import Response from '@/plugins/response.js'
import Vue from 'vue'

class mqlAssetFDB {
  constructor (indexId = null) {
    let cancel
    let isDevelopment = process.env.NODE_ENV !== 'production'
    let CancelToken = axios.CancelToken
    this.assetData = new FormData()
    this.route = 'assetfdb'
    this.hostName = ''
    this.fileName = ''
    this.indexType = 'o'
    this.indexId = indexId
    this.recordId = ''
    const IndexSplitter = '.'
    this.customURL = ''

    const mqlInstance = axios.create({
      baseURL: Vue.getBaseURL()
    })

    mqlInstance.interceptors.request.use(
      function (config) {
        if (config.url.indexOf('r/') !== -1) {
          if (sessionStorage.getItem('user-token') === null) {
            cancel('Operation canceled by the MQL interceptor.')
          }
        }
        return config
      },
      function (error) {
        return Promise.reject(error)
      }
    )

    const setHeaders = (headers = {}) => {
      headers['Authorization'] = 'Bearer ' + sessionStorage.getItem('user-token')
      headers['Content-Type'] = 'multipart/form-data'
      return headers
    }

    this.formatIndex = function (indexIdStr) {
      this.indexType = indexIdStr.split(IndexSplitter)[0]
      this.indexId = indexIdStr.split(IndexSplitter)[1]
    }

    this.generateURL = (assetPath) => {
      if (this.customURL) {
        if (assetPath) {
          return (
            this.customURL + '/' +
            this.indexType + '/' +
            this.route + '/' +
            assetPath
          )
        } else {
          if (this.recordId) {
            return (
              this.customURL +
              '/' +
                      this.indexType + '/' +
                      this.route + '/' +
                      this.hostName + '/' +
                      this.indexId + '/' +
                      this.recordId
            )
          } else {
            return (
              this.customURL +
              '/' +
                      this.indexType + '/' +
                      this.route + '/' +
                      this.hostName + '/' +
                      this.indexId
            )
          }
        }
      } else {
        if (assetPath) {
          return (
            '/' +
            this.indexType + '/' +
            this.route + '/' +
            assetPath
          )
        } else {
          if (this.recordId) {
            return (
              '/' +
                      this.indexType + '/' +
                      this.route + '/' +
                      this.hostName + '/' +
                      this.indexId + '/' +
                      this.recordId
            )
          } else {
            return (
              '/' +
                    this.indexType + '/' +
                    this.route + '/' +
                    this.hostName + '/' +
                    this.indexId
            )
          }
        }
      }
    }

    this.setIndex = function (indexId) {
      this.formatIndex(indexId)
      return this
    }

    this.setHostName = function (hostName) {
      this.hostName = hostName
      return this
    }
    this.setFormData = (formData) => {
      this.fileName = formData.get('file').name
      this.assetData.append('asset', formData.get('file'))
      return this
    }

    this.setCustomURL = (customURL) => {
      this.customURL = customURL
      return this
    }

    this.setAssetData = function (assetData) {
      assetData = JSON.stringify(assetData)
      this.assetData.set('data', assetData)
      return this
    }

    this.enablePageLoader = function (boolShowPageLoader = false) {
      this.showPageLoader = boolShowPageLoader
      return this
    }

    this.setUpdateWithRecordId = function (recordId) {
      this.recordId = recordId
      return this
    }

    this.uploadAssetFile = (docId = null) => {
      let txt = ''
      if (this.showPageLoader) {
        window.app.$store.dispatch('app/MUTATE_PAGE_BLOCKER', true)
      }
      return new Promise((resolve) => {
        if (docId !== null && document.getElementById(docId) !== null) {
          txt = document.getElementById(docId).innerHTML
          document.getElementById(docId).disabled = true
          document.getElementById(docId).innerHTML = 'Processing'
        }
        if (this.indexId) {
          mqlInstance({
            url: this.generateURL(''),
            method: 'POST',
            headers: setHeaders(),
            data: this.assetData,
            cancelToken: new CancelToken(function executor (c) {
              cancel = c
            })
          })
            .then(res => {
              if (this.showPageLoader) {
                window.app.$store.dispatch('app/MUTATE_PAGE_BLOCKER', false)
              }
              if (docId !== null && document.getElementById(docId) !== null) {
                document.getElementById(docId).disabled = false
                document.getElementById(docId).innerHTML = txt
              }
              let obj = {}
              obj.data = {}
              obj.data.errorCode = 1000
              obj.data.result = res.data
              resolve(new Response(obj))
            })
            .catch(error => {
              let obj = {}
              obj.data = {}
              if (docId !== null && document.getElementById(docId) !== null) {
                document.getElementById(docId).disabled = false
                document.getElementById(docId).innerHTML = txt
              }
              if (this.showPageLoader) {
                window.app.$store.dispatch('app/MUTATE_PAGE_BLOCKER', false)
              }
              obj.data.error = error.message
              obj.data.errorCode = 1990
              obj.data.result = null
              resolve(new Response(obj))
            })
        } else {
          if (docId !== null && document.getElementById(docId) !== null) {
            document.getElementById(docId).disabled = false
            document.getElementById(docId).innerHTML = txt
          }
          let obj = {}
          obj.data = {}
          obj.data.error = 'Data Not Found' + this.assetData
          obj.data.errorCode = 1990
          obj.data.result = null
          resolve(new Response(obj))
        }
      }).catch(error => {
        // Handling development related errors
        if (isDevelopment) {
          alert(error)
        }
      })
    }

    /* this.getAsset = (assetPath, docId = null) => {
      let txt = ''
      if (this.showPageLoader) {
        window.app.$store.dispatch('app/MUTATE_PAGE_BLOCKER', true)
      }
      return new Promise((resolve) => {
        if (docId !== null && document.getElementById(docId) !== null) {
          txt = document.getElementById(docId).innerHTML
          document.getElementById(docId).disabled = true
          document.getElementById(docId).innerHTML = 'Processing'
        }
        if (assetPath) {
          mqlInstance({
            url: this.generateURL(assetPath),
            method: 'GET',
            headers: setHeaders(),
            cancelToken: new CancelToken(function executor (c) {
              cancel = c
            })
          })
            .then(res => {
              if (this.showPageLoader) {
                window.app.$store.dispatch('app/MUTATE_PAGE_BLOCKER', false)
              }
              if (docId !== null && document.getElementById(docId) !== null) {
                document.getElementById(docId).disabled = false
                document.getElementById(docId).innerHTML = txt
              }
              // console.log('res', res, JSON.parse(res.headers.requireddata).contentType)
              // if (res.headers.requireddata && JSON.parse(res.headers.requireddata).fileName) {
              //   this.fileName = JSON.parse(res.headers.requireddata).fileName
              //   const url = window.URL.createObjectURL(new Blob([res.data], { 'type': JSON.parse(res.headers.requireddata).contentType }))
              //   var a = document.createElement('a')
              //   a.href = url
              //   a.download = this.fileName
              //   a.target = '_blank'
              //   a.click()
              let obj = {}
              obj.data = {}

              obj.data.errorCode = 1000
              obj.data.result = res.data
              resolve(new Response(obj))
              // } else {
              //   alert('File Not Found')
              // }
            })
            .catch(error => {
              let obj = {}
              obj.data = {}
              if (docId !== null && document.getElementById(docId) !== null) {
                document.getElementById(docId).disabled = false
                document.getElementById(docId).innerHTML = txt
              }
              if (this.showPageLoader) {
                window.app.$store.dispatch('app/MUTATE_PAGE_BLOCKER', false)
              }
              obj.data.error = error.message
              obj.data.errorCode = 1990
              obj.data.result = null
              resolve(new Response(obj))
            })
        } else {
          if (docId !== null && document.getElementById(docId) !== null) {
            document.getElementById(docId).disabled = false
            document.getElementById(docId).innerHTML = txt
          }
          let obj = {}
          obj.data = {}
          obj.data.error = 'No Data Found' + this.assetData
          obj.data.errorCode = 1990
          obj.data.result = null
          resolve(new Response(obj))
        }
      }).catch(error => {
        // Handling development related errors
        if (isDevelopment) {
          alert(error)
        }
      })
    } */
  }
}

export default mqlAssetFDB
