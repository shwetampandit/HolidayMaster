<template>
  <div class="about">
    <h1 id="headId">
      This is an about page {{ result }}
    </h1>
    <button @click="show">
      Show
    </button>
    <button @click="hide">
      Hide
    </button>
  </div>
</template>
<script>
import Response from '@/plugins/response.js';

export default {

  data () {
    return {
      result: this.$route.params.pId
    }
  },
  methods: {
    show () {
      alert('show')
      let rs = new Response()
      rs.showElement('headerId')
    },
    hide () {
      alert('hide')
      let rs = new Response()

      rs.hideElement('headerId')

    }
  }
}
</script>