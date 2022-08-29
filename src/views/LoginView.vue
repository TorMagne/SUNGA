<template>
  <div
    class="
      container
      mx-auto
      px-4
      flex flex-col
      items-center
      h-screen
      justify-center
    "
  >
    <LoginForm />
  </div>
</template>

<script>
import LoginForm from "@/components/forms/LoginForm.vue";

export default {
  components: {
    LoginForm,
  },
  data() {
    return {};
  },
};
</script>