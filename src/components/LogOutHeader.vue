<template>
  <div class="log-out-header">
    <span style="margin-right: 20px">Hei &#128516; {{ user.username }}</span>
    <v-btn elevation="0" @click="logOut">Logg ut</v-btn>
  </div>
</template>
<script>
export default {
  data() {
    return {
      user: {},
    };
  },
  mounted() {
    this.getUserObject();
  },
  methods: {
    logOut() {
      localStorage.removeItem("jwt");
      localStorage.removeItem("userData");
      this.$router.push("/");
    },
    getUserObject() {
      this.user = JSON.parse(window.localStorage.getItem("userData"));
    },
  },
};
</script>

<style scoped>
.log-out-header {
  border-top: solid #7e57c2 2px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: end;
  background-color: white;
}
.theme--light.v-btn.v-btn--has-bg {
  background-color: #7e57c2;
  margin-right: 2rem;
}
</style>