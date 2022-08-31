<template>
  <div>
    <WorkForm />
    <ContactAdminModal />
  </div>
</template>

<script>
// components
import ContactAdminModal from "@/components/layout/ContactAdminModal.vue";
import WorkForm from "@/components/forms/WorkForm.vue";
export default {
  components: {
    WorkForm,
    ContactAdminModal,
  },
};
</script>