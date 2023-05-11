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
                    v-model="item.fio"
                    label="ФИО"
                    clearable
                >
                </v-text-field>
                <v-text-field
                    align="center"
                    v-model="item.salary"
                    label="Оклад"
                    clearable
                >
                </v-text-field>
                <!--                <v-text-field
                                    align="center"
                                    v-model="item.createdDate"
                                    label="Дата трудоустройства"
                                    clearable
                                >
                                </v-text-field>-->
                <v-text-field
                    align="center"
                    v-model="item.address"
                    label="Адрес"
                    clearable
                >
                </v-text-field>
                <v-text-field
                    align="center"
                    v-model="item.phoneNumber"
                    label="Номер телефона"
                    clearable
                >
                </v-text-field>
                <v-select
                    v-model="item.positionId"
                    :items="positions"
                    item-text="name"
                    item-value="id"
                    label="Выберите должность"
                ></v-select>
              </v-col>
            </v-row>
          </v-container>

          <v-card-actions class="justify-end">
            <v-btn color="primary" @click="saveEmployee()">Сохранить</v-btn>
            <v-btn color="primary" @click="dialog = false">Отменить</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>

    <v-row>
      <v-col md12>
        <v-card-text align="center" class="text-h4 font-weight-bold">Сотрудники</v-card-text>
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
              <td align="center">{{ item.fio }}</td>
              <td align="center">{{ item.salary }}</td>
              <!--              <td align="center">{{ item.createdDate }}</td>-->
              <td align="center">{{ item.address }}</td>
              <td align="center">{{ item.phoneNumber }}</td>
              <td align="center">{{ item.position }}</td>
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
  name: "Employee",
  mounted() {
    this.getItems();
    this.getStaffes();
  },
  data() {
    return {
      headers: [
        //{text: "ID", value: "id", sort: true, align: "center"},
        {text: "ФИО", value: "fio", sort: true, align: "center"},
        {text: "Оклад", value: "salary", sort: true, align: "center"},
        //{text: "Дата трудоустройства", value: "createdDate", sort: true, align: "center"},
        {text: "Адрес", value: "address", sort: true, align: "center"},
        {text: "Номер телефона", value: "phoneNumber", sort: true, align: "center"},
        {text: "Должность", value: "position", sort: true, align: "center"},
        {text: "Действия", value: "action", sort: true, align: "center"},
      ],
      items: [],
      search: undefined,
      dialog: false,
      item: {
        id: undefined,
        fio: undefined,
        salary: undefined,
        createdDate: undefined,
        address: undefined,
        phoneNumber: undefined,
        position: undefined,
        positionId: undefined,
      },
      positions: [],
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
      api.post("/api/staff/delete/" + this.deletedItem)
          .then(
              r => this.message = r.data
          ).finally(() => {
            if (this.message !== undefined && this.message !== '') {
              this.messageDialog = true
            }
            this.deleteDialog = false;
            this.getItems();
          }
      )
    },
    saveEmployee() {
      if (this.isCreate) {
        api.post("/api/staff/add", this.item)
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
        api.post("/api/staff/update", this.item)
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
      api.get("/api/staff/all").then(
          response => {
            console.log(response)
            this.items = response.data
          }
      )
    },
    getStaffes() {
      api.get("/api/position/all").then(
          response => {
            console.log(response)
            this.positions = response.data
          }
      )
    }
  }
}
</script>

<style scoped>

</style>