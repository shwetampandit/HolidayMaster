<template>
  <div>
    <h2>Parent</h2>
    <h3>
      <b>{{ $t('demo.demoHeading') }}</b>
    </h3>
    <div>(Default English)</div>
    <strong>Change Language (I18)</strong>
    <div>
      <button @click="changeLanguage('en')">
        English
      </button>
      <button @click="changeLanguage('hi')">
        Hindi
      </button>
      <button @click="changeLanguage('mr')">
        Marathi
      </button>
    </div>

    <component1 />
    <component2 />
  </div>
</template>

<script>
import component1 from '@/components/i18Demo/Component1'
import component2 from '@/components/i18Demo/Component2'
import { loadLanguageAsync } from '@/setup/i18n-setup.js'
export default {
  components: { component1, component2 },
  methods: {
    changeLanguage (lang) {
      this.$i18n.locale = lang
      this.$i18n.fallbackLocale = lang
      loadLanguageAsync(lang)
    }
  }
}
</script>

<style>
</style>
