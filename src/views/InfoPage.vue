<template>
  <div>
    <LogOutHeader />
    <v-container class="mt-5">
      <h1>Hva er SUNGA?</h1>
      <p>
        En app for arbeids loggføring og litt til
        <span style="font-size: 20px">&#128516;</span>
      </p>
      <h3>Arbeids loggføring</h3>
      <p>
        På siden (Bruker side) får du oversikt over alle dine arbeids dager, du
        kan også lagre en arbeids dag ved og fylle ut skjemaet som er på (Bruker
        side) siden.
      </p>
      <div>
        <h3>Selskaps oversikt</h3>
        <span style="color: #7e57c2"
          >Denne funksjonen er under utvikling og er ikke tilgjengelig</span
        >
      </div>
      <p>
        På siden (Selskaper) får du oversikt over alle selskaper, du kan også
        lagre et selskap ved og fylle ut skjemaet som er på (Selskaper) siden.
      </p>
    </v-container>
  </div>
</template>

<script>
import LogOutHeader from "../components/LogOutHeader.vue";
export default {
  components: {
    LogOutHeader,
  },
  data() {
    return {};
  },
};
</script>