<template>
  <div
    class="d-flex justify-center align-center flex-column"
    style="padding-top: 10rem"
  >
    <v-form>
      <v-text-field
        v-model="identifier"
        label="Epost"
        type="email"
        outlined
        required
      >
      </v-text-field>
      <v-text-field
        v-model="password"
        label="Passord"
        type="password"
        outlined
        required
      >
      </v-text-field>
      <v-btn type="submit" color="deep-purple lighten-1">Logg inn</v-btn>
    </v-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      identifier: "",
      password: "",
    };
  },
};
</script>

<style scoped>
.v-text-field--outlined >>> fieldset {
  border-color: #7e57c2;
}
</style>