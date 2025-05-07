import { api2 } from '@/plugins/axios'

// 패키지 주문 수량 조회
export const fetchPackageOrders = async (params, accessToken) => {
  try {
    const res = await api2.get('/admin/dashboard/package', {
      params,
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    return res.data.data
  } catch (err) {
    console.error('패키지 주문 수량 조회 실패:', err)
    throw err
  }
}

// 기념품 주문 수량 조회
export const fetchGoodsOrders = async (params, accessToken) => {
    try {
        const res = await api2.get('/admin/dashboard/goods', {
            params,
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return res.data.data;
    } catch (err) {
        console.error('기념품 주문 수량 조회 실패:', err);
        throw err;
    }
}

// 전체 주문 내역 (운송정보용)
export const fetchOrders = async (params, accessToken) => {
  try {
    const res = await api2.get('/admin/dashboard/orders', {
      params,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    return res.data.data
  } catch (err) {
    console.error('전체 주문 내역 조회 실패:', err)
    throw err
  }
}

// 운송장 정보 조회
export const fetchShippingOrders = async (params, accessToken) => {
  try {
    const res = await api2.get('/admin/dashboard/orders', {
      params,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res.data.data;
  } catch (err) {
    console.error('운송장 정보 조회 실패:', err);
    throw err;
  }
}

// 월별 수익 조회
export const fetchMonthlyRevenue = async (accessToken) => {
  try {
    const res = await api2.get('/admin/dashboard/monthly', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    return res.data.data
  } catch (err) {
    console.error('월별 수익 조회 실패:', err)
    throw err
  }
}

// 일별 판매 수익 조회
export const fetchDailyRevenue = async (params, accessToken) => {
  try {
    const res = await api2.get('/admin/dashboard/daily', {
      params,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res.data.data;
  } catch (err) {
    console.error('일별 수익 조회 실패:', err);
    throw err;
  }
}


