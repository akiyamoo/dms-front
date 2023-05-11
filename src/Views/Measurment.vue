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
          width="40vw"
      >
        <v-card>
          <v-card-title>
            <v-spacer></v-spacer>
            <span class="text-md-h5 font-weight-bold">Форма</span>
            <v-spacer></v-spacer>
          </v-card-title>
          <v-container grid-list-md>
            <v-row justify="center">
              <v-col md="10">
                <v-text-field
                    align="center"
                    v-model="item.name"
                    label="Название типа измерения"
                    clearable
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>

          <v-card-actions class="justify-end">
            <v-btn color="primary" @click="saveMeasurment()">Сохранить</v-btn>
            <v-btn color="primary" @click="dialog = false">Отменить</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>

    <v-row>
      <v-col md12>
        <v-card-text align="center" class="text-h4 font-weight-bold">Единицы измерения</v-card-text>
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
            :footer-props="{itemsPerPageText: 'Кол-во записей', 'items-per-page-all-text': 'Все'}"
            align="center"
        >
          <template v-slot:body="{ items }">
            <tbody>
            <tr v-for="item in items" :key="item.id">
              <td align="center" class="pr-16">{{ item.name }}</td>
              <td align="center" class="truncate">
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
  name: "Measurement",
  mounted() {
    this.getItems();
  },
  data() {
    return {
      headers: [
        //{text: "ID", value: "id", sort: true, align: "center"},
        {text: "Тип измерения", value: "name", sort: true, align: "center"},
        {text: "Действия", value: "action", sort: true, align: "center"},
      ],
      items: [
        // TODO
      ],
      dialog: false,
      item: {
        id: undefined,
        name: undefined,
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
    deleteItem(itemOriginal) {
      this.deleteDialog = true;
      this.deletedItem = itemOriginal.id
    },
    deleteConfirm() {
      api.post("/api/measurement/delete/" + this.deletedItem)
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
    saveMeasurment() {
      if (this.isCreate) {
        api.post("/api/measurement/add", this.item)
            .then(r => {
              this.message = r.data
            }).finally(
            () => {
              if (this.message !== undefined && this.message !== '') {
                this.messageDialog = true
              }
              if (this.message !== undefined && this.message === '') {
                this.dialog = true
              }
              this.getItems();
            }
        )
      } else {
        api.post("/api/measurement/update", this.item)
            .then(r => {
              this.message = r.data
            }).finally(
            () => {
              if (this.message !== undefined && this.message !== '') {
                this.messageDialog = true
              }
              if (this.message !== undefined && this.message === '') {
                this.dialog = true
              }
              this.getItems();
            }
        )
      }
    },
    getItems() {
      api.get("/api/measurement/all").then(
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