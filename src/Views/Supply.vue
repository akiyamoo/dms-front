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
            <span class="text-md-h6 font-weight-bold">Создание\редактирование сырья</span>
            <v-spacer></v-spacer>
          </v-card-title>
          <v-container grid-list-md>
            <v-row justify="center">
              <v-col md="10">
                <v-text-field
                    align="center"
                    v-model="item.name"
                    label="Название сырья"
                    clearable
                >
                </v-text-field>
                <v-text-field
                    align="center"
                    v-model="item.amount"
                    label="Количество"
                    clearable
                >
                </v-text-field>
                <v-text-field
                    align="center"
                    v-model="item.sum"
                    label="Сумма"
                    clearable
                >
                </v-text-field>
                <v-select
                    v-model="item.measurmentId"
                    :items="measurments"
                    item-text="name"
                    item-value="id"
                    label="Выберите тип измерения"
                ></v-select>
              </v-col>
            </v-row>
          </v-container>

          <v-card-actions class="justify-end">
            <v-btn color="primary" @click="saveSupply()">Сохранить</v-btn>
            <v-btn color="primary" @click="dialog = false">Отменить</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>

    <v-row>
      <v-col md12>
        <v-card-text align="center" class="text-h4 font-weight-bold">Форма сырья</v-card-text>
      </v-col>
    </v-row>

    <v-row class="justify-end">
      <v-btn class="mr-5" @click="createItem()">Создать</v-btn>
      <v-btn @click="getItems()">Обновить</v-btn>
    </v-row>

    <v-row>
      <v-col md12>
        <v-data-table
            :headers="headers"
            :items="items"
            class="elevation-1"
            :search="search"
            :footer-props="{itemsPerPageText: 'Кол-во записей', 'items-per-page-all-text': 'Все'}"
            item-key="id"
            align="center"
        >
          <template v-slot:top>
            <v-text-field
                v-model="search"
                label="Поиск"
                class="mx-md-4"
            ></v-text-field>
          </template>
          <template v-slot:body="{ items }">
            <tbody>
            <tr v-for="item in items" :key="item.id">
              <td align="center">{{ item.name }}</td>
              <td align="center">{{ item.measurmentName }}</td>
              <td align="center">{{ item.amount }}</td>
              <td align="center">{{ item.sum }}</td>
              <td align="center">
                <v-btn small @click="editItem(item)">
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </td>
            </tr>
            </tbody>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Supply",
  mounted() {
    this.getItems();
    this.getMeasurments();
  },
  data() {
    return {
      headers: [
        //{text: "ID", value: "id", sort: true, align: "center"},
        {text: "Название", value: "name", sort: true, align: "center"},
        {text: "Тип измерения", value: "salary", sort: true, align: "center"},
        {text: "Количество", value: "createdDate", sort: true, align: "center"},
        {text: "Сумма", value: "address", sort: true, align: "center"},
      ],
      items: [
        // TODO
      ],
      search: undefined,
      dialog: false,
      item: {
        id: undefined,
        name: undefined,
        amount: undefined,
        sum: undefined,
        measurmentName: undefined,
        measurmentId: undefined,
      },
      measurments: []
    }
  },
  methods: {
    createItem() {
      this.dialog = true;
      for (let key of Object.keys(this.item)) {
        this.item[key] = undefined
      }
    },
    editItem(itemOriginal) {
      this.dialog = true;
      for (let key of Object.keys(this.item)) {
        this.item[key] = itemOriginal[key]
      }
    },
    saveSupply() {
      // TODO
      this.dialog = false;
    },
    getItems() {
      // TODO
      this.items = [
        {
          id: 1,
          name: "Eldar",
          amount: 1000,
          sum: 2000,
          measurmentName: 'Кг',
          measurmentId: 1
        }
      ]
    },
    getMeasurments() {
      // TODO
      this.measurments = [
        {id: 1, name: 'Кг'},
        {id: 2, name: 'Литр'}
      ]
    }
  }
}
</script>

<style scoped>

</style>