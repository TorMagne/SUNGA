<template>
  <div
    class="
      font-raleway
      mb-3
      md:container md:mx-auto md:px-4 md:gap-5 md:flex md:flex-row md:flex-wrap
      mt-10
      md:mt-0
      px-4
    "
  >
    <Alert
      message="There is no new messages"
      v-if="isAlertOpen"
      :alertClass="'alert-info'"
    />
    <div
      class="card bg-white shadow-md mb-5 md:w-96 md:mb-0 border-info border-2"
      v-for="message in filteredNewMessages"
      :key="message.id"
    >
      <div class="card-body w-full">
        <p>Sendt: {{ message.attributes.createdAt.split("T")[0] }}</p>
        <h2 class="card-title font-sora">
          Sender: {{ message.attributes.user.data.attributes.username }}
        </h2>
        <p class="mb-4">Message: {{ message.attributes.message }}</p>
        <div class="card-actions">
          <button
            id="read-button"
            class="btn btn-info"
            @click="markMessageAsArchived(message.id)"
          >
            Mark as read
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// utillity
import axios from "axios";
// components
import Alert from "@/components/layout/Alert.vue";
export default {
  components: {
    Alert,
  },
  data() {
    return {
      isAlertOpen: false,
      newMessages: [],
      archivedData: {
        data: {
          isArchived: true,
          isRead: true,
        },
      },
    };
  },
  mounted() {
    this.getAllNewMessages();
  },
  methods: {
    // api call to edit a message
    async markMessageAsArchived(messageId) {
      let config = {
        method: "put",
        url: `messages/${messageId}`,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
        data: this.archivedData,
      };
      axios(config)
        .then((response) => {
          this.getAllNewMessages();
          this.$emit("childParentConnection");
        })
        .catch((error) => {});
    },
    // api call to get all messages
    async getAllNewMessages() {
      let config = {
        method: "get",
        url: "messages?populate=*",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      };
      axios(config)
        .then((response) => {
          this.newMessages = response.data.data.reverse();
          if (response.data.data.length === 0) {
            this.isAlertOpen = true;
          } else {
            this.isAlertOpen = false;
          }
        })
        .catch((error) => {});
    },
  },
  computed: {
    filteredNewMessages() {
      return this.newMessages.filter((messages) => {
        return !messages.attributes.isArchived;
      });
    },
  },
};
</script>