<template>
  <div id="app">
    <nav>
      <div class="drawer">
        <input id="my-drawer-3" type="checkbox" class="drawer-toggle" />
        <div class="drawer-content flex flex-col">
          <!-- Navbar -->
          <div class="navbar h-[64px] w-full bg-white">
            <div class="container mx-auto">
              <div class="flex-none lg:hidden">
                <label for="my-drawer-3" class="btn btn-square btn-ghost">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    class="inline-block w-6 h-6 stroke-current"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    ></path>
                  </svg>
                </label>
              </div>
              <div class="flex-1 px-2 mx-2">
                <router-link
                  to="/guide"
                  class="text-primary text-3xl font-bold font-sora"
                  >SUNGA</router-link
                >
              </div>
              <div class="flex-none hidden lg:block">
                <ul
                  class="menu menu-horizontal font-raleway"
                  v-if="authenticaded"
                >
                  <!-- Navbar menu content here -->
                  <li>
                    <router-link
                      to="/guide"
                      active-class="text-primary font-bold"
                      >Guide</router-link
                    >
                  </li>
                  <li>
                    <router-link
                      to="/work"
                      active-class="text-primary font-bold"
                      >Work</router-link
                    >
                  </li>
                  <li v-if="authenticaded.isAdmin">
                    <router-link
                      to="/admin"
                      active-class="text-primary font-bold"
                      >Admin panel</router-link
                    >
                  </li>
                  <span class="py-3 px-4">Hei {{ user.username }}</span>
                  <button class="btn btn-primary" @click="signOut">
                    Logout
                  </button>
                </ul>
              </div>
            </div>
          </div>
          <!-- Page content here -->
          <router-view />
        </div>
        <div class="drawer-side">
          <label for="my-drawer-3" class="drawer-overlay"></label>
          <ul
            class="menu p-4 overflow-y-auto w-80 bg-base-100 font-raleway"
            v-if="authenticaded"
          >
            <!-- Sidebar content here -->
            <label
              for="my-drawer-3"
              class="
                drawer-button
                btn-primary btn btn-sm btn-circle
                absolute
                left-6
                top-4
              "
              >X</label
            >
            <li class="mt-10">
              <router-link to="/guide" active-class="text-primary font-bold"
                >Guide</router-link
              >
            </li>
            <li>
              <router-link to="/work" active-class="text-primary font-bold"
                >Work</router-link
              >
            </li>
            <li v-if="authenticaded.isAdmin">
              <router-link to="/admin" active-class="text-primary font-bold"
                >Admin panel</router-link
              >
            </li>
            <span class="py-3 px-4">Hei {{ user.username }}</span>
            <button class="btn btn-primary" @click="signOut">Logout</button>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {};
  },
  methods: {
    ...mapActions({
      signOutAction: "auth/signOut",
    }),
    signOut() {
      this.signOutAction().then(() => {
        this.$router.push("/");
      });
    },
  },
  computed: {
    ...mapGetters({
      authenticaded: "auth/authenticaded",
      user: "auth/user",
    }),
  },
};
</script>