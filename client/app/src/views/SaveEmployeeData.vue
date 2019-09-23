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
            v-model="emp.employeeCode"
            class="mb-2 mr-sm-2 mb-sm-0"
            required
          />
          <b-input
            type="text"
            id="empName"
            placeholder="Employee Name"
            v-model="emp.employeeName"
            class="mb-2 mr-sm-2 mb-sm-0"
            required
          />
          <b-input
            type="number"
            id="empMarks"
            placeholder="Enter Marks"
            v-model="emp.Marks"
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
  methods: {
    saveData () {
      new MQL()
        .setActivity('o.[SaveEmployeeData]')
        .setData(this.emp)
        .fetch()
        .then(rs => {
          let res = rs.getActivity('SaveEmployeeData', true)
          if (rs.isValid('SaveEmployeeData')) {
            this.result = res.result
          } else {
            rs.showErrorToast('SaveEmployeeData')
          }
        })
    }
  }
}
</script>

<style>
</style>
