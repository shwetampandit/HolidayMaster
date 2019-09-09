<template>
  <div>
    <div>
      <h1><u>{{ msg }}</u></h1>
    </div>
    <b-table
      :striped="striped"
      :bordered="bordered"
      :borderless="borderless"
      :outlined="outlined"
      :small="small"
      :hover="hover"
      :dark="dark"
      :fixed="fixed"
      :foot-clone="footClone"
      :responsive="responsive"
      :table-variant="tableVariant"
      :id="idTable"
      :items="itemList"
      :fields="fields"
    />
    <div>
      <p>
        <u>This is a table component example</u>
      </p>
      <hr>
    </div>
  </div>
</template>

<script>
import MQL from '@/plugins/mql.js'
export default {
  name: 'MTable',
  props: {
    msg: {
      type: String,
      default: null
    },
    activity: {
      type: String,
      default: null
    },
    query: {
      type: String,
      default: null
    },
    restriction: {
      type: String,
      default: null
    },
    params: {
      type: Object,
      default: null
    },
    resultArrayKey: {
      type: String,
      default: null
    },
    idTable: {
      type: String,
      default: 'appTable'
    },
    items: {
      type: Array,
      default: null
    },
    fields: {
      type: Array,
      default: null
    },
    striped: Boolean,
    bordered: Boolean,
    borderless: Boolean,
    outlined: Boolean,
    small: Boolean,
    hover: Boolean,
    dark: Boolean,
    fixed: Boolean,
    footClone: Boolean,
    responsive: {
      type: String,
      default: null
    },
    tableVariant: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      itemList: []
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    getData () {
      if (this.query != null) {
        // call for query specific mql
        this.getQueryData()
      } else if (this.activity != null) {
        // call for activity specific mql
        this.getActivityData()
      } else {
      // Neither query nor activity is provided
        alert('Will you please provide query or activity details while calling TABLE Component.')
      }
    },
    // call for query specific mql
    getQueryData () {
      console.log('Query Type MQL With Params')
      if (this.params != null) {
        new MQL()
          .setActivity(this.restriction + '.[query_' + this.query + ']')
          .setData(this.params)
          .fetch()
          .then(rs => {
            let res = rs.getActivity('query_' + this.query, false)
            // console.log('RES: ', res)
            if (rs.isValid('query_' + this.query)) {
              this.itemList = res
              // console.log('data:: ' + this.itemList)
            } else {
              rs.showErrorToast('query_QueryID')
            }
          })
      } else {
        console.log('Query Type MQL Without Params')
        new MQL()
          .setActivity(this.restriction + '.[query_' + this.query + ']')
          // .setData(data)
          .fetch()
          .then(rs => {
            let res = rs.getActivity('query_' + this.query, false)
            // console.log('RES: ', res)
            if (rs.isValid('query_' + this.query)) {
              this.itemList = res
              // console.log('data:: ' + this.itemList)
            } else {
              rs.showErrorToast('query_QueryID')
            }
          })
      }
    },
    // call for activity specific mql
    getActivityData () {
      console.log('Activity Type MQL With Params')
      if (this.params != null) {
        new MQL()
          .setActivity(this.restriction + '.[' + this.activity + ']')
          .setData(this.params)
          .fetch()
          .then(rs => {
            let res = rs.getActivity(this.activity, false)
            if (rs.isValid(this.activity)) {
              this.itemList = res.result.userProfile
            // console.log(this.itemList)
            } else {
              rs.showErrorToast(this.activity)
            }
          })
      } else {
        console.log('Activity Type MQL Without Params')
        new MQL()
          .setActivity(this.restriction + '.[' + this.activity + ']')
          // .setData(this.params)
          .fetch()
          .then(rs => {
            let res = rs.getActivity(this.activity, false)
            if (rs.isValid(this.activity)) {
              this.itemList = res.result.userProfile
            // console.log(this.itemList)
            } else {
              rs.showErrorToast(this.activity)
            }
          })
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
