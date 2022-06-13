<template>
  <div>
    <Login />
    <v-container class="login-container"><h1>Container</h1></v-container>
  </div>
</template>

<script>
import Login from "../components/Login.vue";
export default {
  name: "Home",
  components: {
    Login,
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
.container {
  background-color: #f5f5f5;
  height: calc(100vh - 75px);
}
</style>
