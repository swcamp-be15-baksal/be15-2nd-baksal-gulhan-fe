import { createRouter, createWebHistory } from 'vue-router';
import { mainRoutes } from '@/features/main/router.js';
import { packageRoutes } from '@/features/package/router.js';

const router = createRouter({
    history: createWebHistory(),
    routes: [...mainRoutes, ...packageRoutes],
});

export default router;
