<template>
  <div class="mx-auto flex items-center h-screen">
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