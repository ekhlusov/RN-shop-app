import React from 'react';
import { StyleSheet } from 'react-native';
import { productsReducer } from './store/reducers/products.reducer';

// redux
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

// nav
import ShopNavigator from './nav/Shop.navigator';

const rootReducer = combineReducers({
  products: productsReducer
});

const store = createStore(rootReducer);

export default function App() {
  return (
    <Provider store={store}>
      <ShopNavigator />
    </Provider>
  );
}
