<template>
  <div>
    <div class="container">
      <LoginForm />
    </div>
  </div>
</template>

<script>
import LoginForm from "./LoginForm.vue";
export default {
  components: {
    LoginForm,
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
/* .container {
  background-color: #f5f5f5;
  height: calc(100vh - 75px);
} */
</style>