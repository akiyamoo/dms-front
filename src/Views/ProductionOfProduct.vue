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
            <span class="text-md-h6 font-weight-bold">Форма производства продукции</span>
            <v-spacer></v-spacer>
          </v-card-title>
          <v-container grid-list-md>
            <v-row justify="center">
              <v-col md="10">
                <v-select
                    v-model="item.productId"
                    :items="products"
                    item-text="name"
                    item-value="id"
                    label="Выберите продукт"
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
                    v-model="item.createdDate"
                    label="Дата производства"
                    clearable
                >
                </v-text-field>
              </v-col>
            </v-row>
          </v-container>

          <v-card-actions class="justify-end">
            <v-btn color="primary" @click="saveProductionOfProduct()">Сохранить</v-btn>
            <v-btn color="primary" @click="dialog = false">Отменить</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>

    <v-row>
      <v-col md12>
        <v-card-text align="center" class="text-h4 font-weight-bold">Производство продукции</v-card-text>
      </v-col>
    </v-row>

    <v-row class="justify-end">
      <v-btn class="mr-5" @click="createItem()">Создать</v-btn>
<!--      <v-btn @click="getItems()">Обновить</v-btn>-->
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
              <td align="center">{{ item.productName }}</td>
              <td align="center">{{ item.employeeName }}</td>
              <td align="center">{{ item.amount }}</td>
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
  name: "ProductionOfProduct",
  mounted() {
    this.getItems();
    this.getProducts();
    this.getEmployees();
  },
  data() {
    return {
      headers: [
        //{text: "ID", value: "id", sort: true, align: "center"},
        {text: "Название продукции", value: "productName", sort: true, align: "center"},
        {text: "ФИО сотрудника", value: "employeeName", sort: true, align: "center"},
        {text: "Количество", value: "amount", sort: true, align: "center"},
        {text: "Дата производства", value: "createdDate", sort: true, align: "center"},
        {text: "Действия", value: "action", sort: true, align: "center"}
      ],
      items: [
        // TODO
      ],
      search: undefined,
      dialog: false,
      item: {
        id: undefined,
        productName: undefined,
        productId: undefined,
        amount: undefined,
        createdDate: undefined,
        employeeName: undefined,
        employeeId: undefined,
      },
      products: [],
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
    saveProductionOfProduct() {
      // TODO
      this.dialog = false;
    },
    getItems() {
      // TODO
      this.items = [
        {
          id: 1,
          productName: "Жаренная рыба",
          productId: 1,
          amount: 1000,
          sum: 2000,
          createdDate: Date.now(),
          employeeName: 'Eldar',
          employeeId: 1
        }
      ]
    },
    getProducts() {
      // TODO
      this.products = [
        {id: 1, name: 'Жаренная рыба'},
        {id: 2, name: 'Сгущёнка'}
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