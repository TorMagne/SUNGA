<template>
  <div class="container mx-auto px-4">
    <div v-if="isError">
      <Alert
        message="Something went wrong when trying to get users work days"
        :alertClass="'alert-error'"
        class="mt-5"
      />
    </div>
    <div v-else>
      <div class="mb-3 md:flex">
        <!-- date search -->
        <div class="font-raleway md:mr-10 mt-8 md:mt-0">
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
      <div class="desktop-table hidden md:block font-sora">
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
              <th class="p-3 text-left">Edit</th>
              <th class="p-3 text-left">User</th>
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
                <button
                  class="btn btn-info btn-sm"
                  @click="$refs.editUser.openDialog(table)"
                >
                  Edit
                </button>
              </td>
              <td class="border-grey-light border p-3">
                {{ table.attributes.user.data.attributes.username }}
              </td>
              <td class="border-grey-light border p-3">
                {{ table.attributes.workDate }}
              </td>
              <td class="border-grey-light border p-3 truncate">
                {{ table.attributes.workStartTime }}
              </td>
              <td class="border-grey-light border p-3">
                {{ table.attributes.workEndTime }}
              </td>
              <td class="border-grey-light border p-3">
                {{ table.attributes.workDetails }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div
        v-for="table in paginationArray"
        :key="table.id"
        class="card bg-white shadow-md mb-5 md:w-96 md:mb-0 md:hidden font-sora"
      >
        <div class="card-body w-full">
          <p>
            <span class="font-bold">User:</span>
            {{ table.attributes.user.data.attributes.username }}
          </p>
          <p>
            <span class="font-bold">Date:</span>
            {{ table.attributes.workDate }}
          </p>
          <p>
            <span class="font-bold">Start time:</span>
            {{ table.attributes.workStartTime }}
          </p>
          <p>
            <span class="font-bold">End time:</span>
            {{ table.attributes.workEndTime }}
          </p>
          <p>
            <span class="font-bold">Work details:</span>
            {{ table.attributes.workDetails }}
          </p>
          <div class="card-actions">
            <button
              class="btn btn-info"
              @click="$refs.editUser.openDialog(table)"
            >
              Edit
            </button>
          </div>
        </div>
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
    <EditUserWorkTable
      ref="editUser"
      @childParentConnection="getAllWorkTables()"
    />
  </div>
</template>

<script>
// utility
import axios from "axios";
// components
import Alert from "@/components/layout/Alert.vue";
import EditUserWorkTable from "@/components/layout/adminLayout/modals/EditUserWork.vue";
export default {
  components: {
    Alert,
    EditUserWorkTable,
  },
  data() {
    return {
      isError: false,
      workTables: [],
      searchDate: "",
      page: 1,
      pageCount: 5,
      pageArray: [5, 10, 15, 20],
    };
  },
  mounted() {
    this.getAllWorkTables();
  },
  methods: {
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
    // get all jobs made
    async getAllWorkTables() {
      let config = {
        method: "get",
        url: "work-tables?populate=*",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      };
      axios(config)
        .then((response) => {
          this.workTables = response.data.data.reverse();
        })
        .catch((error) => {
          this.isError = true;
        });
    },
  },
  computed: {
    paginationArray() {
      let sliceStart = (this.page - 1) * this.pageCount;
      let sliceEnd = this.page * this.pageCount;
      return this.sortedDateTables.slice(sliceStart, sliceEnd);
    },
    sortedDateTables() {
      return this.workTables.filter((table) => {
        return table.attributes.workDate.toLowerCase().match(this.searchDate);
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
</style>