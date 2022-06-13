<template>
  <div>
    <Login />
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
    return {
      isLoggedInn: false,
    };
  },
  computed: {},
  methods: {},
};
</script>

<style scoped>
</style>
