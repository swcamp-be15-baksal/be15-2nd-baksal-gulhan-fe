export const travelMatePostRoutes = [
    {
      path: '/board/:id',
      name: 'board-detail',
      component: () => import('@/features/travelmatepost/views/TmpDetailView.vue'),
    },
    {
      path: '/board',
      name: 'board-list',
      component: () => import('@/features/travelmatepost/views/TmpListView.vue'),
    },
];
