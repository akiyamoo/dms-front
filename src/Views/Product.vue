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
                    v-model="item.name"
                    label="Название продукции"
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
                    v-model="item.measurementId"
                    :items="measurements"
                    item-text="name"
                    item-value="id"
                    label="Выберите тип измерения"
                ></v-select>
              </v-col>
            </v-row>
          </v-container>

          <v-card-actions class="justify-end">
            <v-btn color="primary" @click="saveProduct()">Сохранить</v-btn>
            <v-btn color="primary" @click="dialog = false">Отменить</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>

    <v-row>
      <v-col md12>
        <v-card-text align="center" class="text-h4 font-weight-bold">Готовая продукции</v-card-text>
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
              <td align="center">{{ item.name }}</td>
              <td align="center">{{ item.measurement }}</td>
              <td align="center">{{ item.amount }}</td>
              <td align="center">{{ item.sum }}</td>
              <td align="center">
                <v-btn class="mr-5" small @click="editItem(item)">
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-btn small @click="deleteItem(item)">
                  <v-icon>mdi-delete</v-icon>
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
  name: "Product",
  mounted() {
    this.getItems();
    this.getMeasurements();
  },
  data() {
    return {
      headers: [
        //{text: "ID", value: "id", sort: true, align: "center"},
        {text: "Название", value: "name", sort: true, align: "center"},
        {text: "Тип измерения", value: "measurement", sort: true, align: "center"},
        {text: "Количество", value: "amount", sort: true, align: "center"},
        {text: "Сумма", value: "sum", sort: true, align: "center"},
        {text: "Действия", value: "action", sort: true, align: "center"}
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
        measurement: undefined,
        measurementId: undefined,
      },
      measurements: [],
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
    deleteItem(itemOriginal) {
      this.deleteDialog = true;
      this.deletedItem = itemOriginal.id
    },
    deleteConfirm() {
      api.post("/api/product/delete/" + this.deletedItem)
          .then(
              r => this.message = r.data
          ).finally(() => {
            this.deleteDialog = false;
            this.getItems();
          }
      )
    },
    saveProduct() {
      if (this.isCreate) {
        api.post("/api/product/add", this.item)
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
      } else {
        api.post("/api/product/update", this.item)
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
      }
    },
    getItems() {
      api.get("/api/product/all").then(
          response => {
            console.log(response)
            this.items = response.data
          }
      )
    },
    getMeasurements() {
      api.get("/api/measurement/all").then(
          response => {
            console.log(response)
            this.measurements = response.data
          }
      )
    }
  }
}
</script>

<style scoped>

</style>