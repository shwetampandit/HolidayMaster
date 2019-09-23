<template>
  <b-container class="bv-example-row bv-example-row-flex-cols">
    <b-row class="justify-content-center">
      <b-col>
        <b-form
          inline
          @submit.prevent="saveData"
          class="justify-content-center"
        >
          <b-input
            type="text"
            id="empCode"
            placeholder="Employee Code"
            v-model="emp.empCode"
            class="mb-2 mr-sm-2 mb-sm-0"
            required
          />
          <b-input
            type="text"
            id="employeeName"
            placeholder="Employee Name"
            v-model="emp.employeeName"
            class="mb-2 mr-sm-2 mb-sm-0"
            required
          />
          <b-input
            type="number"
            id="marks"
            placeholder="Employee Marks"
            v-model="emp.marks"
            class="mb-2 mr-sm-2 mb-sm-0"
            required
          />
          <b-button
            variant="primary"
            type="submit"
          >
            Submit
          </b-button>
        </b-form>
        <div v-text="result" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import MQL from '@/plugins/mql.js'
export default {
  data () {
    return {
      emp: {},
      result: ''
    }
  },
  mounted () {
  },
  methods: {
    saveData () {
      new MQL()
        .setActivity('o.[SaveEmployeeMarks]')
        .setData(this.emp)
        .fetch()
        .then(rs => {
          let res = rs.getActivity('SaveEmployeeMarks', false)
          if (rs.isValid('SaveEmployeeMarks')) {
            this.result = res.result
            this.emp = {}
          } else {
            rs.showErrorToast('SaveEmployeeMarks')
            this.result = 'Sorry folks unable to save'
            this.emp = {}
          }
        })
    }
  }
}
</script>

<style>
</style>
