<template>
  <div>
    <h3>MQL Request For AssetFDB Demo</h3>
    <div>
      <img
        src="http://localhost:39025/o/assetfdb/TestMixedBucketFDB2/9929b6e44da568f390d20e51032b/7619774443769907/1WCKpPJZkCGKIKGKlCHGxNDSVbT"
        alt=""
      >
    </div>
    <div class="row text-left mt-3">
      <div class="col-sm-6">
        <div class="card p-3">
          <div class="form-group">
            <h5>Upload File</h5>
            <input
              class="form-control mb-2"
              id="files"
              @change="submitFile"
              type="file"
            >
            <button
              type="button"
              class="btn btn-primary btn-sm"
              id="uploadtBtn"
              @click.stop.prevent="uploadFile()"
            >
              Upload
            </button>
            <br>
          </div>
        </div>
      </div>
      <div class="col-sm-6">
        <div class="card p-3">
          <div class="form-group">
            <input
              class="form-control mb-2"
              v-model="assetPath"
              placeholder="Asset Path"
            >
          </div>
        </div>
      </div>
    </div>
    <div class="row text-left mt-3">
      <div class="col-sm-6">
        <div class="card p-3">
          <div class="form-group">
            <h5>Update File</h5>
            <input
              class="form-control mb-2"
              v-model="recordId"
              placeholder="Paste your recordID here...."
            >
            <input
              class="form-control mb-2"
              id="files"
              @change="submitFile"
              type="file"
            >
            <button
              type="button"
              class="btn btn-primary btn-sm"
              id="uploadtBtn"
              @click.stop.prevent="updateFile(recordId)"
            >
              Upload To update
            </button>
            <br>
          </div>
        </div>
      </div>
      <div class="col-sm-6">
        <div class="card p-3">
          <div class="form-group">
            <input
              class="form-control mb-2"
              v-model="updatedAssetPath"
              placeholder="Updated Asset Path"
            >
          </div>
        </div>
      </div>
    </div>
    <div class="row text-left mt-3">
      <div class="col-sm-6">
        <button
          type="button"
          class="btn btn-primary btn-sm"
          @click.stop.prevent="downloadFile"
        >
          Download Asset
        </button>
      </div>
      <div class="col-sm-6">
        <button
          type="button"
          class="btn btn-primary btn-sm"
          @click.stop.prevent="renderFile"
        >
          Render Asset
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import MQLAssetFDB from '@/plugins/mqlAssetFDB.js'

export default {
  data () {
    return {
      assetPath: '',
      files: '',
      content: '',
      recordId: '',
      updatedAssetPath: ''
    }
  },
  methods: {
    // post request for uploading assets and in response gets path of the asset
    uploadFile () {
      let formData = new FormData()
      formData.append('file', this.files)
      new MQLAssetFDB()
        .enablePageLoader(true)
        .setIndex('o.9929b6e44da568f390d20e51032b') // ( required  ) sets index
        .setHostName('TestMixedBucketFDB2') // (required) sets host name
        .setFormData(formData) // asset data it should be in form-data format
        .setAssetData({ TestAssetBucket: 'bucket1' }) // required only when dynamic named flag is true and
        // it must be in the JSON format against the 'BucketName' of your assetFDB
        .uploadAssetFile() // calls post request to upload the asset in AssetFDB
        .then(res => {
          if (res.isValid()) {
            this.assetPath = res.getAssetPath() // returns the path where your asset is stored
          } else {
            res.showErrorToast()
          }
        })
    },
    // customURL example for AssetFDB
    // uploadFile2 () {
    //   let formData = new FormData()
    //   formData.append('file', this.files)
    //   new MQLAssetFDB()
    //     .setCustomURL('http://localhost:8080/api/')
    //     .setIndex('o.53cebf23fa5c115e63c530488972')
    //     .setHostName('PageRepo')
    //     .setFormData(formData)
    //     // .setAssetData({ 'demoBucket': 'Akash Desale' })
    //     .uploadAssetFile()
    //     .then(res => {
    //       if (res.isValid()) {
    //         this.assetPath = res.getAssetPath()
    //       } else {
    //         res.showErrorToast()
    //       }
    //     })
    // },
    submitFile (event) {
      this.files = event.target.files[0]
      console.log(this.files, event.target.files[0])
    },
    updateFile (recordId) {
      let formData = new FormData()
      formData.append('file', this.files)
      new MQLAssetFDB()
        .setIndex('o.9929b6e44da568f390d20e51032b') // ( required  ) sets index
        .setHostName('TestMixedBucketFDB2') // (required) sets host name
        .setFormData(formData) // asset data it should be in form-data format
        .setUpdateWithRecordId(recordId) // (required) recordId of the asset that to be updated
        .setAssetData({ TestAssetBucket: 'bucket1' }) // required only when dynamic named flag is true and
        // it must be in the JSON format against the 'BucketName' of your assetFDB
        .uploadAssetFile() // calls the post request to update the asset in AssetFDB
        .then(res => {
          if (res.isValid()) {
            this.updatedAssetPath = res.getAssetPath() // returns the path where your asset is stored
          } else {
            res.showErrorToast()
          }
        })
    },
    downloadFile () {
      new MQLAssetFDB().download(this.updatedAssetPath || this.assetPath)
    },
    renderFile () {
      new MQLAssetFDB().render(this.updatedAssetPath || this.assetPath)
    }
  }
}
</script>

<style></style>
