<template>
  <div class="vueMeta">
    <h1>This is an Vue-Meta example page </h1>
    <h1>
      {{ response.title }}
    </h1>
    <h2>
      {{ response.description }}
    </h2>
  </div>
</template>
<script>
import MQL from '@/plugins/mql.js'
export default {
  name: 'Data',
  metaInfo () {
    return {
      title: this.response.title,
      meta: [
        {
          vmid: 'description',
          name: 'description',
          content: this.response.description
        }
      ]
    }
  },
  data () {
    return {
      description: 'I am Data',
      result: this.$route.params.title,
      response: ''
    }
  },
  mounted () {
    // sample activity present in playground project
    if (this.result) {
      let data = {
        title: this.result
      }
      new MQL()
        .setActivity('o.[GetEventTitle]')
        .setData(data)
        .fetch()
        .then(rs => {
          let res = rs.getActivity('GetEventTitle', true)
          if (rs.isValid('GetEventTitle')) {
            this.response = res.result
          } else {
            rs.showErrorToast('GetEventTitle')
          }
        })
    }
  }
}
</script>
