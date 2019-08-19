<template>
  <div>
    <h2>Component 1</h2>
    <h4>
      <b>{{ $t('demo.demoHeading') }}</b>
    </h4>
    <!-- <div>(Default Hindi)</div> -->
    <div>
      <b-button
        variant="primary mx-1"
        @click="changeLanguage('en')"
      >
        English
      </b-button>
      <b-button
        variant="primary mx-1"
        @click="changeLanguage('hi')"
      >
        Hindi
      </b-button>
      <b-button
        variant="primary mx-1"
        @click="changeLanguage('mr')"
      >
        Marathi
      </b-button>
    </div>
  </div>
</template>

<script>
export default {
  mounted () {
    this.$i18n.locale = 'hi'
  },
  methods: {
    changeLanguage (lang) {
      this.$i18n.locale = lang
    }
  }
}
</script>

<style>
</style>
