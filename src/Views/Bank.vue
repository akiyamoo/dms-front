<template>
  <v-container grid-list-md text-xs-center>

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
          v-model="planDialog"
          width="70vw"
      >
        <v-card>
          <v-card-title>
            <v-spacer></v-spacer>
            <span class="text-md-h6 font-weight-bold">План выплат по кредиту</span>
            <v-spacer></v-spacer>
          </v-card-title>
          <v-row>
            <v-col md6>
              <v-data-table
                  :headers="paymentHeaders"
                  :items="payments"
                  class="elevation-1"
                  :search="search"
                  :footer-props="{ itemsPerPageText: 'Кол-во записей', 'items-per-page-all-text': 'Все' }"
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
                    <td align="center">{{ item.paymentDate }}</td>
                    <td align="center">{{ item.loanDate }}</td>
                    <td align="center">{{ item.paymentAmount }}</td>
                    <td align="center">{{ item.penaltyAmount }}</td>
                    <td align="center">{{ item.isPaid }}</td>
                  </tr>
                  </tbody>
                </template>
              </v-data-table>
            </v-col>
          </v-row>
          <v-card-actions class="justify-center">
            <v-btn color="primary" @click="planDialog = false">Закрыть</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>

    <div class="text-center">
      <v-dialog
          v-model="payDialog"
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
                    v-model="itemPayment.paymentAmount"
                    label="Сумма оплаты (без пени)"
                    clearable
                    :disabled="true"
                >
                </v-text-field>
                <v-text-field
                    align="center"
                    v-model="itemPayment.loanDate"
                    label="Дата заданной выплаты"
                    clearable
                    :disabled="true"
                >
                </v-text-field>
                <v-dialog
                    ref="dialog"
                    v-model="modal"
                    persistent
                    width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                        v-model="itemPayment.paymentDate"
                        label="Дата выплаты"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                      v-model="itemPayment.paymentDate"
                      scrollable
                  >
                    <v-spacer></v-spacer>
                    <v-btn
                        text
                        color="primary"
                        @click="modal = false"
                    >
                      OK
                    </v-btn>
                  </v-date-picker>
                </v-dialog>
              </v-col>
            </v-row>
          </v-container>

          <v-card-actions class="justify-end">
            <v-btn color="primary" @click="payCredit()">Оплатить</v-btn>
            <v-btn color="primary" @click="payDialog = false">Отменить</v-btn>
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
                    v-model="item.target"
                    label="Цель (название) кредита"
                    clearable
                >
                </v-text-field>
                <v-text-field
                    align="center"
                    v-model="item.sumLoan"
                    label="Сумма кредита"
                    clearable
                >
                </v-text-field>
                <v-text-field
                    align="center"
                    v-model="item.percentLoan"
                    label="Процент годовых"
                    clearable
                >
                </v-text-field>
                <v-text-field
                    align="center"
                    v-model="item.percentPenalty"
                    label="Процент пени"
                    clearable
                >
                </v-text-field>
                <v-text-field
                    align="center"
                    v-model="item.countYear"
                    label="Срок кредита (в годах)"
                    clearable
                >
                </v-text-field>
                <v-dialog
                    ref="dialog"
                    v-model="modal"
                    persistent
                    width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                        v-model="item.loanDate"
                        label="Дата выдачи кредита"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                      v-model="item.loanDate"
                      scrollable
                  >
                    <v-spacer></v-spacer>
                    <v-btn
                        text
                        color="primary"
                        @click="modal = false"
                    >
                      OK
                    </v-btn>
                  </v-date-picker>
                </v-dialog>
              </v-col>
            </v-row>
          </v-container>

          <v-card-actions class="justify-end">
            <v-btn color="primary" @click="addCredit()">Сохранить</v-btn>
            <v-btn color="primary" @click="dialog = false">Отменить</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>

    <v-row>
      <v-col md12>
        <v-card-text align="center" class="text-h4 font-weight-bold">Кредиты</v-card-text>
      </v-col>
    </v-row>

    <v-row class="justify-end">
      <v-btn class="mr-5" @click="createItem()">Создать кредит</v-btn>
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
              <td align="center">{{ item.target }}</td>
              <td align="center">{{ item.sumLoan }}</td>
              <td align="center">{{ item.loanDate }}</td>
              <td align="center">{{ item.percentLoan }}</td>
              <td align="center">{{ item.percentPenalty }}</td>
              <td align="center">{{ item.sumRemaining }}</td>
              <td align="center">{{ item.countYear }}</td>
              <td align="center">{{ item.isPaid }}</td>
              <td align="center" style="display: flex">
                <v-btn class="mr-5" small @click="getPayments(item.id)">
                  <v-icon>mdi-check</v-icon>
                </v-btn>
                <v-btn class="mr-5" small @click="getCurrentPayment(item.id)">
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
import api from "@/plugins/axios";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Bank",
  mounted() {
    this.getItems();
  },
  data() {
    return {
      headers: [
        //{text: "ID", value: "id", sort: true, align: "center"},
        {text: "Цель (название) кредита", value: "target", sort: true, align: "center"},
        {text: "Сумма кредита", value: "sumLoan", sort: true, align: "center"},
        {text: "Дата выдачи кредита", value: "loanDate", sort: true, align: "center"},
        {text: "Процент годовых", value: "percentLoan", sort: true, align: "center"},
        {text: "Процент пени", value: "percentPenalty", sort: true, align: "center"},
        {text: "Остаток суммы", value: "sumRemaining", sort: true, align: "center"},
        {text: "Срок кредита (в годах)", value: "countYear", sort: true, align: "center"},
        {text: "Статус", value: "isPaid", sort: true, align: "center"},
      ],
      paymentHeaders: [
        //{text: "ID", value: "id", sort: true, align: "center"},
        {text: "Дата фактического платежа", value: "paymentDate", sort: true, align: "center"},
        {text: "Дата планируемого платежа", value: "loanDate", sort: true, align: "center"},
        {text: "Сумма выплаты по кредиту", value: "paymentAmount", sort: true, align: "center"},
        {text: "Пени", value: "penaltyAmount", sort: true, align: "center"},
        {text: "Статус", value: "percentPenalty", sort: true, align: "center"}
      ],
      items: [],
      search: undefined,
      dialog: false,
      item: {
        id: undefined,
        target: undefined,
        sumLoan: undefined,
        loanDate: undefined,
        percentLoan: undefined,
        percentPenalty: undefined,
        sumRemaining: undefined,
        countYear: undefined,
        isPaid: undefined,
      },
      payments: [],
      payment: undefined,
      itemPayment: {
        id: undefined,
        creditId: undefined,
        paymentDate: undefined,
        loanDate: undefined,
        paymentAmount: undefined,
        penaltyAmount: undefined,
        isPaid: undefined
      },
      message: undefined,
      messageDialog: false,
      planDialog: false,
      payDialog: false,
      modal: false
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
    addCredit() {
      api.post("/api/bank/add-credit", this.item)
          .then(r => {
            this.message = r.data
          })
          .catch(r => {
            console.log(r)
            this.message = r.response.data
            this.messageDialog = true;
          })
          .finally(
              () => {
                this.dialog = false
                this.getItems();
              }
          )
    },
    getCurrentPayment(creditId) {
      api.get("/api/bank/current/" + creditId)
          .then(r => {
            this.itemPayment = r.data
            this.payDialog = true;
          })
          .catch(r => {
            console.log(r)
            this.message = r.response.data
            this.messageDialog = true;
          })
    },
    payCredit() {
      api.post("/api/bank/pay-credit/" + this.itemPayment.id + "/" + this.itemPayment.paymentDate)
          .then(r => {
            this.message = r.data
          })
          .catch(r => {
            console.log(r)
            this.message = r.response.data
            this.messageDialog = true;
          })
          .finally(
              () => {
                this.payDialog = false
                this.getItems();
              }
          )
    },
    getItems() {
      api.get("/api/bank/all").then(
          response => {
            console.log(response)
            this.items = response.data
          }
      )
    },
    getPayments(creditId) {
      api.get("/api/bank/plan/" + creditId).then(
          response => {
            console.log(response)
            this.payments = response.data
            this.planDialog = true;
          }
      )
    }
  }
}
</script>

<style scoped>

</style>