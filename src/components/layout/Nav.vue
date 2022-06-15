<template>
  <div v-if="$vuetify.breakpoint.xsOnly">
    <v-app-bar elevation="0" color="white" height="75" app role="navigation">
      <router-link to="/"
        ><v-toolbar-title style="color: #7e57c2"
          >SUNGA</v-toolbar-title
        ></router-link
      >
      <v-app-bar-nav-icon
        @click="drawer = true"
        inline
        class="ml-auto"
        style="color: #7e57c2"
      ></v-app-bar-nav-icon>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" absolute temporary right app>
      <v-list nav dense>
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <div class="d-flex justify-end">
            <v-btn color="" icon @click="drawer = false">
              <v-icon style="color: #7e57c2">mdi-close</v-icon>
            </v-btn>
          </div>
          <v-list-item>
            <router-link to="/infoside" active-class="black--text" class="mr-5"
              >Home</router-link
            >
          </v-list-item>
          <v-list-item>
            <router-link
              to="/brukerside"
              active-class="black--text"
              class="mr-5"
              >Bruker side</router-link
            >
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
  <div v-else>
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
  </div>
</template>

<script>
export default {
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