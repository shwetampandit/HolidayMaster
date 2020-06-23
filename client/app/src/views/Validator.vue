<template>
  <div class="validator" id="app">
    <form class="ui form" @submit.prevent="onSubmit">
      <!-- {{ errors }} -->
      <!-- <div
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
      </div> -->
      <!-- <div
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
      </div> -->
      <!-- <div
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
      </div> -->
      <!-- <div
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
      </div> -->
      <!-- <div
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
      </div> -->
      <!-- <div
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
      </button> -->
    </form>
    <div class="container">
      <div class="row justify-content-center text-left">
        <div class="col-sm-6">
          <form class="card p-4 mb-5" @submit.prevent="onSubmit">
            <h4 class="text-center mb-3">
              Validator
            </h4>
            <div class="form-group">
              <label for="name">Name</label>
              <input
                type="text"
                class="form-control"
                id="name"
                autocomplete
                name="name"
                placeholder="name"
                v-validate="'required|alpha'"
                v-model="name"
              />
              <small class="form-text text-danger" v-if="errors.has('name')">
                {{ $t(errors.first('name')) }}</small
              >
            </div>
            <div class="form-group">
              <label for="full-name">Full Name</label>
              <input
                type="text"
                class="form-control"
                autocomplete
                name="fullname"
                placeholder="fullname"
                v-validate="'required|alpha_spaces'"
                v-model="fullname"
              />
              <small
                class="form-text text-danger"
                v-if="errors.has('fullname')"
              >
                {{ $t(errors.first('fullname')) }}</small
              >
            </div>
            <div class="form-group">
              <label for="email">Email</label>
              <input
                type="email"
                class="form-control"
                autocomplete
                aria-describedby="emailHelp"
                name="email"
                placeholder="Email"
                v-validate="'required|email'"
                v-model="email"
              />
              <small
                id="emailHelp"
                class="form-text text-danger"
                v-if="errors.has('email')"
              >
                {{ $t(errors.first('email')) }}</small
              >
            </div>
            <div class="form-group" :class="{ error: errors.has('phone') }">
              <label>Phone no</label>
              <input
                type="phone"
                class="form-control"
                autocomplete
                name="phone"
                placeholder="phone"
                maxLength="10"
                minLength="10"
                v-validate="'required|numeric'"
                v-model="phone"
              />
              <small class="form-text text-danger" v-if="errors.has('phone')">
                {{ $t(errors.first('phone')) }}
              </small>
            </div>
            <div
              class="form-group"
              :class="{ error: errors.has('credit_card') }"
            >
              <label>credit card</label>
              <input
                autocomplete
                class="form-control"
                name="credit_card"
                placeholder="credit card"
                maxlength="16"
                minlength="16"
                v-validate="'required|credit_card'"
                v-model="credit_card"
              />
              <small
                class="form-text text-danger"
                v-if="errors.has('credit_card')"
              >
                {{ $t(errors.first('credit_card')) }}
              </small>
            </div>
            <div class="form-group" :class="{ error: errors.has('ip') }">
              <label>IP Address</label>
              <input
                type="ip"
                autocomplete
                class="form-control"
                name="ip"
                placeholder="ip address"
                v-validate="'required|ip'"
                v-model="ip"
              />
              <small class="form-text text-danger" v-if="errors.has('ip')">
                {{ $t(errors.first('ip')) }}
              </small>
            </div>
            <div class="form-group" :class="{ error: errors.has('state') }">
              <label>Select State</label>
              <v-select
                :options="states"
                name="state"
                v-model="state"
                v-validate="'required'"
                data-vv-validate-on="blur"
              />
              <!-- {{ state }} -->
              <small class="form-text text-danger" v-if="errors.has('state')">
                {{ $t(errors.first('state')) }}
              </small>
            </div>
            <div class="form-group text-right mb-0">
              <button type="button" class="btn btn-sm btn-outline-dark mr-2">
                Clear
              </button>
              <button
                type="submit"
                class="btn btn-sm btn-primary"
                @click="$validator.validateAll()"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import vSelect from 'vue-select'
import VeeValidate from 'vee-validate'
Vue.use(VeeValidate, { events: 'input|blur' })
import { loadLanguageAsync } from '@/setup/i18n-setup.js'

// VeeValidate.Validator.extend('abc1', {
//   getMessage: field => 'Sorry dude.',
//   validate: value => !isNaN(value)
// })
// VeeValidate.Validator.extend('required', {
//   getMessage: field => 'Sorry dude, wrong pass phrase.',
//   validate: value => value !== ''|| value !== null
// })
export default {
  components: { vSelect },
  data() {
    return {
      name: '',
      fullname: '',
      email: '',
      phone: '',
      date: '',
      credit_card: '',
      ip: '',
      states: ['Maharashtra', 'Bihar', 'Gujrat'],
      state: '',
    }
  },
  methods: {
    onSubmit() {
      this.$validator.validateAll()
      if (this.errors === null) {
        alert('ok')
      }
    },
  },
  created() {
    const customMessage = {
      custom: {
        phone: {
          numeric: 'validation.phoneNumeric',
          min: 'validation.phoneMinLength',
          required: 'validation.phoneRequired',
        },
        name: {
          required: 'validation.nameRequired',
          alpha: 'validation.nameAlpha',
        },
        email: {
          required: 'validation.emailRequired',
          email: 'validation.emailValid',
        },
        fullname: {
          required: 'validation.fullnameRequired',
          alpha_spaces: 'validation.fullnameValidate',
          alpha: 'validation.alpha',
        },
        credit_card: {
          required: 'validation.credit_cardRequired',
          min: 'validation.credit_cardMinimum',
          credit_card: 'validation.credit_cardValidate',
        },
        ip: {
          required: 'validation.ipRequired',
          ip: 'validation.ipValid',
        },
        state: {
          required: 'validation.stateRequired',
        },
      },
    }
    this.$validator.localize('en', customMessage)
  },
}
</script>
+
