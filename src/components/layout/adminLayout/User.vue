<template>
  <div>
    <Alert
      message="Something went wrong when trying to get users"
      v-if="isError"
      :alertClass="'alert-error'"
      class="mt-5"
    />
    <div class="font-raleway form-control w-full max-w-xs mb-3 mt-8 md:mt-0">
      <!-- search user drop down -->
      <label class="label pt-0 md:pl-4">
        <span class="label-text font-raleway">Search username</span>
      </label>
      <v-select
        class="drop-down-search mb-3 md:ml-4"
        label="username"
        :options="users"
        v-model="searchUser"
      ></v-select>
    </div>
    <div
      class="
        md:container
        md:mx-auto
        md:px-4
        md:gap-5
        md:flex
        md:flex-row
        md:flex-wrap
      "
    >
      <div
        class="card bg-white shadow-md mb-5 md:w-96 md:mb-0"
        v-for="user in sortedUsers"
        :key="user.id"
      >
        <div class="card-body w-full font-raleway">
          <span>User name: {{ user.username }}</span>
          <span>User email: {{ user.email }}</span>
          <span>User role: {{ user.role.name }}</span>
          <div class="card-actions">
            <button
              class="btn btn-info"
              @click="$refs.editUser.openDialog(user)"
            >
              Edit user
            </button>
            <button
              class="btn btn-error"
              @click="$refs.deleteUser.openDialog(user)"
            >
              Delete user
            </button>
          </div>
        </div>
      </div>
      <EditUserModal ref="editUser" @childParentConnection="getAllUsers()" />
      <DeleteUserModal
        ref="deleteUser"
        @childParentConnection="getAllUsers()"
      />
    </div>
  </div>
</template>

<script>
// components
import Alert from "@/components/layout/Alert.vue";
import DeleteUserModal from "@/components/layout/adminLayout/modals/DeleteUserModal.vue";
import EditUserModal from "@/components/layout/adminLayout/modals/EditUserModal.vue";
// utillity
import axios from "axios";
export default {
  components: {
    EditUserModal,
    DeleteUserModal,
    Alert,
  },
  data() {
    return {
      users: [],
      searchUser: null,
      isError: false,
    };
  },
  mounted() {
    this.getAllUsers();
  },
  methods: {
    // api call to get all users
    async getAllUsers() {
      try {
        const response = await axios.get("users?populate=*", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        this.users = response.data;
      } catch (error) {
        this.isError = true;
      }
    },
  },
  computed: {
    // filter user based on the users username
    sortedUsers() {
      if (this.searchUser && this.searchUser.username) {
        return this.users.filter((user) => {
          return user.username
            .toLowerCase()
            .match(this.searchUser.username.toLowerCase());
        });
      } else {
        return this.users;
      }
    },
  },
};
</script>

<style scoped>
.drop-down-search {
  --vs-border-color: #664cc3;
}
</style>