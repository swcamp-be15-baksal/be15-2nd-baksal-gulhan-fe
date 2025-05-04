import { createRouter, createWebHistory } from 'vue-router';
import { mainRoutes } from '@/features/main/router.js';
import { packageRoutes } from '@/features/package/router.js';
import { cartRoutes } from '@/features/cart/router.js';
import { payRoutes } from '@/features/payment/router.js';


const router = createRouter({
    history: createWebHistory(),
    routes: [...mainRoutes, ...packageRoutes, ...cartRoutes, ...payRoutes],
});

export default router;
