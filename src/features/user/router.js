export const userRoutes = [
    {
        path: '/login',
        name: 'login',
        component: import('@/features/user/views/LoginView.vue'),
    },
    {
        path: '/signup',
        name: 'signup',
        component: () => import('@/features/user/views/SignupView.vue'),
    },
    {
        path: '/verify-success',
        name: 'verify-success',
        component: () => import('@/features/user/views/EmailVerifySuccesView.vue'),
    },
    {
        path: '/verify-fail',
        name: 'verify-fail',
        component: () => import('@/features/user/views/EmailVerifyFailView.vue'),
    },
];
