<template>
  <div>
    <ValidationObserver
      ref="form"
      v-slot="{ handleSubmit, invalid }"
      class="w-full container mx-auto px-4 mt-12 flex flex-col items-center"
    >
      <form
        action=""
        class="w-full max-w-md"
        @submit.prevent="handleSubmit(createWorkTable)"
      >
        <Heading class="mb-5" title="Save work day" />
        <Alert
          v-if="isAlertOpen"
          message="You successfully saved your work"
          :alertClass="'alert-success'"
        />
        <!-- date -->
        <div class="form-control w-full max-w-md">
          <label class="label">
            <span class="label-text font-raleway">Select work date</span>
          </label>
          <ValidationProvider rules="required" v-slot="{ errors }">
            <input
              id="date"
              type="date"
              placeholder="Select work date"
              class="
                input input-bordered
                border-primary
                w-full
                max-w-md
                font-raleway
                text-lg
              "
              v-model="newWorkInfo.data.workDate"
            />
            <span class="text-red-500">{{ errors[0] }}</span>
          </ValidationProvider>

          <!-- start time -->

          <label class="label">
            <span class="label-text font-raleway">Work start time</span>
          </label>
          <ValidationProvider rules="required" v-slot="{ errors }">
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
              v-model="newWorkInfo.data.workStartTime"
            />
            <span class="text-red-500">{{ errors[0] }}</span>
          </ValidationProvider>

          <!-- end time -->

          <label class="label">
            <span class="label-text font-raleway">Work end time</span>
          </label>
          <ValidationProvider rules="required" v-slot="{ errors }">
            <input
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
              v-model="newWorkInfo.data.workEndTime"
            />
            <span class="text-red-500">{{ errors[0] }}</span>
          </ValidationProvider>

          <label class="label">
            <span class="label-text font-raleway">Work details</span>
          </label>
          <ValidationProvider
            rules="required"
            v-slot="{ errors }"
            class="w-full"
          >
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
              v-model="newWorkInfo.data.workDetails"
            ></textarea>
            <span class="text-red-500">{{ errors[0] }}</span>
          </ValidationProvider>
          <button class="btn btn-primary mt-5" :disabled="invalid">Save</button>
        </div>
      </form>
    </ValidationObserver>
    <WorkTables ref="triggerGetUserWorkTable" />
  </div>
</template>

<script>
// components
import Heading from "@/components/layout/Heading.vue";
import Alert from "@/components/layout/Alert.vue";
import WorkTables from "@/components/layout/WorkTables.vue";
// utility
import axios from "axios";
import { mapGetters } from "vuex";
export default {
  components: {
    Heading,
    Alert,
    WorkTables,
  },
  data() {
    return {
      newWorkInfo: {
        data: {
          workDate: null,
          workStartTime: null,
          workEndTime: null,
          workDetails: "",
          user: null,
        },
      },
      isAlertOpen: false,
    };
  },
  methods: {
    // show success message when form i posted
    alertFunc() {
      this.isAlertOpen = true;
      setTimeout(
        function () {
          this.isAlertOpen = false;
        }.bind(this),
        4000
      );
    },
    resetForm() {
      this.$refs.form.validate().then((success) => {
        if (!success) {
          return;
        }
      });
      // Resetting Values
      this.newWorkInfo.data.workStartTime = "";
      this.newWorkInfo.data.workEndTime = "";
      this.newWorkInfo.data.workDetails = "";
      // Wait until the models are updated in the UI
      this.$nextTick(() => {
        this.$refs.form.reset();
      });
    },
    async createWorkTable() {
      this.newWorkInfo.data.user = this.user.id;

      let config = {
        method: "post",
        url: "work-tables",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
        data: this.newWorkInfo,
      };

      axios(config)
        .then((response) => {
          this.$refs.triggerGetUserWorkTable.getUserWorkTable();
          this.alertFunc();
          this.resetForm();
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  computed: {
    ...mapGetters({
      user: "auth/user",
    }),
  },
};
</script>