<template>
  <v-app>
    <v-main>
      <Nav />
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import Nav from "./components/layout/Nav.vue";
export default {
  name: "App",
  components: {
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