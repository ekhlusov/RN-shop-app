import { ADD_ORDER, SET_ORDERS } from '../actions/orders.actions';
import Order from '../../models/order';

const INITIAL_STATE = {
  orders: []
};

export const ordersReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_ORDERS: {
      return {
        orders: action.payload
      };
    }
    case ADD_ORDER:
      const { id, items, amount, date } = action.payload;

      const newOrder = new Order(id, items, amount, date);

      return {
        ...state,
        orders: state.orders.concat(newOrder)
      };
    default:
      return state;
  }
};
