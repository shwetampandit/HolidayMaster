<template>
  <div>
    <form @submit.prevent="saveData">
      <input
        type="text"
        id="loginId"
        placeholder="loginId"
        v-model="loginId"
        required
      >
      <input
        type="text"
        id="password"
        placeholder="password"
        v-model="password"
        required
      >
      <input
        type="file"
        id="file"
        name="file"
        placeholder="file"
      >
      <button type="submit">
        Submit
      </button>
    </form>
    <div v-text="result" />
  </div>
</template>

<script>
export default {
  data () {
    return {
      loginId: '',
      password: '',
      file: null,
      result: ''
    }
  },
  mounted () {
    let self = this
    document.getElementById('file').addEventListener(
      'change',
      function (evt) {
        var files = evt.target.files
        self.file = files[0]
      },
      false
    )
  },
  methods: {
    saveData () {
      const form = new FormData()
      form.set('enctype', 'multipart/form-data')
      form.append('file', this.file, this.file.name)
      form.append('loginId', this.loginId)
      form.append('password', this.password)
      this.$MQLFetch('services.O_REGISTERUSERSERVICE', form)
        .then(res => {
          this.result = res
        })
        .catch(error => {
          alert(error.response.data.error)
        })
    }
  }
}
</script>

<style>
</style>
