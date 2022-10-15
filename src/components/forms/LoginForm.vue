<template>
  <div>
    <template v-if="isError">
      <Alert message="Wrong username or password" :alertClass="'alert-error'" />
    </template>
    <template v-if="isLoading">
      <Loader />
    </template>
    <template v-else>
      <ValidationObserver v-slot="{ handleSubmit, invalid }">
        <form @submit.prevent="handleSubmit(onSubmit)">
          <div class="form-control w-full max-w-xs">
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
                  border-primary
                  mb-4
                  font-raleway
                  w-72
                "
                v-model="loginData.identifier"
              />
              <span class="text-red-500 text-center">{{ errors[0] }}</span>
            </ValidationProvider>
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
                  border-primary
                  mb-4
                  font-raleway
                  w-72
                "
                v-model="loginData.password"
              />
              <span class="text-red-500 text-center">{{ errors[0] }}</span>
            </ValidationProvider>
            <button
              type="submit"
              :disabled="invalid"
              class="btn btn-primary font-sora block"
            >
              Login
            </button>
          </div>
        </form>
      </ValidationObserver>
    </template>
  </div>
</template>

<script>
import { mapActions } from "vuex";
// components
import Loader from "@/components/layout/Loader.vue";
import Alert from "@/components/layout/Alert.vue";
export default {
  components: {
    Loader,
    Alert,
  },
  data() {
    return {
      loginData: {
        identifier: "",
        password: "",
      },
      isLoading: false,
      isError: false,
    };
  },
  methods: {
    ...mapActions({
      sigIn: "auth/signIn",
    }),
    onSubmit() {
      this.isLoading = true;
      this.sigIn(this.loginData)
        .then(() => {
          this.$router.push("/guide");
          this.isLoading = false;
        })
        .catch((error) => {
          this.isError = true;
          this.isLoading = false;
        });
    },
  },
};
</script>

<style scoped>
span {
  display: block;
}
</style>