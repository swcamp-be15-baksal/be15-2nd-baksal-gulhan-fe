import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import PackageList from '@/views/PackageList.vue';

const routes = [
    { path: '/', component: Home },
    { path: '/package-list', component: PackageList },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
