<template>
  <div
    class="
      container
      mx-auto
      px-4
      mt-12
      flex
      justify-center
      flex-col
      md:items-center
    "
  >
    <div v-if="workAdded">
      <Alert message="No work added yet" :alertClass="'alert-info'" />
    </div>

    <div v-else>
      <div class="mb-3 md:flex">
        <div class="font-raleway md:mr-10">
          <label class="label">
            <span class="label-text font-raleway">Search date</span>
          </label>
          <input
            type="date"
            placeholder="Type here"
            class="input input-bordered w-full border-primary"
            v-model="searchDate"
          />
        </div>
        <!-- page select -->
        <div>
          <label class="label">
            <span class="label-text font-raleway">Page size</span>
          </label>
          <select
            class="select select-primary w-[5rem] font-raleway"
            v-model="pageCount"
          >
            <option v-for="(pageA, pageIndex) in pageArray" :key="pageIndex">
              {{ pageA }}
            </option>
          </select>
        </div>
      </div>

      <!-- desktop table -->
      <div class="desktop-table">
        <table
          class="
            w-full
            flex flex-row flex-no-wrap
            sm:bg-white
            rounded-lg
            overflow-hidden
            sm:shadow-lg
            my-5
          "
        >
          <thead class="text-white">
            <tr
              class="
                bg-primary
                flex flex-col flex-no
                wrap
                sm:table-row
                rounded-l-lg
                sm:rounded-none
                mb-2
                sm:mb-0
              "
            >
              <th class="p-3 text-left">Date</th>
              <th class="p-3 text-left">Start time</th>
              <th class="p-3 text-left">End time</th>
              <th class="p-3 text-left">Details</th>
            </tr>
          </thead>
          <tbody
            class="flex-1 sm:flex-none"
            v-for="table in paginationArray"
            :key="table.id"
          >
            <tr class="flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0">
              <td class="border-grey-light border p-3">
                {{ table.workDate }}
              </td>
              <td class="border-grey-light border p-3 truncate">
                {{ table.workStartTime }}
              </td>
              <td class="border-grey-light border p-3">
                {{ table.workEndTime }}
              </td>
              <td class="border-grey-light border p-3">
                {{ table.workDetails }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- mobile table -->
      <div class="mobile-table">
        <table
          v-for="table in paginationArray"
          :key="table.id"
          class="
            w-full
            flex flex-row flex-no-wrap
            sm:bg-white
            rounded-lg
            overflow-hidden
            sm:shadow-lg
            my-5
          "
        >
          <thead class="text-white">
            <tr
              class="
                bg-primary
                flex flex-col flex-no
                wrap
                sm:table-row
                rounded-l-lg
                sm:rounded-none
                mb-2
                sm:mb-0
              "
            >
              <th class="p-3 text-left">Date</th>
              <th class="p-3 text-left">Start time</th>
              <th class="p-3 text-left">End time</th>
              <th class="p-3 text-left">Details</th>
            </tr>
          </thead>
          <tbody class="flex-1 sm:flex-none">
            <tr class="flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0">
              <td class="border-grey-light border p-3">
                {{ table.workDate }}
              </td>
              <td class="border-grey-light border p-3 truncate">
                {{ table.workStartTime }}
              </td>
              <td class="border-grey-light border p-3">
                {{ table.workEndTime }}
              </td>
              <td class="border-grey-light border p-3">
                {{ table.workDetails }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- pagiantion
         -->
      <div class="btn-group justify-center my-3 font-raleway">
        <button class="btn text-primary" @click="movePaginationStep('back')">
          «
        </button>
        <button class="btn">{{ page }}</button>
        <button class="btn text-primary" @click="movePaginationStep('next')">
          »
        </button>
      </div>
    </div>
  </div>
</template>

<script>
// components
import Alert from "@/components/layout/Alert.vue";
// utillity
import { mapGetters } from "vuex";
import axios from "axios";
export default {
  components: {
    Alert,
  },
  data() {
    return {
      tables: [],
      workAdded: false,
      searchDate: "",
      page: 1,
      pageCount: 5,
      pageArray: [5, 10, 15, 20],
    };
  },
  mounted() {
    this.getUserWorkTable();
  },
  methods: {
    // calculate the move step for the pagiantion
    movePaginationStep(stepDirection) {
      if (stepDirection == "back") {
        if (this.page != 1) {
          this.page--;
        }
      } else {
        if (this.page * this.pageCount < this.sortedDateTables.length) {
          this.page++;
        }
      }
    },
    // get all work tables for the loged in user
    async getUserWorkTable() {
      try {
        const response = await axios.get(
          "users/" + this.user.id + "?populate=work_tables",
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        if (response.data.work_tables.length === 0) {
          this.workAdded = true;
        } else {
          this.workAdded = false;
        }
        this.tables = response.data.work_tables.reverse();
      } catch (error) {}
    },
  },
  computed: {
    paginationArray() {
      let sliceStart = (this.page - 1) * this.pageCount;
      let sliceEnd = this.page * this.pageCount;
      return this.sortedDateTables.slice(sliceStart, sliceEnd);
    },
    ...mapGetters({
      user: "auth/user",
    }),
    // filter tables from search date
    sortedDateTables() {
      return this.tables.filter((table) => {
        return table.workDate.toLowerCase().match(this.searchDate);
      });
    },
  },
};
</script>

<style scoped>
html,
body {
  height: 100%;
}

@media (min-width: 640px) {
  table {
    display: inline-table !important;
  }

  thead tr:not(:first-child) {
    display: none;
  }
}

td:not(:last-child) {
  border-bottom: 0;
}

@media (max-width: 768px) {
  .desktop-table {
    display: none;
  }
}
@media (min-width: 768px) {
  .mobile-table {
    display: none;
  }
}
</style>