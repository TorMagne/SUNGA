<template>
  <div class="container mx-auto px-4 flex justify-end mb-10 md:mb-0">
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
        <h3 class="text-lg font-bold font-sora mb-3">
          Send message to an Admin
        </h3>
        <form action="" @submit.prevent="sendAdminMessage">
          <div class="form-control">
            <label class="label">
              <span class="label-text font-raleway">Message</span>
            </label>
            <textarea
              class="
                textarea textarea-bordered
                h-24
                font-raleway
                border-primary
              "
              v-model="messageToAdmin.data.message"
              placeholder="Bio"
            ></textarea>
          </div>
          <button class="btn btn-success mt-5" type="submit">Send</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
// utility
import axios from "axios";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      messageToAdmin: {
        data: {
          message: "",
          user: null,
        },
      },
    };
  },
  methods: {
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
          console.log(response.data);
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