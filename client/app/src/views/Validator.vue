
<template>
  <div
    class="validator"
    id="app"
  >
    <form
      class="ui form"
      @submit.prevent="onSubmit"
    >
      {{ errors }}
      <div
        class="field"
        :class="{error: errors.has('name')}"
      >
        <label>Name</label>
        <input
          type="fullname"
          autocomplete
          name="name"
          placeholder="name"
          v-validate="'required|alpha'"
          v-model="name"
        >
        <span
          class="error"
          v-if="errors.has('name')"
        >
          {{ $t(errors.first('name')) }}
        </span>
      </div>
      <div
        class="field"
        autocomplete
        :class="{error: errors.has('name')}"
      >
        <label>Full Name</label>
        <input
          type="fullname"
          autocomplete
          name="fullname"
          placeholder="fullname"
          v-validate="'required|alpha_spaces'"
          v-model="fullname"
        >
        <span
          class="error"
          v-if="errors.has('fullname')"
        >
          {{ $t(errors.first('fullname')) }}
        </span>
      </div>
      <div
        class="field"
        :class="{error: errors.has('email')}"
      >
        <label>Email</label>
        <input
          type="email"
          autocomplete
          name="email"
          placeholder="Email"
          v-validate="'required|email'"
          v-model="email"
        >
        <span
          class="error"
          v-if="errors.has('email')"
        >
          {{ $t(errors.first('email')) }}
        </span>
      </div>
      <div
        class="field"
        :class="{error: errors.has('phone')}"
      >
        <label>phone no</label>
        <input
          type="phone"
          autocomplete
          name="phone"
          placeholder="phone"
          maxLength="10"
          minLength="10"
          v-validate="'required|numeric'"
          v-model="phone"
        >
        <span
          class="error"
          v-if="errors.has('phone')"
        >
          {{ $t(errors.first('phone')) }}
        </span>
      </div>
      <div
        class="field"
        :class="{error: errors.has('credit_card')}"
      >
        <label>credit card</label>
        <input
          type="credit_card"
          autocomplete
          name="credit_card"
          placeholder="credit_card"
          maxLength="10"
          minLength="10"
          v-validate="'required|credit_card'"
          v-model="credit_card"
        >
        <span
          class="error"
          v-if="errors.has('credit_card')"
        >
          {{ $t(errors.first('credit_card')) }}
        </span>
      </div>
      <div
        class="field"
        :class="{error: errors.has('ip')}"
      >
        <label>IP Address</label>
        <input
          type="credit_card"
          autocomplete
          name="ip"
          placeholder="ip address"
          v-validate="'ip'"
          v-model="ip"
        >
        <span
          class="error"
          v-if="errors.has('ip')"
        >
          {{ $t(errors.first('ip')) }}
        </span>
      </div>
      <button
        type="submit"
        class="ui submit button"
        @click="$validator.validateAll()"
      >
        Submit
      </button>
    </form>
  </div>
</template>

<script>
import Vue from 'vue'
import VeeValidate from 'vee-validate'
Vue.use(VeeValidate)
// VeeValidate.Validator.extend('abc1', {
//   getMessage: field => 'Sorry dude.',
//   validate: value => !isNaN(value)
// })
// VeeValidate.Validator.extend('required', {
//   getMessage: field => 'Sorry dude, wrong pass phrase.',
//   validate: value => value !== ''|| value !== null
// })
export default {
  data () {
    return {
      name: '',
      fullname: '',
      email: '',
      phone: '',
      date: '',
      credit_card: '',
      ip: ''
    }
  },
  methods: {
    onSubmit () {
      this.$validator.validateAll()
      if (this.errors === null) {
        alert('ok')
      }
    }
  },
  created () {
    const customMessage = {
      custom: {
        'phone': {
          numeric: 'validation.phoneNumeric',
          min: 'validation.phoneMinLength',
          required: 'validation.phoneRequired'
        },
        'name': {
          required: 'validation.nameRequired',
          alpha: 'validation.nameAlpha'
        },
        'email': {
          required: 'validation.emailRequired',
          email: 'validation.emailValid'
        },
        'fullname': {
          required: 'validation.fullnameRequired',
          alpha_spaces: 'validation.fullnameValidate',
          alpha: 'validation.alpha'
        },
        'credit_card': {
          required: 'validation.credit_cardRequired',
          credit_card: 'validation.credit_cardValidate'
        },
        'ip': {
          ip: 'validation.ipValid'
        }
      }
    }
    this.$validator.localize('en', customMessage)
  }
}
</script>
