<template>
  <v-app-bar elevation="0" color="white" height="75" app role="navigation">
    <router-link to="/"
      ><v-toolbar-title style="color: #7e57c2"
        >SUNGA</v-toolbar-title
      ></router-link
    >
    <v-list class="ml-auto">
      <v-list-item-group color="#ffffff">
        <router-link to="/infoside" active-class="black--text" class="mr-5"
          >Home</router-link
        >
        <router-link to="/brukerside" active-class="black--text" class="mr-5"
          >Bruker side</router-link
        >
      </v-list-item-group>
    </v-list>
  </v-app-bar>
</template>
<script>
export default {};
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