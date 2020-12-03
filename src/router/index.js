import { createRouter, createWebHistory } from "vue-router";

import Home from '@/views/Home';
import Variables from "@/views/Variables";
import NotFound from "@/views/NotFound";

const routes = [
    {
        path: '/',
        component: Home,
        name: 'home',
    },
    {
        path: '/variables/:projectId',
        component: Variables,
        name: 'variables',
        props: true,
    },
    {
        path: '/:pathMatch(.*)*',
        component: NotFound,
        name: 'not_found',
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
