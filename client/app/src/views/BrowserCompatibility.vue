<template>
  <div>
    check browser compatibility
    <div v-if="getBrowser">
      current browser name is: {{ browserName }} version: {{ version }}
    </div>
    <div v-else>
      your browser is not compatible to required version current browser name is {{ browserName }} version: {{ version }}
    </div>
  </div>
</template>
<script>
import { matchesUA } from 'browserslist-useragent'
export default {
  data () {
    return {
      browserName: '',
      version: ''
    }
  },
  mounted () {
    this.get_browser_info()
  },
  computed: {
    getBrowser () {
      var browserList = process.env.VUE_APP_BROWSERSLIST.split(',')
      console.log(browserList)
      return matchesUA(navigator.userAgent, { browsers: browserList })
    }
  },
  methods: {
    get_browser_info () {
      var info = navigator.userAgent.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || []
      this.browserName = info[0]
      this.version = info[2]
    }
  }
}
</script>
