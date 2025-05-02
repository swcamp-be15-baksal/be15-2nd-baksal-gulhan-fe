import { createRouter, createWebHistory } from 'vue-router';
import { mainRoutes } from '@/features/main/router.js';
import { packageRoutes } from '@/features/package/router.js';
import { goodsRoutes } from '@/features/goods/router.js';

const router = createRouter({
    history: createWebHistory(),
    routes: [...mainRoutes, ...packageRoutes, ...goodsRoutes],
});

export default router;
