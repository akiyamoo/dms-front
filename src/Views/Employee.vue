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
                        <span class="text-md-h5 font-weight-bold">Создание сотрудника</span>
                        <v-spacer></v-spacer>
                    </v-card-title>
                    <v-container grid-list-md>
                        <v-row justify="center">
                            <v-col md="10">
                                <v-text-field
                                        align="center"
                                        v-model="item.name"
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
                                <v-text-field
                                        align="center"
                                        v-model="item.createdDate"
                                        label="Дата трудоустройства"
                                        clearable
                                >
                                </v-text-field>
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
                                        v-model="item.staffId"
                                        :items="staffes"
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
                <v-card-text align="center" class="text-h4 font-weight-bold">Форма сотрудников</v-card-text>
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
                            <td align="center">{{ item.salary }}</td>
                            <td align="center">{{ item.createdDate }}</td>
                            <td align="center">{{ item.address }}</td>
                            <td align="center">{{ item.phoneNumber }}</td>
                            <td align="center">{{ item.staffName }}</td>
                            <td align="center">
                                <v-btn @click="editItem(item)">
                                    <v-icon>fas fa-edit</v-icon>
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
    name: "Employee",
    mounted() {
        this.getItems();
        this.getStaffes();
    },
    data() {
        return {
            headers: [
                //{text: "ID", value: "id", sort: true, align: "center"},
                {text: "ФИО", value: "name", sort: true, align: "center"},
                {text: "Оклад", value: "salary", sort: true, align: "center"},
                {text: "Дата трудоустройства", value: "createdDate", sort: true, align: "center"},
                {text: "Адрес", value: "address", sort: true, align: "center"},
                {text: "Номер телефона", value: "phoneNumber", sort: true, align: "center"},
                {text: "Должность", value: "staffName", sort: true, align: "center"},
            ],
            items: [
                // TODO
            ],
            search: undefined,
            dialog: false,
            item: {
                name: undefined,
                salary: undefined,
                createdDate: undefined,
                address: undefined,
                phoneNumber: undefined,
                staffName: undefined,
                staffId: undefined,
            },
            staffes: []
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
        saveEmployee() {
            // TODO
            this.dialog = false;
        },
        getItems() {
            // TODO
            this.items = [
                {
                    name: "Eldar",
                    salary: 1000,
                    createdDate: Date.now(),
                    address: "Bishkek",
                    phoneNumber: "+996709992536",
                    staffName: "Admin",
                    staffId: 1
                }
            ]
        },
        getStaffes() {
            // TODO
            this.staffes = [
                {id: 1, name: 'Admin'},
                {id: 2, name: 'User'}
            ]
        }
    }
}
</script>

<style scoped>

</style>