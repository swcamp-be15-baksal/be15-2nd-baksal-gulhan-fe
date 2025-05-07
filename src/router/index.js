import { createRouter, createWebHistory } from 'vue-router';
import { mainRoutes } from '@/features/main/router.js';
import { packageRoutes } from '@/features/package/router.js';
import { userRoutes } from '@/features/user/router.js';
import { mypageRoutes } from '@/features/mypage/router.js';
import { goodsRoutes } from '@/features/goods/router.js';
import { travelMatePostRoutes } from '@/features/travelmatepost/router.js';
import { noticeRoutes } from '@/features/notice/router.js';
import { placeRoutes } from '@/features/place/router.js';
import { cartRoutes } from '@/features/cart/router.js';
import { payRoutes } from '@/features/payment/router.js';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        ...mainRoutes,
        ...packageRoutes,
        ...userRoutes,
        ...mypageRoutes,
        ...goodsRoutes,
        ...noticeRoutes,
        ...travelMatePostRoutes,
        ...cartRoutes,
        ...payRoutes,
        ...placeRoutes,
    ],
    scrollBehavior() {
        return { left: 0, top: 0 }; // 모든 라우트 변경시 페이지의 최상단으로 스크롤
    },
});

export default router;
