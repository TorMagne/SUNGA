<template>
  <div class="container mx-auto px-4 mt-12">
    <Heading title="What is SUNGA?" />
    <p class="mb-4 font-raleway underline decoration-primary">
      It's an app for saving work hours and work details 😊
    </p>
    <h2 class="font-sora font-bold text-2xl">Search on date</h2>
    <p class="mb-4 font-raleway">
      On the work page. You can search on a date in the search field over the
      work table
    </p>
    <h2 class="font-sora font-bold text-2xl">
      Saving work hours and work details
    </h2>
    <p class="mb-4 font-raleway">
      On the work page. You will get an overview of all your work hours and work
      details. You can also save your work hours and work detail, by entering
      the start time, end time and work details in the form.
    </p>
  </div>
</template>

<script>
import Heading from "@/components/layout/Heading.vue";
export default {
  components: {
    Heading,
  },
};
</script>
