<template>
  <div class="about">
    <h1 id="headId">
      This is an about page {{ result }}
    </h1>
    <b-button
      variant="primary mr-2"
      @click="show"
    >
      Show
    </b-button>
    <b-button
      variant="info"
      @click="hide"
    >
      Hide
    </b-button>
  </div>
</template>
<script>
import Response from '@/plugins/response.js'

export default {
  metaInfo: {
    title: 'About',
    meta: [
      {
        vmid: 'description',
        name: 'description',
        content: 'An About title!'
      }
    ]
  },
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
