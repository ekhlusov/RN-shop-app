import { ADD_TO_CART } from '../actions/cart.actions';
import CartItem from '../../models/cart-item';

const INITIAL_STATE = {
  items: {},
  totalAmount: 0
};

export const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const { id, price, title } = action.product;

      let updatedOrNewCartItem;

      if (state.items[id]) {
        // already have item in cart
        updatedOrNewCartItem = new CartItem(
          state.items[id].quantity + 1,
          price,
          title,
          state.items[id].sum + price
        );
      } else {
        updatedOrNewCartItem = new CartItem(1, price, title, price);
      }

      return {
        ...state,
        items: { ...state.items, [id]: updatedOrNewCartItem },
        totalAmount: state.totalAmount + price
      };
    default:
      return state;
  }
};
