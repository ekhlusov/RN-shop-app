import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { AppLoading } from 'expo';

// Fonts
import * as Font from 'expo-font';

// redux
import { productsReducer } from './store/reducers/products.reducer';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

// nav
import ShopNavigator from './nav/Shop.navigator';
import { cartReducer } from './store/reducers/cart.reducer';
import { ordersReducer } from './store/reducers/orders.reducer';

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  orders: ordersReducer
});

const store = createStore(rootReducer);

const fetchFonts = () =>
  Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => {
          setFontLoaded(true);
        }}
      />
    );
  }

  return (
    <Provider store={store}>
      <ShopNavigator />
    </Provider>
  );
}
