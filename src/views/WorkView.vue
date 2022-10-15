<template>
  <div>
    <WorkForm />
    <ContactAdminModal v-if="!authenticaded.isAdmin" />
  </div>
</template>

<script>
// components
import ContactAdminModal from "@/components/layout/ContactAdminModal.vue";
import WorkForm from "@/components/forms/WorkForm.vue";
// utillity
import { mapGetters } from "vuex";
export default {
  components: {
    WorkForm,
    ContactAdminModal,
  },
  computed: {
    ...mapGetters({
      authenticaded: "auth/authenticaded",
      user: "auth/user",
    }),
  },
};
</script>