<template>
  <div class="flex justify-end sticky bottom-4 container mx-auto px-4 mt-4">
    <!-- The button to open modal -->
    <label for="my-modal-3" class="btn modal-button btn-info font-raleway"
      >Contact Admin</label
    >

    <!-- Put this part before </body> tag -->
    <input type="checkbox" id="my-modal-3" class="modal-toggle" />
    <div class="modal">
      <div class="modal-box relative">
        <label
          for="my-modal-3"
          class="btn btn-sm btn-circle absolute right-2 top-2"
          >✕</label
        >
        <Alert
          v-if="isAlertOpen"
          message="You successfully sendt message to an Admin"
          :alertClass="'alert-success'"
          class="my-5"
        />
        <h3 class="text-lg font-bold font-sora mb-3">
          Send message to an Admin
        </h3>
        <ValidationObserver ref="form" v-slot="{ handleSubmit, invalid }">
          <form action="" @submit.prevent="handleSubmit(sendAdminMessage)">
            <div class="">
              <label class="label">
                <span class="label-text font-raleway">Message</span>
                <p
                  :class="
                    messageToAdmin.data.message.length >= 151
                      ? 'text-red-400'
                      : 'text-gray-400'
                  "
                >
                  Characters ( {{ messageToAdmin.data.message.length }} / 150 )
                </p>
              </label>
              <ValidationProvider
                rules="required|max:150"
                v-slot="{ errors }"
                class="form-control"
              >
                <textarea
                  id="admin message"
                  class="
                    textarea textarea-bordered
                    h-24
                    font-raleway
                    border-primary
                  "
                  v-model="messageToAdmin.data.message"
                  placeholder="Message"
                ></textarea>
                <span class="text-red-500 mt-4">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>
            <button
              class="btn btn-success mt-5"
              type="submit"
              :disabled="invalid"
            >
              Send
            </button>
          </form>
        </ValidationObserver>
      </div>
    </div>
  </div>
</template>

<script>
// components
import Alert from "@/components/layout/Alert.vue";
// utility
import axios from "axios";
import { mapGetters } from "vuex";
export default {
  components: {
    Alert,
  },
  data() {
    return {
      messageToAdmin: {
        data: {
          message: "",
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
      this.messageToAdmin.data.message = "";
      // Wait until the models are updated in the UI
      this.$nextTick(() => {
        this.$refs.form.reset();
      });
    },
    // api call to create a message
    async sendAdminMessage() {
      this.messageToAdmin.data.user = this.user.id;
      let config = {
        method: "post",
        url: "messages",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
        data: this.messageToAdmin,
      };

      axios(config)
        .then((response) => {
          this.alertFunc();
          this.resetForm();
        })
        .catch((error) => {});
    },
  },
  computed: {
    ...mapGetters({
      user: "auth/user",
    }),
  },
};
</script>