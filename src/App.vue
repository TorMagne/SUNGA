<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

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