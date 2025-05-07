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
    path: '/find/id',
    name: 'find-id',
    component: import('@/features/user/views/FindIdView.vue')
  },
  {
    path: '/find/password',
    name: 'find-password',
    component: import('@/features/user/views/FindPasswordView.vue')
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
  {
    path: '/kakao/callback',
    name: 'kakao-callback',
    component: () => import('@/features/user/views/KakaoCallbackView.vue'),
  },
  {
    path: '/kakao/additional-info',
    name: 'kakao-additional-info',
    component: () => import('@/features/user/views/AdditinalInfoView.vue'),
  },
];
