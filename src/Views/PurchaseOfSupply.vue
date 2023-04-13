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
                <v-select
                    v-model="item.supplyId"
                    :items="supplies"
                    item-text="name"
                    item-value="id"
                    label="Выберите сырье"
                ></v-select>
                <v-select
                    v-model="item.employeeId"
                    :items="employees"
                    item-text="name"
                    item-value="id"
                    label="Выберите сотрудника"
                ></v-select>
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
                <v-text-field
                    align="center"
                    v-model="item.createdDate"
                    label="Дата закупки"
                    clearable
                >
                </v-text-field>
              </v-col>
            </v-row>
          </v-container>

          <v-card-actions class="justify-end">
            <v-btn color="primary" @click="savePurchaseOfSupply()">Сохранить</v-btn>
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
              <td align="center">{{ item.supplyName }}</td>
              <td align="center">{{ item.employeeName }}</td>
              <td align="center">{{ item.amount }}</td>
              <td align="center">{{ item.sum }}</td>
              <td align="center">{{ item.createdDate }}</td>
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
  name: "PurchaseOfSupply",
  mounted() {
    this.getItems();
    this.getSupplies();
    this.getEmployees();
  },
  data() {
    return {
      headers: [
        //{text: "ID", value: "id", sort: true, align: "center"},
        {text: "Название сырья", value: "supplyName", sort: true, align: "center"},
        {text: "ФИО сотрудника", value: "employeeName", sort: true, align: "center"},
        {text: "Количество", value: "createdDate", sort: true, align: "center"},
        {text: "Сумма", value: "address", sort: true, align: "center"},
        {text: "Дата закупки", value: "createdDate", sort: true, align: "center"},
      ],
      items: [
        // TODO
      ],
      search: undefined,
      dialog: false,
      item: {
        id: undefined,
        supplyName: undefined,
        supplyId: undefined,
        amount: undefined,
        sum: undefined,
        createdDate: undefined,
        employeeName: undefined,
        employeeId: undefined,
      },
      supplies: [],
      employees: [],
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
    savePurchaseOfSupply() {
      // TODO
      this.dialog = false;
    },
    getItems() {
      // TODO
      this.items = [
        {
          id: 1,
          supplyName: "Молоко",
          supplyId: 1,
          amount: 1000,
          sum: 2000,
          createdDate: Date.now(),
          employeeName: 'Eldar',
          employeeId: 1
        }
      ]
    },
    getSupplies() {
      // TODO
      this.supplies = [
        {id: 1, name: 'Молоко'},
        {id: 2, name: 'Рыба'}
      ]
    },
    getEmployees() {
      // TODO
      this.employees = [
        {id: 1, name: 'Eldar'},
        {id: 2, name: 'Aizat'}
      ]
    }
  }
}
</script>

<style scoped>

</style>