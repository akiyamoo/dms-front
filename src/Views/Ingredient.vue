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
            <v-btn color="primary" @click="saveSupply()">Сохранить</v-btn>
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
            label="Выберите сырье"
            return-object
            solo
            dense
            @change="selected()"
        ></v-select>
        <v-btn @click="getProducts()">Обновить продукты</v-btn>
      </v-col>
      <v-col class="d-flex justify-end">
        <v-btn class="mr-5" @click="createItem()">Создать</v-btn>
        <v-btn :disabled="items.length === 0" @click="getItems(); getSupplies();">Обновить ингредиенты</v-btn>
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
              <td align="center">{{ item.supplyName }}</td>
              <td align="center">{{ item.amount }}</td>
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
      items: [
        // TODO
      ],
      search: undefined,
      dialog: false,
      item: {
        id: undefined,
        supplyName: undefined,
        supplyId: undefined,
        name: undefined,
        amount: undefined,
        sum: undefined,
        productId: undefined,
        productName: undefined,
      },
      products: [],
      supplies: [],
      selectedProduct: undefined
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
          supplyName: "Рыба",
          supplyId: 2,
          amount: 1000,
          productName: 'Жаренная рыба',
          productId: 1
        }
      ]
    },
    getProducts() {
      // TODO
      this.products = [
        {id: 1, name: 'Жаренная рыба'},
        {id: 2, name: 'Сгущенка'}
      ]
    },
    getSupplies() {
      this.supplies = [
        {id: 1, name: "Молоко"},
        {id: 2, name: "Рыба"},
      ]
    },
    selected() {
      // TODO
      this.getItems();
      this.getSupplies();
      console.log(this.selectedProduct)
    }
  }
}
</script>

<style scoped>

</style>