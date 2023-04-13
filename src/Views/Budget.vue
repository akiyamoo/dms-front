<template>
  <v-container grid-list-md text-xs-center>
    <v-row>
      <v-col md12>
        <v-card-text align="center" class="text-h4 font-weight-bold">Форма бюджета</v-card-text>
      </v-col>
    </v-row>

    <v-row class="justify-end">
        <v-btn class="mr-5">Редактировать</v-btn>
        <v-btn>Обновить</v-btn>
    </v-row>

    <v-row>
      <v-col md12>
        <v-data-table
            :headers="headers"
            :items="items"
            class="elevation-1"
            :search="search"
            :footer-props="{itemsPerPageText: 'Кол-во записей', 'items-per-page-all-text': 'Все'}"
            align="center"
        >
          <template v-slot:top>
            <v-text-field
                v-model="search"
                label="Поиск"
                class="mx-md-4"
            ></v-text-field>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Budget",
  data() {
    return {
      headers: [
        //{text: "ID", value: "id", sort: true, align: "center"},
        {text: "Сумма бюджета", value: "sumOfBudget", sort: true, align: "center"},
        {text: "Процент с продаж", value: "percentOfSale", sort: true, align: "center"},
        {text: "Процент за участие сотруднику", value: "percentOfStaff", sort: true, align: "center"},
      ],
      items: [
        {id: "1", sumOfBudget: "100", percentOfSale: "5", percentOfStaff: "10"},
      ],
      search: undefined,

    }
  }
}
</script>

<style scoped>

</style>