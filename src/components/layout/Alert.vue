<template>
  <div class="alert shadow-lg" :class="alertClass">
    <div>
      <span class="font-raleway">{{ message }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      require: true,
    },
    alertClass: {
      type: String,
    },
  },
};
</script>