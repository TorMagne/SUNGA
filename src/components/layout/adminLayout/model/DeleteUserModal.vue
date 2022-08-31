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
      <div class="bg-white rounded-lg relative p-8 md:w-96">
        <label
          @click="closeDialog"
          for="my-modal-3"
          class="btn btn-sm btn-circle absolute right-2 top-2"
          >✕</label
        >
        <Alert
          message="You successfully deleted this user"
          v-if="isAlertOpen"
          :alertClass="'alert-success'"
          class="mt-5"
        />
        <Alert
          message="Wops something went wrong"
          v-if="isError"
          :alertClass="'alert-error'"
          class="mt-5"
        />
        <form class="w-full max-w-md" @submit.prevent="deleteUser()">
          <div class="form-control my-5 font-raleway">
            <label class="label cursor-pointer">
              <span class="label-text text-base"
                >Are you sure you want to delete this user?
                <span class="underline decoration-primary">{{
                  userData.username
                }}</span>
              </span>
              <input
                type="checkbox"
                class="checkbox checkbox-primary"
                v-model="isDelete"
              />
            </label>
          </div>
          <button
            v-if="isDelete"
            class="font-sora btn btn-error mr-5"
            type="submit"
          >
            delete user
          </button>
          <button
            v-if="isDelete"
            class="font-sora btn"
            type="submit"
            @click="closeDialog"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
// components
import Alert from "@/components/layout/Alert.vue";
// utility
import axios from "axios";
export default {
  components: {
    Alert,
  },
  data() {
    return {
      isModalOpen: false,
      isDelete: false,
      userData: null,
      isAlertOpen: false,
      isError: false,
    };
  },

  methods: {
    getUpdatedUsers() {
      this.$emit("childParentConnection");
    },
    alertFunc() {
      this.isAlertOpen = true;
      setTimeout(
        function () {
          this.isAlertOpen = false;
        }.bind(this),
        4000
      );
    },
    deleteUser() {
      let config = {
        method: "delete",
        url: `users/${this.userData.id}`,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        data: this.userData,
      };

      axios(config)
        .then((response) => {
          console.log(response.data);
          this.alertFunc();
          this.getUpdatedUsers();
        })
        .catch((error) => {
          console.log(error);
          this.isError = true;
        });
    },
    openDialog(dataFromParent) {
      this.userData = dataFromParent;
      this.isModalOpen = true;
    },
    closeDialog() {
      this.isModalOpen = false;
      this.userData = null;
      this.isDelete = false;
    },
  },
};
</script>