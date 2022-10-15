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
        <form action="" @submit.prevent="editUser(getUpdatedUsers)">
          <label
            @click="closeDialog"
            for="my-modal-3"
            class="btn btn-sm btn-circle absolute right-2 top-2"
            >✕</label
          >
          <Alert
            message="You successfully edited this user"
            v-if="isAlertOpen"
            :alertClass="'alert-success'"
            class="mt-5"
          />
          <Alert
            message="Something went wrong when editing user"
            v-else-if="isError"
            :alertClass="'alert-error'"
            class="mt-5"
          />
          <h3 class="text-lg font-bold font-sora mt-5">
            Edit user: {{ userData.username }}
          </h3>
          <div class="form-control w-full max-w-xs font-raleway">
            <!-- username input -->
            <label class="label">
              <span class="label-text">Change username</span>
            </label>
            <input
              type="text"
              placeholder="Username"
              class="border-primary input input-bordered w-full max-w-xs mb-3"
              v-model="userData.username"
            />
            <!-- email input -->
            <label class="label">
              <span class="label-text">Change user email</span>
            </label>
            <input
              type="email"
              placeholder="Email"
              class="border-primary input input-bordered w-full max-w-xs mb-3"
              v-model="userData.email"
            />
            <!-- dropdown -->
            <div class="flex justify-between">
              <label class="label">
                <span class="label-text font-raleway mr-3">User role?</span>
              </label>
              <select
                class="select select-primary w-[10rem] font-raleway font-normal"
                v-model="userRole"
              >
                <option value="1" selected="selected">User</option>
                <option value="3">Admin</option>
              </select>
            </div>
          </div>
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
      isError: false,
      isAlertOpen: false,
      userData: null,
      isModalOpen: false,
      userRole: 1,
      editedUserData: {
        username: "",
        email: "",
        confirmed: true,
        isAdmin: false,
        role: {
          id: null,
        },
      },
    };
  },
  methods: {
    checkIfIsAdminOrNot() {
      if (this.userRole == 1) {
        this.editedUserData.isAdmin = false;
      } else if (this.userRole == 3) {
        this.editedUserData.isAdmin = true;
      }
    },
    getUpdatedUsers() {
      this.$emit("childParentConnection");
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
    async editUser() {
      let data = this.editedUserData;
      this.checkIfIsAdminOrNot();
      let editedData = {
        username: this.userData.username,
        email: this.userData.email,
        confirmed: data.confirmed,
        isAdmin: data.isAdmin,
        role: {
          id: this.userRole,
        },
      };
      let config = {
        method: "put",
        url: `users/${this.userData.id}?populate=role`,
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
    openDialog(dataFromParent) {
      this.userData = dataFromParent;
      this.isModalOpen = true;
    },
    closeDialog() {
      this.isModalOpen = false;
      this.userData = null;
    },
  },
  computed: {
    checkUserRole() {
      if (this.userRole == 1) {
        return (this.editedUserData.role.id = 1);
      } else if (this.userRole == 3) {
        return (this.editedUserData.role.id = 3);
      }
    },
  },
};
</script>