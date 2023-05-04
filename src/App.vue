<template>
  <v-app>
    <v-app-bar
        app
        color="primary"
        dark
    >
      <v-btn :disabled="true" @click="$router.push('/budget')" small>
        Бюджет
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn :disabled="false" @click="$router.push('/staff')" small>
        Должности
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn @click="$router.push('/employee')" small>
        Сотрудники
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn :disabled="false" @click="$router.push('/measurment')" small>
        Единицы измерения
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn @click="$router.push('/ingredient')" small>
        Ингредиенты
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn :disabled="true" @click="$router.push('/supply')" small>
        Сырьё
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn :disabled="true" @click="$router.push('/purchase-of-supply')" small>
        Закупка сырья
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn @click="$router.push('/product')" small>
        Готовая продукция
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn :disabled="true" @click="$router.push('/production-of-product')" small>
        Производство продукции
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn :disabled="true" @click="$router.push('/sale-of-product')" small>
        Продажа продукции
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn :disabled="true" @click="$router.push('/salary')" small>
        Зарплата
      </v-btn>
      <v-spacer></v-spacer>
    </v-app-bar>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  components: {},

  data: () => ({
    //
  }),
};
</script>
