import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator } from "react-navigation-drawer";
import { Platform } from "react-native";
import theme from "../constants/theme";

// Screens
import ProductsOverviewScreen from "../sceens/shop/ProductsOverview.screen";
import ProductDetailScreen from "../sceens/shop/ProductDetail.screen";
import CartScreen from "../sceens/shop/Cart.screen";
import OrdersScreen from "../sceens/shop/Orders.screen";
import { Ionicons } from "@expo/vector-icons";

// opts
const defaultNavigationOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? theme.colors.primary : ""
  },
  headerTitleStyle: {
    fontFamily: "open-sans"
  },
  // ios
  headerBackTitleStyle: {
    fontFamily: "open-sans"
  },
  //^^ios
  headerTintColor: Platform.OS === "android" ? "white" : theme.colors.primary
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

// Drawer
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

// Shop navigator
const ShopNavigator = createDrawerNavigator(
  {
    Products: ProductsNavigator,
    Orders: OrdersNavigator
  },
  {
    contentOptions: {
      activeTintColor: theme.colors.primary
    }
  }
);

export default createAppContainer(ShopNavigator);
