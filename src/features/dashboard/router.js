export const dashboardRoutes = [
  {
    path: '/dashboard',
    name: 'DashboardMain',
    component: () => import('@/features/dashboard/views/DashboardMainView.vue')
  },
  {
    path: '/dashboard/order',
    name: 'DashboardOrder',
    component: () => import('@/features/dashboard/views/DashboardOrderView.vue')
  },
  {
    path: '/dashboard/shipping',
    name: 'DashboardShippingView',
    component: () => import('@/features/dashboard/views/DashboardShippingView.vue'),
  },
]



