<template>
    <v-container grid-list-md text-xs-center>
        <div class="text-center">
            <v-dialog
                    v-model="dialog"
                    width="25vw"
            >
                <v-card>
                    <v-card-title>
                        <v-spacer></v-spacer>
                        <span class="text-md-h5 font-weight-bold">Редактирование бюджета</span>
                        <v-spacer></v-spacer>
                    </v-card-title>
                    <v-container grid-list-md>
                        <v-row justify="center">
                            <v-col md="10">
                                <v-text-field
                                        align="center"
                                        v-model="item.sumOfBudget"
                                        label="Сумма бюджета"
                                        clearable
                                >
                                </v-text-field>
                                <v-text-field
                                        align="center"
                                        v-model="item.percentOfSale"
                                        label="Процент с продаж"
                                        clearable
                                >
                                </v-text-field>
                                <v-text-field
                                        align="center"
                                        v-model="item.percentOfStaff"
                                        label="Процент за участие сотруднику"
                                        clearable
                                >
                                </v-text-field>
                            </v-col>
                        </v-row>
                    </v-container>

                    <v-card-actions class="justify-end">
                        <v-btn color="primary" @click="saveBudget()">Сохранить</v-btn>
                        <v-btn color="primary" @click="dialog = false">Отменить</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </div>

        <v-row>
            <v-col md12>
                <v-card-text align="center" class="text-h4 font-weight-bold">Форма бюджета</v-card-text>
            </v-col>
        </v-row>

        <v-row class="justify-end">
            <v-btn class="mr-5" @click="editItem(items[0])">Редактировать</v-btn>
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
                </v-data-table>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: "Budget",
    mounted() {
        this.getItems();
    },
    data() {
        return {
            headers: [
                //{text: "ID", value: "id", sort: true, align: "center"},
                {text: "Сумма бюджета", value: "sumOfBudget", sort: true, align: "center"},
                {text: "Процент с продаж", value: "percentOfSale", sort: true, align: "center"},
                {text: "Процент за участие сотруднику", value: "percentOfStaff", sort: true, align: "center"},
            ],
            items: [
                // TODO
            ],
            dialog: false,
            item: {
                id: undefined,
                sumOfBudget: undefined,
                percentOfSale: undefined,
                percentOfStaff: undefined,
            },
        }
    },
    methods: {
        editItem(itemOriginal) {
            this.dialog = true;
            for (let key of Object.keys(this.item)) {
                this.item[key] = itemOriginal[key]
            }
        },
        saveBudget() {
            // TODO
            this.dialog = false;
        },
        getItems() {
            // TODO
            this.items = [
                {id: "1", sumOfBudget: "100", percentOfSale: "5", percentOfStaff: "10"},
            ]
        },
    }
}
</script>

<style scoped>

</style>