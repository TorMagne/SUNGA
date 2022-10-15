<template>
  <div
    class="
      z-10
      bg-[#00000037]
      w-[100%]
      h-[100%]
      absolute
      top-1/2
      left-1/2
      transform
      -translate-x-1/2 -translate-y-1/2
    "
    v-if="isModalOpen"
  >
    <div
      class="
        z-20
        absolute
        top-1/2
        left-1/2
        transform
        -translate-x-1/2 -translate-y-1/2
      "
      v-if="isModalOpen"
    >
      <div class="bg-white rounded-lg relative p-8 md:w-96 w-[90vw]">
        <form
          action=""
          @submit.prevent="editUserWorkTable(getUpdatedWorkTables)"
        >
          <label
            @click="closeDialog"
            for="my-modal-3"
            class="btn btn-sm btn-circle absolute right-2 top-2"
            >✕</label
          >
          <Alert
            message="You successfully edited this users work day"
            v-if="isAlertOpen"
            :alertClass="'alert-success'"
            class="mt-5"
          />
          <Alert
            message="Something went wrong when editing users work day"
            v-else-if="isError"
            :alertClass="'alert-error'"
            class="mt-5"
          />
          <h3 class="text-lg font-bold font-sora mt-5">
            Edit work table for:
            {{ tableData.attributes.user.data.attributes.username }}
          </h3>
          <!-- <div class="form-control w-full max-w-xs font-raleway"> -->
          <!-- username input -->
          <label class="label">
            <span class="label-text">Work date</span>
          </label>
          <input
            id="date"
            type="date"
            class="
              input input-bordered
              border-primary
              w-full
              max-w-md
              font-raleway
              text-lg
            "
            v-model="tableData.attributes.workDate"
          />
          <label class="label">
            <span class="label-text">Work start time</span>
          </label>
          <input
            @focus="required = true"
            id="start time"
            type="time"
            placeholder="Select work date"
            class="
              input input-bordered
              border-primary
              w-full
              max-w-md
              font-raleway
              text-lg
            "
            v-model="tableData.attributes.workStartTime"
          />
          <label class="label">
            <span class="label-text">Work end time</span>
          </label>
          <input
            @focus="required = true"
            id="end time"
            type="time"
            placeholder="Select work date"
            class="
              input input-bordered
              border-primary
              w-full
              max-w-md
              font-raleway
              text-lg
            "
            v-model="tableData.attributes.workEndTime"
          />
          <label class="label">
            <span class="label-text font-raleway">Work details</span>
          </label>
          <textarea
            id="details"
            class="
              textarea textarea-bordered
              font-raleway
              border-primary
              w-full
              h-30
            "
            placeholder="Work details"
            v-model="tableData.attributes.workDetails"
          ></textarea>
          <button type="submit" class="btn btn-success w-full mt-5">
            Save
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
// components
import Alert from "@/components/layout/Alert.vue";
// utillity
import axios from "axios";
export default {
  components: {
    Alert,
  },
  data() {
    return {
      isAlertOpen: false,
      isError: false,
      tableData: null,
      isModalOpen: false,
      editedUserWorkTable: {
        workDate: "",
        workStartTime: "",
        workEndTime: "",
        workDetails: "",
      },
    };
  },
  methods: {
    async editUserWorkTable() {
      // let data = this.editedUserWorkTable;
      let editedData = {
        data: {
          workDate: this.tableData.attributes.workDate,
          workStartTime: this.tableData.attributes.workStartTime,
          workEndTime: this.tableData.attributes.workendTime,
          workDetails: this.tableData.attributes.workDetails,
        },
      };
      let config = {
        method: "put",
        url: `work-tables/${this.tableData.id}`,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        data: editedData,
      };

      axios(config)
        .then((response) => {
          this.isAlertOpen = true;
          this.alertFunc();
        })
        .catch((error) => {
          this.isError = true;
          this.alertFunc();
        });
    },
    // handle alerts and alert time
    alertFunc() {
      if (this.isAlertOpen) {
        setTimeout(
          function () {
            this.isAlertOpen = false;
          }.bind(this),
          4000
        );
      }
      if (this.isError) {
        setTimeout(
          function () {
            this.isError = false;
          }.bind(this),
          4000
        );
      }
    },
    getUpdatedWorkTables() {
      this.$emit("childParentConnection");
    },
    openDialog(dataFromParent) {
      this.tableData = dataFromParent;
      this.isModalOpen = true;
    },
    closeDialog() {
      this.isModalOpen = false;
      this.tableData = null;
    },
  },
};
</script>