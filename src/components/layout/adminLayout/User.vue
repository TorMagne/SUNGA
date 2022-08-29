<template>
  <div>
    <div
      class="
        font-raleway
        form-control
        w-full
        max-w-xs
        block
        md:ml-10
        mb-3
        md:mt-3
      "
    >
      <Alert
        message="Something went wrong when trying to get users"
        v-if="isError"
        :alertClass="'alert-error'"
        class="mt-5"
      />
      <label class="label">
        <span class="label-text font-raleway">Search user</span>
      </label>
      <input
        type="search"
        placeholder="Search user"
        class="input input-bordered w-full border-primary"
        v-model="searchUser"
      />
    </div>
    <div
      class="
        md:container
        md:mx-auto
        md:px-4
        md:mt-5
        md:gap-5
        md:flex
        md:flex-row
        md:flex-wrap
        md:ml-5
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
import DeleteUserModal from "@/components/layout/adminLayout/model/DeleteUserModal.vue";
import EditUserModal from "@/components/layout/adminLayout/model/EditUserModal.vue";
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
      searchUser: "",
      isError: false,
    };
  },
  mounted() {
    this.getAllUsers();
  },
  methods: {
    async getAllUsers() {
      try {
        const response = await axios.get("users?populate=*", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        this.users = response.data;
      } catch (error) {
        console.log(error);
        this.isError = true;
      }
    },
  },
  computed: {
    sortedUsers() {
      return this.users.filter((user) => {
        return user.username.toLowerCase().match(this.searchUser.toLowerCase());
      });
    },
  },
};
</script>