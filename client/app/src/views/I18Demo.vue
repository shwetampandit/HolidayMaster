<template>
  <div>
    <h2>Parent</h2>
    <h3>
      <b><h4>i18n Pattern</h4>  {{ $t('##msg##@@Message@@') }}</b>
    </h3>
    <div>(Default English)</div>
    <strong>Change Language (I18)</strong>
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

    <component1 class="my-3" />
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
