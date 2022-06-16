<template>
  <div
    class="d-flex justify-center align-center flex-column"
    style="padding-top: 10rem"
  >
    <v-form @submit="logInn">
      <v-text-field
        v-model="modifiedLoginData.identifier"
        label="Epost"
        type="email"
        outlined
        required
      >
      </v-text-field>
      <v-text-field
        v-model="modifiedLoginData.password"
        label="Passord"
        :type="showPassword ? 'text' : 'password'"
        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        @click:append="showPassword = !showPassword"
        outlined
        required
      >
      </v-text-field>
      <v-btn type="submit" color="deep-purple lighten-1" elevation="0"
        >Logg inn</v-btn
      >
    </v-form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      modifiedLoginData: {
        identifier: "",
        password: "",
      },
      showPassword: false,
    };
  },
  methods: {
    async logInn(e) {
      e.preventDefault();
      try {
        const response = await axios.post(
          process.env.VUE_APP_API_URL + "auth/local",
          this.modifiedLoginData
        );
        const { jwt, user } = response.data;
        localStorage.setItem("jwt", jwt);
        localStorage.setItem("userData", JSON.stringify(user));
        this.$router.push("/infoside");
      } catch (error) {
        this.error = error;
      }
    },
  },
};
</script>

<style scoped>
.v-text-field--outlined >>> fieldset {
  border-color: #7e57c2;
}
</style>