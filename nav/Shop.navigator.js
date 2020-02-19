import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import {
  createDrawerNavigator,
  DrawerNavigatorItems
} from 'react-navigation-drawer';
import { Platform, SafeAreaView, Button, View } from 'react-native';
import theme from '../constants/theme';
import { useDispatch } from 'react-redux';
import { logout } from '../store/actions/auth.actions';

// Screens
import ProductsOverviewScreen from '../sceens/shop/ProductsOverview.screen';
import ProductDetailScreen from '../sceens/shop/ProductDetail.screen';
import CartScreen from '../sceens/shop/Cart.screen';
import OrdersScreen from '../sceens/shop/Orders.screen';
import { Ionicons } from '@expo/vector-icons';
import UserProductsScreen from '../sceens/user/UserProducts.screen';
import EditProductScreen from '../sceens/user/EditProduct.screen';
import AuthScreen from '../sceens/user/Auth.screen';
import StartScreen from '../sceens/Start.screen';

// opts
const defaultNavigationOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? theme.colors.primary : ''
  },
  headerTitleStyle: {
    fontFamily: 'open-sans'
  },
  // ios
  headerBackTitleStyle: {
    fontFamily: 'open-sans'
  },
  //^^ios
  headerTintColor: Platform.OS === 'android' ? 'white' : theme.colors.primary
};

const ProductsNavigator = createStackNavigator(
  {
    ProductsOverview: ProductsOverviewScreen,
    ProductDetail: ProductDetailScreen,
    Cart: CartScreen
  },
  {
    navigationOptions: {
      drawerIcon: drawerConfig => (
        <Ionicons name="md-cart" size={23} color={drawerConfig.tintColor} />
      )
    },
    defaultNavigationOptions: defaultNavigationOptions
  }
);

const OrdersNavigator = createStackNavigator(
  {
    Orders: OrdersScreen
  },
  {
    navigationOptions: {
      drawerIcon: drawerConfig => (
        <Ionicons name="md-list" size={23} color={drawerConfig.tintColor} />
      )
    },
    defaultNavigationOptions: defaultNavigationOptions
  }
);

// Drawer
const AdminNavigator = createStackNavigator(
  {
    UserProducts: UserProductsScreen,
    EditProduct: EditProductScreen
  },
  {
    navigationOptions: {
      drawerIcon: drawerConfig => (
        <Ionicons name="md-create" size={23} color={drawerConfig.tintColor} />
      )
    },
    defaultNavigationOptions: defaultNavigationOptions
  }
);

// Shop navigator
const ShopNavigator = createDrawerNavigator(
  {
    Products: ProductsNavigator,
    Orders: OrdersNavigator,
    Admin: AdminNavigator
  },
  {
    contentOptions: {
      activeTintColor: theme.colors.primary
    },
    contentComponent: props => {
      const dispatch = useDispatch();
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
            <DrawerNavigatorItems {...props} />
            <Button
              title="Logout"
              color={theme.colors.primary}
              onPress={() => {
                dispatch(logout);
                props.navigation.navigate('Auth');
              }}
            />
          </SafeAreaView>
        </View>
      );
    }
  }
);

const AuthNavigator = createStackNavigator(
  {
    Auth: AuthScreen
  },
  { defaultNavigationOptions: defaultNavigationOptions }
);

const MainNavigator = createSwitchNavigator({
  Start: StartScreen,
  Auth: AuthNavigator,
  Shop: ShopNavigator
});

export default createAppContainer(MainNavigator);
