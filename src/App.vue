<template>
  <v-app>
    <v-main>
      <Nav />
      <LoginHeader />
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import LoginHeader from "./components/layout/LoginHeader.vue";
import Nav from "./components/layout/Nav.vue";
export default {
  name: "App",
  components: {
    LoginHeader,
    Nav,
  },
  data() {
    return {};
  },
};
</script>

<style>
* {
  font-family: "Sora", sans-serif;
}
.v-application--wrap {
  background-color: #f5f5f5;
}
</style>