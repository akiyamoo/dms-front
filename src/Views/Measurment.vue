<template>
  <v-container grid-list-md text-xs-center>
    <div class="text-center">
      <v-dialog
          v-model="dialog"
          width="40vw"
      >
        <v-card>
          <v-card-title>
            <v-spacer></v-spacer>
            <span class="text-md-h5 font-weight-bold">Форма единиц измерений</span>
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
      <v-btn @click="getItems()">Обновить</v-btn>
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
    saveMeasurment() {
      // TODO
      this.dialog = false;
    },
    getItems() {
      // TODO
      this.items = [
        {id: "1", name: "Кг"},
        {id: "2", name: "Литр"},
      ]
    },
  }
}
</script>

<style scoped>

</style>