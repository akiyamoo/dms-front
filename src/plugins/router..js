import VueRouter from 'vue-router'
import Vue from "vue";

Vue.use(VueRouter);

const paths = [
    {
        name: "Budget",
        path: "/budget",
        component: () => import('@/Views/Budget')
    },
    {
        name: "Staff",
        path: "/staff",
        component: () => import('@/Views/Staff')
    },
    {
        name: "Employee",
        path: "/employee",
        component: () => import('@/Views/Employee')
    },
    {
        name: "Ingredient",
        path: "/ingredient",
        component: () => import('@/Views/Ingredient')
    },
    {
        name: "Measurment",
        path: "/measurment",
        component: () => import('@/Views/Measurment')
    },
    {
        name: "Product",
        path: "/product",
        component: () => import('@/Views/Product')
    },
    {
        name: "ProductionOfProduct",
        path: "/production-of-product",
        component: () => import('@/Views/ProductionOfProduct')
    },
    {
        name: "SaleOfProduct",
        path: "/sale-of-product",
        component: () => import('@/Views/SaleOfProduct')
    },
    {
        name: "PurchaseOfSupply",
        path: "/purchase-of-supply",
        component: () => import('@/Views/PurchaseOfSupply')
    },
    {
        name: "Supply",
        path: "/supply",
        component: () => import('@/Views/Supply')
    },
    {
        name: "Salary",
        path: "/salary",
        component: () => import('@/Views/Salary')
    },
    {
        name: "Bank",
        path: "/bank",
        component: () => import('@/Views/Bank')
    },
]

const router = new VueRouter({
    base: '/',
    mode: 'history',
    routes: paths
});

export default router