import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import TodosView from "../views/TodosView.vue";
import { HOME_PATH, TODOS_PATH } from "@/utils/vars";

const routes: Array<RouteRecordRaw> = [
    {
        path: HOME_PATH,
        name: "home",
        component: HomeView,
    },
    {
        path: TODOS_PATH,
        name: "todos",
        component: TodosView,
    },
];

const router = createRouter({
    history: createWebHashHistory(process.env.BASE_URL),
    routes,
});

export default router;
