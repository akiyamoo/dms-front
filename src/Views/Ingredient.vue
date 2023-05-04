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
            <span class="text-md-h6 font-weight-bold">Форма ингредиента</span>
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
                <v-text-field
                    align="center"
                    v-model="item.amount"
                    label="Количество"
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
        <v-card-text align="center" class="text-h4 font-weight-bold">Ингредиенты</v-card-text>
      </v-col>
    </v-row>

    <v-row>
      <v-col class="d-flex justify-start" cols="5">
        <v-select
            class="caption mr-3"
            v-model="selectedProduct"
            :items="products"
            item-text="name"
            item-value="id"
            label="Выберите продукты"
            return-object
            solo
            dense
            @change="selected()"
        ></v-select>
        <!--        <v-btn @click="getProducts()">Обновить продукты</v-btn>-->
      </v-col>
      <v-col class="d-flex justify-end">
        <v-btn class="mr-5" :disabled="selectedProduct === undefined" @click="createItem()">Создать</v-btn>
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
              <td align="center">{{ item.supply }}</td>
              <td align="center">{{ item.amount }}</td>
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
import api from '@/plugins/axios'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Ingredient",
  mounted() {
    this.getItems();
    this.getProducts();
    this.getSupplies();
  },
  data() {
    return {
      headers: [
        //{text: "ID", value: "id", sort: true, align: "center"},
        {text: "Название сырья", value: "name", sort: true, align: "center"},
        {text: "Количество", value: "amount", sort: true, align: "center"},
        {text: "Действия", value: "action", sort: true, align: "center"},
      ],
      items: [],
      search: undefined,
      dialog: false,
      messageDialog: false,
      item: {
        id: undefined,
        supply: undefined,
        supplyId: undefined,
        name: undefined,
        amount: undefined,
        sum: undefined,
        productId: undefined,
        product: undefined,
      },
      products: [],
      supplies: [],
      selectedProduct: undefined,
      isCreate: false,
      message: undefined,
      deletedItem: undefined,
      deleteDialog: false
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
    deleteItem(itemOriginal) {
      this.deleteDialog = true;
      this.deletedItem = itemOriginal.id
    },
    deleteConfirm() {
      api.post("/api/ingredient/delete/" + this.deletedItem)
          .then(
              r => this.message = r.data
          ).finally(() => {
            this.deleteDialog = false;
            this.getItems();
          }
      )
    },
    saveIngredient() {
      if (this.isCreate) {
        this.item.productId = this.selectedProduct.id
        api.post("/api/ingredient/add", this.item)
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
        api.post("/api/ingredient/update", this.item)
            .then(r => {
              this.message = r.data
            }).finally(
            () => {
              if (this.message !== undefined && this.message !== '') {
                this.messageDialog = true
              }
              this.dialog = false

              this.getItems();
            }
        )
      }
    },
    getItems() {
      if (this.selectedProduct !== undefined && this.selectedProduct.id !== undefined)
        api.get("/api/ingredient/all/" + this.selectedProduct.id).then(
            response => {
              console.log(response)
              this.items = response.data
            }
        )
    },
    getProducts() {
      api.get("/api/product/all").then(
          response => {
            console.log(response)
            this.products = response.data
          }
      )
    },
    getSupplies() {
      api.get("/api/supply/all").then(
          response => {
            console.log(response)
            this.supplies = response.data
          }
      )
    },
    selected() {
      this.getItems();
      this.getSupplies();
    }
  }
}
</script>

<style scoped>

</style>