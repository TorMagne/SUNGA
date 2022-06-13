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
    HomeTemp,
  },
  data() {
    return {
      isLoggedInn: false,
    };
  },
  mounted() {
    this.checkIfLoggedIn();
  },
  computed: {},
  methods: {
    checkIfLoggedIn() {
      if (localStorage.getItem("userData") == null) {
        this.isLoggedInn = false;
        console.log("false");
      } else {
        this.isLoggedInn = true;
        console.log("true");
      }
    },
  },
};
</script>

<style scoped>
</style>
