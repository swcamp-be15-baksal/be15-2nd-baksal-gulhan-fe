import LoginView from '@/features/user/views/LoginView.vue';
import AgreeView from '@/features/user/views/AgreeView.vue';

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
  }
];
