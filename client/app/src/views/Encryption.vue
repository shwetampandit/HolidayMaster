<template>
  <div class="container">
    <div class="card p-3">
      <h3>Plain text encryption/decryption</h3>
      <hr>
      <div class="row text-left">
        <div class="col-sm-6">
          <div
            class="form-group"
          >
            <label>Enter text for encrypt</label>
            <input
              type="text"
              class="form-control mb-2"
              v-model="encryptInputText"
            >
            <button
              class="btn btn-primary"
              @click="encryptText"
            >
              Encrypt Text
            </button>
          </div>
        </div>
        <div class="col-sm-6">
          <p class="mb-2">
            <strong>Encrypted text:</strong>
          </p>
          <span>{{ encryptOutputText }}</span>
        </div>
        <div class="col-sm-6 mt-4">
          <div
            class="form-group"
          >
            <label>Enter text for decrypt</label>
            <input
              type="text"
              class="form-control mb-2"
              v-model="decryptInputText"
            >
            <button
              class="btn btn-primary"
              @click="decryptText"
            >
              Decrypt Text
            </button>
          </div>
        </div>
        <div class="col-md-6 mt-4">
          <p class="mb-2">
            <strong>Decrypted text:</strong>
          </p>
          <span>{{ decryptOutputText }}</span>
        </div>
      </div>
    </div>
    <div class="card p-3 my-4 ">
      <h3>Object encryption/decryption</h3>
      <hr>
      <div class="row text-left">
        <div class="col-sm-6">
          <div
            class="form-group"
          >
            <label>Enter text for encrypt</label>
            <textarea
              v-model="encryptInputObject"
              rows="4"
              class="form-control mb-2"
            />

            <button
              class="btn btn-primary"
              @click="encryptObj"
            >
              Encrypt Object
            </button>
          </div>
        </div>
        <div class="col-sm-6">
          <p class="mb-2">
            <strong>Encrypted Object:</strong>
          </p>
          <span>{{ encryptOutputObject }}</span>
        </div>
        <div class="col-sm-6 mt-3">
          <textarea
            v-model="decryptInputObject"
            rows="4"
            class="form-control mb-2"
          />

          <button
            class="btn btn-primary"
            @click="decryptObj"
          >
            Decrypt Object
          </button>
        </div>
        <div class="col-sm-6 mt-3">
          <p class="mb-2">
            <strong>Decrypted Object:</strong>
          </p>
          <span>{{ decryptOutputObject }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CryptoJS from 'crypto-js'
export default {
  data () {
    return {
      encryptInputText: '',
      encryptOutputText: '',
      decryptInputText: '',
      decryptOutputText: '',
      encryptInputObject: '',
      encryptOutputObject: '',
      decryptInputObject: '',
      decryptOutputObject: '',
      key: 'SECRETKEY'

    }
  },
  methods: {
    encryptText () {
      var op = CryptoJS.AES.encrypt(this.encryptInputText, this.key)
      this.encryptOutputText = op.toString()
    },
    decryptText () {
      var bytes = CryptoJS.AES.decrypt(this.encryptOutputText.toString(), this.key)
      var plaintext = bytes.toString(CryptoJS.enc.Utf8)
      this.decryptOutputText = plaintext
    },
    encryptObj () {
      var ip = this.encryptInputObject
      var op = CryptoJS.AES.encrypt(JSON.stringify(ip), this.key)
      this.encryptOutputObject = op.toString()
    },
    decryptObj () {
      var bytes = CryptoJS.AES.decrypt(this.encryptOutputObject.toString(), this.key)
      this.decryptOutputObject = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
    }
  }

}
</script>

<style>
</style>
