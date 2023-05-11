<template>
  <v-container grid-list-md text-xs-center>
    <div class="text-center">
      <v-dialog
          v-model="dialog"
          width="30vw"
      >
        <v-card>
          <v-card-title>
            <v-spacer></v-spacer>
            <span class="text-md-h6 font-weight-bold">Форма</span>
            <v-spacer></v-spacer>
          </v-card-title>
          <v-container grid-list-md>
            <v-row justify="center">
              <v-col md="10">
                <v-text-field
                    align="center"
                    v-model="item.sumOfBudget"
                    label="Сумма бюджета"
                    clearable
                >
                </v-text-field>
                <v-text-field
                    align="center"
                    v-model="item.percent"
                    label="Процент с продаж"
                    clearable
                >
                </v-text-field>
                <v-text-field
                    align="center"
                    v-model="item.bonus"
                    label="Процент за участие сотруднику"
                    clearable
                >
                </v-text-field>
              </v-col>
            </v-row>
          </v-container>

          <v-card-actions class="justify-end">
            <v-btn color="primary" @click="saveBudget()">Сохранить</v-btn>
            <v-btn color="primary" @click="dialog = false">Отменить</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>

    <v-row>
      <v-col md12>
        <v-card-text align="center" class="text-h4 font-weight-bold">Бюджет</v-card-text>
      </v-col>
    </v-row>

    <v-row class="justify-end">
      <v-btn class="mr-5" @click="editItem(items[0])">Редактировать</v-btn>
      <!--            <v-btn @click="getItems()">Обновить</v-btn>-->
    </v-row>

    <v-row>
      <v-col md12>
        <v-data-table
            :headers="headers"
            :items="items"
            class="elevation-1"
            :footer-props="{itemsPerPageText: 'Кол-во записей', 'items-per-page-all-text': 'Все'}"
            align="center"
        >
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import api from "@/plugins/axios";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Budget",
  mounted() {
    this.getItems();
  },
  data() {
    return {
      headers: [
        //{text: "ID", value: "id", sort: true, align: "center"},
        {text: "Сумма бюджета", value: "sumOfBudget", sort: true, align: "center"},
        {text: "Процент с продаж", value: "percent", sort: true, align: "center"},
        {text: "Процент за участие сотруднику", value: "bonus", sort: true, align: "center"},
      ],
      items: [
        // TODO
      ],
      dialog: false,
      item: {
        id: undefined,
        sumOfBudget: undefined,
        percent: undefined,
        bonus: undefined,
      },
      isCreate: false,
      message: undefined,
      deletedItem: undefined,
      deleteDialog: false,
      messageDialog: false
    }
  },
  methods: {
    createItem() {
      this.dialog = true;
      this.isCreate = true;
      for (let key of Object.keys(this.item)) {
        this.item[key] = undefined
      }
    },
    editItem(itemOriginal) {
      this.dialog = true;
      this.isCreate = false;
      for (let key of Object.keys(this.item)) {
        this.item[key] = itemOriginal[key]
      }
    },
    saveBudget() {
      api.post("/api/budget/update", this.item)
          .then(r => {
            this.message = r.data
          }).finally(
          () => {
            this.dialog = false
            if (this.message !== undefined && this.message !== '') {
              this.messageDialog = true
            }
            this.getItems();
          }
      )
    },
    getItems() {
      api.get("/api/budget/all").then(
          response => {
            console.log(response)
            this.items = response.data
          }
      )
    },
  }
}
</script>

<style scoped>

</style>