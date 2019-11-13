<template>
  <section id="masterAxios">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-4 offset-md-4">
          <div class="login-card">
            <!-- {{ user }} -->
            <button
              id="a11"
              @click="GetAllPosts"
              class="btn btn-info px-4"
            >
              MQL Request
            </button>
            <!--  {{ result }} -->
          </div>
          <div
            class="modal fade bd-example-modal-xl"
            tabindex="-1"
            role="dialog"
            aria-labelledby="myExtraLargeModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog modal-xl">
              <div class="modal-content">
                ...
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import MQL from '@/plugins/mql.js'
export default {
  data () {
    return {
      result: null
    }
  },
  methods: {

    GetAllPosts () {
      // Vue.setPageLoader(true)
      // this.$store.dispatch('app/MUTATE_PAGE_BLOCKER', true)
      new MQL()
        // .setActivity('o.[query_1QPikbRCETCu32Dj13qzRKNBraC, HelloActivity]')
        .setActivity('o.[query_1QPikbRCETCu32Dj13qzRKNBraC]')
      // .setLoginActivity()
        .setData({
          fetchId: '1QPikbRCETCu32Dj13qzRKNBraC'
        })
        .setHeader({ 'my-header': 'It is Ok' })
      // .setCustomURL('http://127.0.0.1:9090/server2/')
        .enablePageLoader(true)
        .showConfirmDialog(true)
        .fetch('a11').then(res => {
          console.log(res)
          // let r = res.getRaw(true)
          console.log(res.isValid())

          // let p = res.getActivity('query_vijay')

          // res.isValid('a') ? res.Navigate('about', 'query_vijay', 'pId') : res.Navigate('home', 'query_vijay', 'pId')
        })
    }
  }
}
</script>

<style lang="scss">
#login {
  .login-card {
    box-shadow: 0 0 10px #ccc;
    padding: 30px;
  }
}
</style>
