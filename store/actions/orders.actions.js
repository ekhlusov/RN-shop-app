import { Product } from '../../models/product';
import Order from '../../models/order';

export const ADD_ORDER = 'ADD_ORDER';
export const SET_ORDERS = 'SET_ORDERS';

export const fetchOrders = () => {
  return async dispatch => {
    try {
      // any async code!
      const response = await fetch(
        'https://rn-course-shop-app.firebaseio.com/orders/u1.json'
      );

      if (!response.ok) {
        throw new Error('Error');
      }

      const resData = await response.json();
      const loadedOrders = [];

      for (const key in resData) {
        const { cartItems, totalAmount, date } = resData[key];
        loadedOrders.push(
          new Order(key, cartItems, totalAmount, new Date(date))
        );
      }

      dispatch({ type: SET_ORDERS, payload: loadedOrders });
    } catch (e) {
      throw e;
    }
  };
};

export const addOrder = (cartItems, totalAmount) => {
  const date = new Date();
  return async dispatch => {
    const response = await fetch(
      'https://rn-course-shop-app.firebaseio.com/orders/u1.json',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          cartItems,
          totalAmount,
          date: date.toISOString()
        })
      }
    );

    if (!response.ok) {
      throw new Error('Orders error');
    }

    const resData = await response.json();

    dispatch({
      type: ADD_ORDER,
      payload: {
        id: resData.name,
        items: cartItems,
        amount: totalAmount,
        date
      }
    });
  };
};
