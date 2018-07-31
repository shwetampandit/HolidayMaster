<template>
  <div>
    <h3>Plain text encryption/decryption</h3>
    <input type="text" v-model="encryptInputText"/>
    <button @click="encryptText">Encrypt Text</button>
    <div>
      <span><strong>Encrypted text:</strong></span>
      <span>{{encryptOutputText}}</span>
    </div>
    <input type="text" v-model="decryptInputText"/>
    <button @click="decryptText">Decrypt Text</button>
    <div>
      <span><strong>Decrypted text:</strong></span>
      <span>{{decryptOutputText}}</span>
    </div>
    <span>==================================================</span>
    <h3>Object encryption/decryption</h3>
    <textarea v-model="encryptInputObject" rows="4" cols="45"></textarea>
    <div>

    <button @click="encryptObj">Encrypt Object</button>
    </div>
    <div>
      <span><strong>Encrypted Object:</strong></span>
      <span>{{encryptOutputObject}}</span>
    </div>
     <textarea v-model="decryptInputObject" rows="4" cols="45"></textarea>
     <div>
      <button @click="decryptObj">Decrypt Object</button>
     </div>
    <div>
      <span><strong>Decrypted Object:</strong></span>
      <span>{{decryptOutputObject}}</span>
    </div>
  </div>
</template>

<script>
import CryptoJS from 'crypto-js'
export default {
  data() {
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
    encryptText() {
      var op = CryptoJS.AES.encrypt(this.encryptInputText,this.key)
      this.encryptOutputText = op.toString()
    },
    decryptText() {
      var bytes  = CryptoJS.AES.decrypt(this.encryptOutputText.toString(), this.key)
      var plaintext = bytes.toString(CryptoJS.enc.Utf8)
      this.decryptOutputText = plaintext
    },
    encryptObj() {
      var ip  = this.encryptInputObject
      var op  = CryptoJS.AES.encrypt(JSON.stringify(ip), this.key)
      this.encryptOutputObject = op.toString()
    },
    decryptObj() {
      var bytes  = CryptoJS.AES.decrypt(this.encryptOutputObject.toString(), this.key);
      this.decryptOutputObject = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
    }
  }

}
</script>

<style>

</style>
