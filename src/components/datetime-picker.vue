<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="6">
        <v-menu v-model="menu" :close-on-content-click="false" :nudge-right="40" >
          <template v-slot:activator="{ on }">
            <v-text-field v-model="dateFormatted" label="Дата" prepend-icon="mdi-calendar" v-on="on"></v-text-field>
          </template>
          <v-date-picker v-model="dateFormatted" @input="menu = false"></v-date-picker>
        </v-menu>
      </v-col>
      <v-col cols="12" md="6">
        <v-menu v-model="timeMenu" :close-on-content-click="false" :nudge-right="40" >
          <template v-slot:activator="{ on }">
            <v-text-field v-model="timeFormatted" label="Время" prepend-icon="mdi-clock" readonly v-on="on"></v-text-field>
          </template>
          <v-time-picker v-model="timeFormatted" @input="timeMenu = false"></v-time-picker>
        </v-menu>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "datetime-picker",
  props: {
    value: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      menu: false,
      timeMenu: false,
      dateFormatted: this.value ? this.value.substr(0, 10) : new Date().toISOString().substr(0, 10),
      timeFormatted: this.value ? this.value.substr(11, 5) : null
    }
  },
  computed: {
  },
  watch: {
    value(newValue) {
      this.dateFormatted = newValue ? newValue.substr(0, 10) : new Date().toISOString().substr(0, 10);
      this.timeFormatted = newValue ? newValue.substr(11, 5) : null;
    },
    dateFormatted(newValue) {
      this.$emit('input', `${newValue} ${this.timeFormatted || '00:00'}`);
    },
    timeFormatted(newValue) {
      this.$emit('input', `${this.dateFormatted} ${newValue}`);
    },
  },
}
</script>

<style scoped>

</style>