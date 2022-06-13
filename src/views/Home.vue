<template>
  <div>
    <Login v-if="isLoggedInn == false" />
    <HomeTemp v-else />
  </div>
</template>

<script>
import Login from "../components/Login.vue";
import HomeTemp from "../components/HomeTemp.vue";
export default {
  name: "Home",
  components: {
    Login,
    HomeTemp,
  },
  data() {
    return {
      isLoggedInn: false,
    };
  },
};
</script>

<style scoped>
</style>
