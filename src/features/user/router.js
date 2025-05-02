export const userRoutes = [
  {
    path: '/login',
    name: 'login',
    component: import('@/features/user/views/LoginView.vue')
  },
  {
    path: '/signup',
    name: 'signup',
    component: import('@/features/user/views/SignupView.vue')
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
];
