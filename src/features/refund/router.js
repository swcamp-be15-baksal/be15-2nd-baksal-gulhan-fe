export const refuntRoutes = [
  {
    path: '/refund/:id',
    name: 'Rufundinfo',
    component : () => import('@/features/refund/views/RefundInfoView.vue')
  },
  {
    path: '/refund/:id/confirm',
    name: 'CompleteRefund',
    component : () => import('@/features/refund/views/CompleteRefundView.vue')
  }
]
