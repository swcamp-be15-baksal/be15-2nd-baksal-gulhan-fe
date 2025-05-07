import ConfirmPayInfoView from '@/features/payment/views/ConfirmPayInfoView.vue';
import CompletePaymentView from '@/features/payment/views/CompletePaymentView.vue';
import PaymentView from '@/features/payment/views/PaymentVIew.vue';
import SuccessPaymentView from '@/features/payment/views/SuccessPaymentView.vue';

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
  },
  {
    path:'/payment',
    name:'payment',
    component: PaymentView
  },
  {
    path:'/widget/success',
    name: 'success',
    component: SuccessPaymentView
  }
]
