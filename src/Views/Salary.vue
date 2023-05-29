<template>
  <v-container grid-list-md text-xs-center>
    <div class="text-center">
      <v-dialog
          v-model="deleteDialog"
          width="30vw"
      >
        <v-card>
          <v-card-title>
            <v-spacer></v-spacer>
            <span class="text-md-h6 font-weight-bold">Удаление ингредиента</span>
            <v-spacer></v-spacer>
          </v-card-title>
          <v-container grid-list-md>
            <v-row justify="center">
              <v-card-text style="font-size: 18px" align="center">Вы уверены?</v-card-text>
            </v-row>
          </v-container>

          <v-card-actions class="justify-center">
            <v-btn color="primary" @click="deleteConfirm">Да</v-btn>
            <v-btn color="primary" @click="deleteDialog = false">Нет,закрыть окно</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
    <div class="text-center">
      <v-dialog
          v-model="messageDialog"
          width="30vw"
      >
        <v-card>
          <v-card-title>
            <v-spacer></v-spacer>
            <span class="text-md-h6 font-weight-bold">Диалоговое окно</span>
            <v-spacer></v-spacer>
          </v-card-title>
          <v-container grid-list-md>
            <v-row justify="center">
              <v-card-text style="font-size: 18px" align="center">{{ message }}</v-card-text>
            </v-row>
          </v-container>

          <v-card-actions class="justify-center">
            <v-btn color="primary" @click="messageDialog = false">Закрыть</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
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
                    v-model="item.sumSalary"
                    label="Сумма выдачи"
                    clearable
                >
                </v-text-field>
              </v-col>
            </v-row>
          </v-container>

          <v-card-actions class="justify-end">
            <v-btn color="primary" @click="saveIngredient()">Сохранить</v-btn>
            <v-btn color="primary" @click="dialog = false">Отменить</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>

    <v-row>
      <v-col md12>
        <v-card-text align="center" class="text-h4 font-weight-bold">Зарплата</v-card-text>
      </v-col>
    </v-row>

    <v-row>
      <v-col class="d-flex justify-start" cols="5">
        <v-select
            class="caption mr-3"
            v-model="selectedYear"
            :items="years"
            label="Выберите год"
            solo
            dense
            @change="selected()"
        ></v-select>
        <v-select
            class="caption mr-3"
            v-model="selectedMonth"
            :items="month"
            label="Выберите месяц"
            solo
            dense
            @change="selected()"
        ></v-select>
        <!--        <v-btn @click="getProducts()">Обновить продукты</v-btn>-->
      </v-col>
      <v-col class="d-flex justify-end">
        <v-card-text
            align="center"
            class="font-weight-bold"
        >
          {{"Общая сумма выдачи: " + sum}}
        </v-card-text>
        <v-btn class="mr-5" @click="issue()">Выдать зарплату</v-btn>
        <!--        <v-btn :disabled="items.length === 0" @click="getItems(); getSupplies();">Обновить ингредиенты</v-btn>-->
      </v-col>
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
              <td align="center">{{ item.staff }}</td>
              <td align="center">{{ item.sumSalary }}</td>
              <td align="center">{{ item.purchaseCount }}</td>
              <td align="center">{{ item.productionCount }}</td>
              <td align="center">{{ item.saleCount }}</td>
              <td align="center">{{ item.sumCount }}</td>
              <td align="center">{{ item.bonus }}</td>
              <td align="center">{{ item.salary }}</td>
              <td align="center">{{ item.isIssued }}</td>
              <td align="center">
                <v-btn v-if="item.isIssued === 'Не выдано'" class="mr-5" small @click="editItem(item)">
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
import api from '@/plugins/axios'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Salary",
  mounted() {
    this.getItems();
  },
  data() {
    return {
      headers: [
        //{text: "ID", value: "id", sort: true, align: "center"},
        {text: "Сотрудник", value: "staff", sort: true, align: "center"},
        {text: "Общая сумма выплаты", value: "sumSalary", sort: true, align: "center"},
        {text: "Количество закупок", value: "purchaseCount", sort: true, align: "center"},
        {text: "Количество производств", value: "productionCount", sort: true, align: "center"},
        {text: "Количество продаж", value: "saleCount", sort: true, align: "center"},
        {text: "Общее количество", value: "sumCount", sort: true, align: "center"},
        {text: "Бонус", value: "bonus", sort: true, align: "center"},
        {text: "Оклад", value: "salary", sort: true, align: "center"},
        {text: "Выдана ли зарплата", value: "isIssued", sort: true, align: "center"},
      ],
      items: [],
      search: undefined,
      dialog: false,
      messageDialog: false,
      item: {
        staffId: undefined,
        staff: undefined,
        sumSalary: undefined,
        purchaseCount: undefined,
        productionCount: undefined,
        saleCount: undefined,
        sumCount: undefined,
        bonus: undefined,
        year: undefined,
        month: undefined,
        isIssued: undefined
      },
      years: [
        2023,
        2022,
        2021,
        2020,
        2019,
        2018,
        2017,
        2016,
        2015,
      ],
      month: [
        'Январь',
        'Февраль',
        'Март',
        'Май',
        'Июнь',
        'Июль',
        'Сентябрь',
        'Октябрь',
        'Ноябрь',
        'Декабрь'
      ],
      supplies: [],
      selectedYear: 2023,
      selectedMonth: 'Май',
      isCreate: false,
      message: undefined,
      deletedItem: undefined,
      deleteDialog: false,
      sum: 0
    }
  },
  methods: {
    createItem() {
      this.dialog = true;
      this.isCreate = true
      for (let key of Object.keys(this.item)) {
        this.item[key] = undefined
      }
    },
    editItem(itemOriginal) {
      this.dialog = true;
      this.isCreate = false
      for (let key of Object.keys(this.item)) {
        this.item[key] = itemOriginal[key]
      }
    },
    saveIngredient() {
      // TODO
      api.post("/api/salary/update/" + this.selectedYear + "/" + this.selectedMonth + "/" + this.item.staffId + "/" + this.item.sumSalary)
          .then(r => {
            this.message = r.data
          }).finally(
          () => {
            if (this.message !== undefined && this.message !== '') {
              this.messageDialog = true
            }
            if (this.message !== undefined && this.message === '') {
              this.dialog = false
            }
            this.getItems();
          }
      )
    },
    issue() {
      api.post("/api/salary/issue/" + this.selectedYear + "/" + this.selectedMonth)
          .then(r => {
            this.message = r.data
          }).finally(
          () => {
            if (this.message !== undefined && this.message !== '') {
              this.messageDialog = true
            }
            if (this.message !== undefined && this.message === '') {
              this.dialog = false
            }
            this.getItems();
          }
      )
    },
    getItems() {
      api.post("/api/salary/all/" + this.selectedYear + "/" + this.selectedMonth).then(
          response => {
            console.log(response)
            this.items = response.data
          }
      )
      this.getSum()
    },
    getSum() {
      api.post("/api/salary/sum/" + this.selectedYear + "/" + this.selectedMonth).then(
          response => {
            console.log(response)
            this.sum = response.data
            if (this.sum === undefined) this.sum = 0
          }
      )
    },
    selected() {
      this.getItems();
    }
  }
}
</script>

<style scoped>

</style>