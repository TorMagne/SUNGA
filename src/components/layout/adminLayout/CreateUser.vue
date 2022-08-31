<template>
  <div
    class="
      container
      max-auto
      px-4
      flex
      justify-center
      bg-white
      rounded-lg
      relative
      p-8
      shadow-md
      md:w-96 md:ml-10
    "
  >
    <ValidationObserver v-slot="{ handleSubmit, invalid }" ref="form">
      <form action="" @submit.prevent="handleSubmit(createUser)">
        <Heading title="Create user" />
        <Alert
          message="You successfully created a user"
          v-if="isAlertOpen"
          :alertClass="'alert-success'"
          class="mt-5"
        />
        <Alert
          message="Something went wrong when creating the user"
          v-if="isError"
          :alertClass="'alert-error'"
          class="mt-5"
        />
        <!-- username -->
        <div class="form-control w-full max-w-md">
          <label for="text" class="label"
            ><span class="label-text-alt font-raleway">Username</span></label
          >
          <ValidationProvider rules="required" v-slot="{ errors }">
            <input
              id="username"
              type="text"
              placeholder="Username"
              class="
                input input-bordered
                w-full
                max-w-xs
                border-primary
                mb-4
                font-raleway
              "
              v-model="userData.username"
            />
            <span class="text-red-500 block">{{ errors[0] }}</span>
          </ValidationProvider>

          <!-- email -->
          <label for="email" class="label font-raleway"
            ><span class="label-text-alt">Email</span></label
          >
          <ValidationProvider rules="required|email" v-slot="{ errors }">
            <input
              id="email"
              type="email"
              placeholder="Email"
              class="
                input input-bordered
                w-full
                max-w-xs
                border-primary
                mb-4
                font-raleway
              "
              v-model="userData.email"
            />
            <span class="text-red-500 block">{{ errors[0] }}</span>
          </ValidationProvider>
          <!-- password -->
          <label for="password" class="label"
            ><span class="label-text-alt font-raleway">Password</span></label
          >
          <ValidationProvider rules="required|min:10" v-slot="{ errors }">
            <input
              id="password"
              type="password"
              placeholder="Password"
              class="
                input input-bordered
                w-full
                max-w-xs
                border-primary
                mb-4
                font-raleway
              "
              v-model="userData.password"
            />
            <span class="text-red-500 block">{{ errors[0] }}</span>
          </ValidationProvider>
          <button
            type="submit"
            :disabled="invalid"
            class="btn btn-primary font-sora block"
          >
            Create user
          </button>
        </div>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
// components
import Heading from "@/components/layout/Heading.vue";
import Alert from "@/components/layout/Alert.vue";
// utility
import axios from "axios";
export default {
  components: {
    Heading,
    Alert,
  },
  data() {
    return {
      isAlertOpen: false,
      isError: false,
      userData: {
        username: null,
        email: null,
        password: null,
        confirmed: true,
      },
    };
  },
  methods: {
    resetForm() {
      this.$refs.form.validate().then((success) => {
        if (!success) {
          return;
        }
      });
      this.userData.username = "";
      this.userData.email = "";
      this.userData.password = "";
      // Wait until the models are updated in the UI
      this.$nextTick(() => {
        this.$refs.form.reset();
      });
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
    createUser() {
      let config = {
        method: "post",
        url: "users",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        data: this.userData,
      };

      axios(config)
        .then((response) => {
          this.alertFunc();
          this.resetForm();
        })
        .catch((error) => {
          this.isError = true;
        });
    },
  },
};
</script>