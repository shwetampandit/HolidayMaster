<template>
  <div>
    <div
      class="area_1"
    >
      <div class="v-bar-holder">
        <div class="content-list">
          <section class="archived-section mb-2">
            <h4 class="common-heading">
              <div class="row">
                <div class="col">
                  MarketPlace Applications
                </div>
              </div>
            </h4>
            <div class="row offset-2">
              <div class="row">
                <form>
                  <!-- <vue-dropzone
                    id="drop1"
                    :options="dropOptions"
                    @vdropzone-file-added="fileData"
                  /> -->
                  <h2>Upload File</h2>
                  Enter FileName : <input
                    id="files"
                    type="text"
                    v-model="inputFileName"
                  ><br>
                  <br>
                  <input
                    id="files"
                    @change="submitFile"
                    type="file"
                  >
                  <br>
                  <br>
                  <button
                    id="uploadtBtn"
                    @click.stop.prevent="uploadFile"
                  >
                    Upload
                  </button>
                  <button
                    id="downloadBtn"
                    @click.stop.prevent="downloadFile"
                  >
                    Download
                  </button>
                  <br>
                  <br>
                  <span v-if="uploadedFilePath!==''">
                    Uploaded FilePath is : {{ uploadedFilePath }}
                  </span>
                </form>
              </div>
            </div>
            <div class="row offset-2">
              Show Image
              <img
                width="200px"
                height="150px"
                :src="cdnBaserURl+'client2/getFile/loginIP.png'"
              >
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MQLCdn from '@/plugins/mqlCdn.js'
import Vue from 'vue'
// import vueDropzone from 'vue2-dropzone'
// import axios from 'axios'
export default {
  // components: {
  //   vueDropzone
  // },
  data () {
    return {
      dropOptions: {
        url: 'https://httpbin.org/post',
        acceptedFiles: '.jpg, .png',
        maxFilesize: 2, // MB
        maxFiles: 3,
        chunking: true,
        chunkSize: 500, // Bytes
        thumbnailWidth: 150, // px
        thumbnailHeight: 150,
        addRemoveLinks: true,
        title: 'Upload zip'
      },
      inputFileName: '',
      files: '',
      uploadedFilePath: '',
      cdnBaserURl: Vue.getCDNBaseURL()
    }
  },
  methods: {
    submitFile (event) {
      this.files = event.target.files[0]
    },
    uploadFile () {
      let formData = new FormData()
      formData.append('file', this.files) // append your file as 'file' in formdata.
      new MQLCdn()
        .setFormData(formData) // (required) sets file data
        .setFileName(this.inputFileName) // (optional field) if you want to set name to file that is being uploaded
        .setBucketId('client2') // (required) valid bucket key need to set in which file will be uploaded.
        .uploadFile('uploadtBtn').then(res => { // (required) this will upload file takes element id (optional param) which will be blocked while file upload..
          if (res.isValid()) {
            this.uploadedFilePath = res.uploadedFileURL() // returns uploaded file url..
          } else {
            res.showErrorToast()
          }
        })
    },
    downloadFile () {
      if (this.inputFileName !== '') {
        new MQLCdn()
          .setCDNPath(this.inputFileName) // (required)set a filepath whihch needs to be download.
          .downloadFile('downloadBtn').then(res => { // (required) this will take elemnt id (optional) which will be blocked while file being downloaded.
          })
      }
    }
    // fileData (file) {
    //   this.files = file
    // }
  }
}
</script>

<style>

</style>
