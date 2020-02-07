import { ADD_ORDER } from "../actions/orders.actions";
import Order from "../../models/order";

const INITIAL_STATE = {
  orders: []
};

export const ordersReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_ORDER:
      const { items, amount } = action.payload;

      const newOrder = new Order(
        new Date().toString(),
        items,
        amount,
        new Date()
      );

      return {
        ...state,
        orders: state.orders.concat(newOrder)
      };
    default:
      return state;
  }
  return state;
};
