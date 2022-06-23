<template>
  <div>
    <LogOutHeader />

    <v-container>
      <v-row style="margin-top: 1rem">
        <v-col md="6" offset-md="3">
          <h1 style="margin-bottom: 2rem">Lagre arbeids dag</h1>
          <v-form
            id="form"
            @submit="createWorkTable"
            style="margin-bottom: 3rem"
          >
            <v-row>
              <!-- work day -->
              <v-col md="12">
                <v-menu
                  ref="dayMenu"
                  v-model="dayMenu"
                  :close-on-content-click="false"
                  :return-value.sync="newWorkInfo.data.workDate"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="newWorkInfo.data.workDate"
                      label="Velg jobb dag"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      outlined
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="newWorkInfo.data.workDate"
                    no-title
                    scrollable
                  >
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="dayMenu = false">
                      Cancel
                    </v-btn>
                    <v-btn
                      text
                      color="primary"
                      @click="$refs.dayMenu.save(newWorkInfo.data.workDate)"
                    >
                      OK
                    </v-btn>
                  </v-date-picker>
                </v-menu>

                <!-- start work time -->
                <v-menu
                  ref="startMenu"
                  v-model="menu2"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  :return-value.sync="newWorkInfo.data.workStartTime"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="newWorkInfo.data.workStartTime"
                      label="Start tid"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      outlined
                    ></v-text-field>
                  </template>
                  <v-time-picker
                    v-if="menu2"
                    v-model="newWorkInfo.data.workStartTime"
                    full-width
                    @click:minute="
                      $refs.startMenu.save(newWorkInfo.data.workStartTime)
                    "
                    format="24hr"
                  ></v-time-picker>
                </v-menu>

                <!-- end work time -->
                <v-menu
                  ref="endMenu"
                  v-model="menu3"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  :return-value.sync="newWorkInfo.data.workEndTime"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="newWorkInfo.data.workEndTime"
                      label="Slutt tid"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      outlined
                    ></v-text-field>
                  </template>
                  <v-time-picker
                    v-if="menu3"
                    v-model="newWorkInfo.data.workEndTime"
                    full-width
                    @click:minute="
                      $refs.endMenu.save(newWorkInfo.data.workEndTime)
                    "
                    format="24hr"
                  ></v-time-picker>
                </v-menu>
                <!-- work details -->
                <v-textarea
                  v-model="newWorkInfo.data.workDetails"
                  name="workDetails"
                  filled
                  label="Jobb detaljer"
                  auto-grow
                  value=""
                  outlined
                ></v-textarea>
                <v-btn
                  type="submit"
                  elevation="0"
                  style="background-color: #7e57c2"
                  >Lagre</v-btn
                >
              </v-col>
            </v-row>
          </v-form>
          <!-- søk på dato -->
          <div class="d-flex flex-row align-baseline">
            <v-menu
              ref="searchDateMenu"
              v-model="searchDateMenu"
              :close-on-content-click="false"
              :return-value.sync="searchDate"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="searchDate"
                  label="Søk dato"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                  outlined
                ></v-text-field>
              </template>
              <v-date-picker v-model="searchDate" no-title scrollable>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="searchDateMenu = false">
                  Cancel
                </v-btn>
                <v-btn
                  text
                  color="primary"
                  @click="$refs.searchDateMenu.save(searchDate)"
                >
                  OK
                </v-btn>
              </v-date-picker>
            </v-menu>
            <v-btn
              style="height: 56px; background-color: #7e57c2; margin-left: 1rem"
              elevation="0"
              @click="resetSearchDate"
              >Reset</v-btn
            >
          </div>

          <input
            class="work-detail-search"
            type="text"
            v-model="searchWorkDetails"
            placeholder="søk arbeids detaljer"
          />
          <!-- jobb tabell -->

          <v-card>
            <v-card-title>
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Søk"
                single-line
                hide-details
              ></v-text-field>
            </v-card-title>
            <v-data-table
              :headers="headers"
              :items="sortedTables"
              :search="search"
            ></v-data-table>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>


<script>
import axios from "axios";
import LogOutHeader from "../components/LogOutHeader.vue";
export default {
  components: {
    LogOutHeader,
  },
  data() {
    return {
      user: {},
      tables: [],
      searchDate: "",
      searchWorkDetails: "",
      search: "",
      headers: [
        { text: "Dato", value: "workDate" },
        { text: "Start tid", value: "workStartTime" },
        { text: "Slutt tid", value: "workEndTime" },
        { text: "Detaljer", value: "workDetails" },
      ],
      newWorkInfo: {
        data: {
          workDate: new Date(
            Date.now() - new Date().getTimezoneOffset() * 60000
          )
            .toISOString()
            .substr(0, 10),
          workStartTime: null,
          workEndTime: null,
          workDetails: "",
          user: null,
        },
      },
      dayMenu: false,
      searchDateMenu: false,
      startMenu: false,
      endMenu: false,
      menu2: false,
      menu3: false,
    };
  },
  async mounted() {
    this.getUserWorkTable();
  },
  methods: {
    resetForm() {
      this.newWorkInfo.data.workStartTime = "";
      this.newWorkInfo.data.workEndTime = "";
      this.newWorkInfo.data.workDetails = "";
    },
    resetSearchDate() {
      this.searchDate = "";
    },

    async createWorkTable(e) {
      e.preventDefault();

      let newData = this.newWorkInfo;

      let config = {
        method: "post",
        url: process.env.VUE_APP_API_URL + "work-tables",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
          "Content-Type": "application/json",
        },
        data: newData,
      };

      axios(config)
        .then((response) => {
          this.getUserWorkTable();
          this.resetForm();
        })
        .catch((error) => {
          console.log(error);
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
        this.tables = response.data.work_tables.reverse();
        this.newWorkInfo.data.user = response.data.id;
      } catch (error) {
        this.error = error;
      }
    },
  },
  computed: {
    sortedTables() {
      return this.tables
        .filter((table) => {
          return table.workDate.match(this.searchDate);
        })
        .filter((table) => {
          return table.workDetails.match(this.searchWorkDetails);
        });
    },
  },
};
</script>

<style scoped>
.dato-search,
.work-detail-search {
  border: 1px solid #7e57c2;
  border-radius: 5px;
  margin-block: 2rem;
  padding: 0.2rem 0 0.2rem 0.5rem;
}

.dato-search:focus {
  outline: 2px solid #7e57c2;
}
.v-application--is-ltr .v-btn__content .v-icon--left {
  margin-right: 0;
}
.v-text-field--outlined >>> fieldset {
  border-color: #7e57c2;
}
@media only screen and (max-width: 1263px) {
  .dato-search,
  .work-detail-search {
    margin-block: 1rem !important;
  }
}
</style>