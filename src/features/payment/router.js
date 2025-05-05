import ConfirmPayInfoView from '@/features/payment/views/ConfirmPayInfoView.vue';
import CompletePaymentView from '@/features/payment/views/CompletePaymentView.vue';

export const payRoutes = [
  {
    path:'/beforePayment',
    name: 'beforePayment',
    component: ConfirmPayInfoView,
    props: route => ({
      orderItems: route.state ? route.state.orderItems : []
    })
  },
  {
    path:'/PaymentResult',
    name:'paymentResult',
    component: CompletePaymentView
  }
]
