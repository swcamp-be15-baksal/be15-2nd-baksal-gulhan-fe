import LoginView from '@/features/user/views/LoginView.vue';
import AgreeView from '@/features/user/views/AgreeView.vue';

export const userRoutes = [
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/agree',
    name: 'agree',
    component: AgreeView

  }
];
