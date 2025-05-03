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
    {
      path: '/board/edit/:id',
      name: 'board-edit',
      component: () => import('@/features/travelmatepost/views/TmpEditView.vue'),
    },
    {
      path: '/board/write',
      name: 'board-write',
      component: () => import('@/features/travelmatepost/views/TmpWriteView.vue'),
    }

];
