<template>
  <div class="flex flex-col md:flex-row md:mt-10">
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
          font-raleway
        "
      >
        <li @click="showPanel(1)">
          <a :class="{ 'text-primary font-bold': show === 1 }">Users</a>
        </li>
        <li @click="showPanel(2)">
          <a :class="{ 'text-primary font-bold': show === 2 }">Create Users</a>
        </li>
        <li @click="showPanel(3)">
          <a :class="{ 'text-primary font-bold': show === 3 }">Work</a>
        </li>
      </ul>
    </div>
    <div class="">
      <User v-if="show === 1" />
      <CreateUser v-if="show === 2" />
      <UserWork v-if="show === 3" />
    </div>
  </div>
</template>

<script>
import User from "@/components/layout/adminLayout/User.vue";
import CreateUser from "@/components/layout/adminLayout/CreateUser.vue";
import UserWork from "@/components/layout/adminLayout/UserWork.vue";
export default {
  components: {
    User,
    CreateUser,
    UserWork,
  },
  data() {
    return {
      show: 1,
      activeCLass: "text-primary font-bold",
    };
  },
  methods: {
    showPanel(number) {
      this.show = number;
    },
  },
};
</script>