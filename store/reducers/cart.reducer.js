import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions/cart.actions";
import CartItem from "../../models/cart-item";
import { ADD_ORDER } from "../actions/orders.actions";

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

    case REMOVE_FROM_CART:
      const { payload: productId } = action;

      const selectedCartItem = state.items[productId];
      const currentQty = selectedCartItem.quantity;
      let updatedCartItems;

      if (currentQty > 1) {
        // need to reduce it
        updatedCartItems = new CartItem(
          selectedCartItem.quantity - 1,
          selectedCartItem.price,
          selectedCartItem.title,
          selectedCartItem.sum - selectedCartItem.price
        );

        updatedCartItems = { ...state.items, [productId]: updatedCartItems };
      } else {
        // need to erase it
        updatedCartItems = { ...state.items };
        delete updatedCartItems[productId];
      }

      return {
        ...state,
        items: updatedCartItems,
        totalAmount: state.totalAmount - selectedCartItem.price
      };

    case ADD_ORDER:
      return INITIAL_STATE;

    default:
      return state;
  }
};
