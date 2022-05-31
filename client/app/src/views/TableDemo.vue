<template>
  <div>
    <m-table
      id-table="tblPlaces"
      restriction="o"
      activity="query_1SEnILUUyAdUQFjFs4brGEbfukn"
      msg="Table Component"
      responsive="sm"
      bordered
      foot-clone
    />
  </div>
</template>

<script>
// @ is an alias to /src
import MTable from "@/components/MTable.vue";
// import Add from '@/components/Add.vue'

// import Test from '../components/Test.vue'

export default {
  components: {
    mTable: MTable,
    // Aadd: Add,
    // Test
  },
  date() {
    return {};
  },
};
</script>
<style lang="scss">
#login {
  .login-card {
    box-shadow: 0 0 10px #ccc;
    padding: 30px;
  }
}
</style>
