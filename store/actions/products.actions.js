import { Product } from '../../models/product';

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const SET_PRODUCTS = 'SET_PRODUCTS';

export const fetchProducts = () => {
  return async dispatch => {
    try {
      // any async code!
      const response = await fetch(
        'https://rn-course-shop-app.firebaseio.com/products.json'
      );

      if (!response.ok) {
        throw new Error('Error');
      }

      const resData = await response.json();
      const loadedProducts = [];

      for (const key in resData) {
        const { title, description, price, imageUrl } = resData[key];
        loadedProducts.push(
          new Product(key, 'u1', title, imageUrl, description, price)
        );
      }

      console.log(resData);

      dispatch({ type: SET_PRODUCTS, payload: loadedProducts });
    } catch (e) {
      throw e;
    }
  };
};

export const deleteProduct = productId => {
  return { type: DELETE_PRODUCT, payload: productId };
};

export const createProduct = (title, description, imageUrl, price) => {
  return async dispatch => {
    // any async code!
    const response = await fetch(
      'https://rn-course-shop-app.firebaseio.com/products.json',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, description, imageUrl, price })
      }
    );

    const resData = await response.json();

    dispatch({
      type: CREATE_PRODUCT,
      payload: { id: resData.name, title, description, imageUrl, price }
    });
  };
};

export const updateProduct = (id, title, description, imageUrl) => {
  return {
    type: UPDATE_PRODUCT,
    payload: { id, title, description, imageUrl }
  };
};
