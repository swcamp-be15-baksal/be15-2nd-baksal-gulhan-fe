import {api} from '@/plugins/axios.js';

/**/
export function getValue(accessToken){
  return api.get(
    '/payment/value',
    {
      headers: { Authorization: `Bearer ${accessToken}`}
    }
  );
}

export function getKey(accessToken){
  return api.get(
    '/payment/key',
    {
      headers: {Authorization: `Bearer ${accessToken}`}
    }
  );
}

export function confirmWidget(accessToken, requestData){
  return api.post(
    '/payment/confirm/widget',
    requestData,
    {
      headers: {Authorization: `Bearer ${accessToken}`}
    });
}

export function saveOrder(accessToken, requestData){
  return api.post(
    '/payment/success/order',
    requestData,
    {
      headers: {Authorization: `Bearer ${accessToken}`}
    }
  )

}

export function saveOrderHistory(accessToken, requestOrderData){
  return api.post(
    'payment/success/order-histoyr',
    requestOrderData,
    {
      headers: {Authorization: `Bearer ${accessToken}`}
    }
  )
}
