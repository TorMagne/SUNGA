<template>
  <div class="flex flex-col md:flex-row mt-10">
    <div>
      <ul
        class="
          menu
          bg-white
          md:w-56
          rounded-lg
          drop-shadow-md
          flex flex-row
          md:flex-col
          flex-wrap
          font-raleway
          p-4
          md:mr-6
        "
      >
        <li @click="showPanel(1)">
          <a :class="{ 'text-primary font-bold': show === 1 }">Users</a>
        </li>
        <li @click="showPanel(2)">
          <a :class="{ 'text-primary font-bold': show === 2 }">Create Users</a>
        </li>
        <li @click="showPanel(3)">
          <a :class="{ 'text-primary font-bold': show === 3 }">Work entries</a>
        </li>
        <li @click="showPanel(4)">
          <a :class="{ 'text-primary font-bold': show === 4 }"
            >New messages
            <span
              id="counter"
              class="
                bg-info
                font-sora
                rounded-full
                px-2
                flex
                justify-center
                items-center
                text-white
              "
              >{{ messageCounter }}</span
            ></a
          >
        </li>
        <li @click="showPanel(5)">
          <a :class="{ 'text-primary font-bold': show === 5 }"
            >Archived messages</a
          >
        </li>
      </ul>
    </div>
    <div class="">
      <User v-if="show === 1" />
      <CreateUser v-if="show === 2" />
      <UserWork v-if="show === 3" />
      <Messages
        v-if="show === 4"
        @childParentConnection="updateUnreadMesages"
      />
      <ArchivedMessages v-if="show === 5" />
    </div>
  </div>
</template>

<script>
// utillities
import { mapGetters } from "vuex";
// components
import User from "@/components/layout/adminLayout/User.vue";
import CreateUser from "@/components/layout/adminLayout/CreateUser.vue";
import UserWork from "@/components/layout/adminLayout/UserWork.vue";
import Messages from "@/components/layout/adminLayout/Messages.vue";
import ArchivedMessages from "@/components/layout/adminLayout/ArchiveMessages.vue";
export default {
  components: {
    User,
    CreateUser,
    UserWork,
    Messages,
    ArchivedMessages,
  },
  data() {
    return {
      show: 1,
      activeCLass: "text-primary font-bold",
      messageCounter: null,
    };
  },
  mounted() {
    this.getUnreadMessages();
  },
  methods: {
    showPanel(number) {
      this.show = number;
    },
    getUnreadMessages() {
      this.newMessages.data.forEach((message) => {
        if (message.attributes.isRead == false) {
          this.messageCounter++;
        }
      });
    },
    updateUnreadMesages() {
      this.messageCounter--;
      const counter = document.querySelector("#counter");
      if (this.messageCounter == 0) {
        counter.classList.toggle("hidden");
      }
    },
  },
  computed: {
    ...mapGetters({
      newMessages: "auth/newMessages",
    }),
  },
};
</script>