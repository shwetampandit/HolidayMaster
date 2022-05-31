<template>
  <div>
    <!-- Add Modal -->
    <div>
      <b-button variant="success" v-b-modal.modal-prevent> Add </b-button>
      <b-modal id="modal-prevent" ref="modal1" title="Enter Holiday Details">
        <template #modal-footer>
          <button
            @click="cancel()"
            type="button"
            class="btn btn-danger"
            data-toggle="modal1"
            data-target="#IdRef"
            size="sm"
          >
            Cancel
          </button>
          <button
            @click="OkAdd()"
            type="button"
            class="btn btn-success"
            data-toggle="modal1"
            data-target="#IdRef"
            size="sm"
          >
            Ok
          </button>
        </template>
        <form ref="form" @submit.stop.prevent>
          <b-form-group
            label="Name"
            label-for="name-input"
            invalid-feedback="Name is required"
            :state="nameState1"
          >
            <b-form-input
              :class="{ error: errors.has('vsName') }"
              id="name-input"
              name="Holiday Name"
              v-model="vsName"
              v-validate="'required|alpha'"
              placeholder="Holiday Name"
              :state="nameState1"
            >
            </b-form-input>
            <small
              class="form-text text-danger"
              v-if="errors.has('Holiday Name')"
            >
              {{ $t(errors.first("Holiday Name")) }}</small
            >
          </b-form-group>
          <b-form-group
            label="Date"
            label-for="date-input"
            invalid-feedback="Date is required"
            :state="dateState1"
            description="Date is in MM/DD/YYYY format"
          >
            <b-form-input
              :class="{ error: errors.has('dDate') }"
              id="date-input"
              v-model="dDate"
              name="Date"
              type="date"
              min="2022-05-30"
              max="2022-12-31"
              v-validate="'required'"
              required
              :state="dateState1"
            ></b-form-input>
            <small class="form-text text-danger" v-if="errors.has('Date')">
              {{ $t(errors.first("Date")) }}</small
            >
          </b-form-group>
        </form>
      </b-modal>
    </div>
    <!-- Edit Modal -->
    <div>
      <b-modal
        id="modal-prevent-closing"
        ref="modal1"
        title="Edit Holiday Details"
      >
        <template #modal-footer>
          <button
            @click="cancel1()"
            type="button"
            class="btn btn-danger"
            data-toggle="modal"
            data-target="#IdRef"
            size="sm"
          >
            Cancel
          </button>
          <button
            @click="OkEdit()"
            type="button"
            class="btn btn-success"
            data-toggle="modal"
            data-target="#IdRef"
            size="sm"
          >
            Ok
          </button>
        </template>
        <form ref="form" @submit.stop.prevent>
          <b-form-group label="Name" label-for="name-input" :state="nameState">
            <b-form-input
              :class="{ error: errors.has('Name') }"
              id="name-input"
              name="Name"
              v-model="Name"
              v-validate="'required|alpha'"
              required
              :state="nameState"
            ></b-form-input>
            <small class="form-text text-danger" v-if="errors.has('Name')">
              {{ $t(errors.first("Name")) }}</small
            >
          </b-form-group>
          <b-form label="Date" label-for="date-input" :state="dateState">
            <b-form-input
              id="date-input"
              name="dtDate"
              v-model="dtDate"
              type="date"
              min="2022-05-30"
              max="2022-12-31"
              v-validate="'required'"
              required
              :state="dateState"
              description="Date is in MM/DD/YYYY format"
            ></b-form-input>
            <small class="form-text text-danger" v-if="errors.has('dtDate')">
              {{ $t(errors.first("dtDate")) }}</small
            >
          </b-form>
        </form>
      </b-modal>
    </div>
    <!-- B-table -->
    <div>
      <br />

      <b-table
        ref="tableList"
        :striped="striped"
        :bordered="bordered"
        :borderless="borderless"
        :outlined="outlined"
        :small="small"
        :hover="hover"
        :dark="dark"
        :responsive="responsive"
        :table-variant="tableVariant"
        id="my-table"
        :fields="field"
        :items="result1"
        :per-page="perPage"
        :current-page="currentPage"
      >
        <template #cell(edit)="result1">
          <b-button
            variant="info"
            v-b-modal.modal-prevent-closing
            v-on:click="saveid(result1.item)"
            >Edit</b-button
          >
        </template>
        <template v-slot:cell(delete)="result1">
          <b-button
            variant="danger"
            v-on:click="deleteHoliday(result1.item.pklHolidayId)"
            >Delete</b-button
          >
        </template>
      </b-table>

      <b-pagination
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
        aria-controls="my-table"
      ></b-pagination>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import VeeValidate from "vee-validate";
Vue.use(VeeValidate, { events: "input|blur" });
import MQL from "@/plugins/mql.js";
import Swal from "sweetalert2";

export default {
  name: "MTable",
  props: {
    items: {
      type: Array,
      default: null,
    },
    fields: {
      type: Array,
      default: null,
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
      default: null,
    },
    tableVariant: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      field: [
        {
          key: "vsHolidayName",
          label: "Holiday Name",
        },
        {
          key: "pklHolidayId",
          label: "Id",
        },
        {
          key: "formatdate",
          label: "Holiday Date",
        },
        {
          key: "updatedDatetime",
          label: "Updated DateTime",
        },
        {
          key: "Edit",
          label: "Edit",
        },
        {
          key: "Delete",
          label: "Delete",
        },
      ],
      result1: [],
      dtDate: null,
      Name: null,
      updateid: null,
      nameState: null,
      dateState: null,
      updatedid: null,
      nameState1: null,
      vsName: null,
      dDate: null,
      dateState1: null,
      perPage: 5,
      currentPage: 1,
    };
  },
  computed: {
    rows() {
      return this.result1.length;
    },
  },

  created() {
    this.display();
  },
  methods: {
    OkAdd() {
      this.$validator.validate().then((valid) => {
        if (valid) {
          this.add();
          this.$bvModal.hide("modal-prevent");
        }
      });
    },
    OkEdit() {
      this.$validator.validate().then((valid) => {
        if (valid) {
          this.EditHolidayMaster();
          this.$bvModal.hide("modal-prevent-closing");
        }
      });
    },

    saveid(item) {
      this.Name = item.vsHolidayName;
      this.dtDate = item.dtHolidayDate;
      this.updatedid = item.pklHolidayId;
    },
    display() {
      new MQL()
        .setActivity("o.[SelectHolidayMaster]")
        .fetch()
        .then((rs) => {
          let res = rs.getActivity("SelectHolidayMaster", true);
          if (rs.isValid("SelectHolidayMaster")) {
            this.result1 = res.result;
          } else {
            rs.showErrorToast("SelectHolidayMaster");
          }
        });
    },
    deleteHoliday(id) {
      Swal.fire({
        title: "Do you want to delete Holiday details?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: `Delete`,
        denyButtonText: `Don't Delete`,
      }).then((result) => {
        if (result.isConfirmed) {
          return new Promise((resolve) => {
            console.log("hii", resolve.result);
            console.log("id", id);
            new MQL()
              .setActivity("o.[deleteFromHolidayMaster]")
              .setData({ id: id })
              .fetch()
              .then((rs) => {
                let res = rs.getActivity("deleteFromHolidayMaster", true);
                if (rs.isValid("deleteFromHolidayMaster")) {
                  this.display();
                } else {
                  rs.showErrorToast("deleteFromHolidayMaster");
                }
              });
          });
        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
        }
      });
    },
    EditHolidayMaster() {
      new MQL()
        .setActivity("o.[updateHolidayMaster]")
        .setData({
          HolidayDate: this.dtDate,
          HolidayName: this.Name,
          id: this.updatedid,
        })
        .fetch()
        .then((rs) => {
          let res = rs.getActivity("updateHolidayMaster", true);
          if (rs.isValid("updateHolidayMaster")) {
            this.display();
          } else {
            rs.showErrorToast("updateHolidayMaster");
          }
        });
    },
    cancel() {
      this.$bvModal.hide("modal-prevent");
    },
    cancel1() {
      this.$bvModal.hide("modal-prevent-closing");
    },
    myFunction(id) {
      let text = "Are you sure you eant to delete?";
      if (confirm(text) == true) {
        this.Delete(id);
      } else {
      }
    },

    add() {
      new MQL()
        .setActivity("o.[insertIntoHolidayMaster]")
        .setData({ date: this.dDate, name: this.vsName })
        // .setHeaders({})
        .fetch()
        .then((rs) => {
          let res = rs.getActivity("insertIntoHolidayMaster", true);
          if (rs.isValid("insertIntoHolidayMaster")) {
            this.display();
          } else {
            rs.showErrorToast("insertIntoHolidayMaster");
          }
        });
    },
  },
};
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
table {
  font-family: arial, sans-serif;
  width: 100%;
}
td,
th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
  border-bottom: 1px solid #ddd;
}
tr:nth-child(even) {
  background-color: #dddddd;
}
btn btn-primary {
  padding-right: 100px;
  padding-left: 100px;
}
</style>