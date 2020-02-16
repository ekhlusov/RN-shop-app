import PRODUCTS from '../../data/dummy-data';
import {
  CREATE_PRODUCT,
  DELETE_PRODUCT,
  SET_PRODUCTS,
  UPDATE_PRODUCT
} from '../actions/products.actions';
import { Product } from '../../models/product';

const INITIAL_STATE = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter(product => product.ownerId === 'u1') // temp
};

export const productsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_PRODUCTS: {
      return {
        availableProducts: action.payload,
        userProducts: action.payload.filter(product => product.ownerId === 'u1') // temp
      };
    }
    case CREATE_PRODUCT: {
      const { id, title, description, imageUrl, price } = action.payload;
      const newProduct = new Product(
        id,
        'u1',
        title,
        imageUrl,
        description,
        price
      );

      return {
        ...state,
        availableProducts: state.availableProducts.concat(newProduct),
        userProducts: state.userProducts.concat(newProduct)
      };
    }

    case UPDATE_PRODUCT: {
      const { id, title, imageUrl, description } = action.payload;
      const productIndex = state.userProducts.findIndex(prod => prod.id === id);

      const updatedProduct = new Product(
        id,
        state.userProducts[productIndex].ownerId,
        title,
        imageUrl,
        description,
        state.userProducts[productIndex].price
      );

      const updatedUserProducts = [...state.userProducts];
      updatedUserProducts[productIndex] = updatedProduct;

      const availableProductIndex = state.availableProducts.findIndex(
        prod => prod.id === id
      );

      const updatedAvailableProducts = [...state.availableProducts];
      updatedAvailableProducts[availableProductIndex] = updatedProduct;

      return {
        ...state,
        availableProducts: updatedAvailableProducts,
        userProducts: updatedUserProducts
      };
    }

    case DELETE_PRODUCT: {
      return {
        ...state,
        userProducts: state.userProducts.filter(
          product => product.id !== action.payload
        ),
        availableProducts: state.userProducts.filter(
          product => product.id !== action.payload
        )
      };
    }
  }

  return state;
};
