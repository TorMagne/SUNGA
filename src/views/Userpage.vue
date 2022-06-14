<template>
  <v-card>
    <table v-for="(item, index) in table" :key="index">
      <tr>
        <th>Dato</th>
        <th>Start tid</th>
        <th>Slutt tid</th>
        <th>Arbeids detaljer</th>
      </tr>
      <tr>
        <td>{{ item.workDate }}</td>
        <td>{{ item.workStartTime }}</td>
        <td>{{ item.workEndTime }}</td>
        <td>{{ item.workDetails }}</td>
      </tr>
    </table>
    <pre>{{ table }}</pre>
  </v-card>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      user: {},
      table: [],
      headers: [
        { text: "Dato", value: "workDate" },
        { text: "Start tid", value: "workStartTime" },
        { text: "Slutt tid", value: "workEndTime" },
        { text: "Jobb detaljer", value: "workDetails" },
      ],
    };
  },
  async mounted() {
    this.sliceTable();
    this.getUserWorkTable();
  },
  methods: {
    sliceTable() {
      this.table.forEach((tab) => {
        let troll = tab.workStartTime.slice(0.5);
        console.log(troll);
      });
    },
    async getUserWorkTable() {
      this.user = JSON.parse(window.localStorage.getItem("userData"));
      try {
        const response = await axios.get(
          process.env.VUE_APP_API_URL +
            "users/" +
            this.user.id +
            "?populate=work_tables",
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("jwt"),
            },
          }
        );
        this.table = response.data.work_tables.reverse();
      } catch (error) {
        this.error = error;
      }
    },
  },
};
</script>