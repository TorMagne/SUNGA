<template>
  <NavBarMobile v-if="$vuetify.breakpoint.xsOnly" />
  <NavBarMdAndUp v-else />
</template>

<script>
import NavBarMobile from "./NavBarMobile.vue";
import NavBarMdAndUp from "./NavBarMdAndUp.vue";
export default {
  components: {
    NavBarMobile,
    NavBarMdAndUp,
  },
  data() {
    return {
      drawer: false,
      group: null,
    };
  },
  methods: {},
};
</script>

<style scoped>
.v-application a {
  color: #747474;
  text-decoration: none;
  font-size: 18px;
}
.v-toolbar__title {
  font-weight: bold;
  font-size: 40px;
}
</style>