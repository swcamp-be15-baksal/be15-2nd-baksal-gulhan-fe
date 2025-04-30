import { createRouter, createWebHistory } from 'vue-router';
import { mainRoutes } from '@/features/main/router.js';
import { packageRoutes } from '@/features/package/router.js';
import { userRoutes } from '@/features/user/router.js';
import { mypageRoutes } from '@/features/mypage/router.js';

const router = createRouter({
    history: createWebHistory(),
    routes: [...mainRoutes, ...packageRoutes, ...userRoutes, ...mypageRoutes],
    scrollBehavior() {
        return { left: 0, top: 0 }; // 모든 라우트 변경시 페이지의 최상단으로 스크롤
    },
});

export default router;
